const CronJob = require('cron').CronJob;
const AppointmentByDistrict = require('../appointment').District;
const Notify = require('../notifier').telegram.notifyAvailability;

const getCentersUnder18 = districtId => {
    return new Promise((resolve, reject) => {
        const centerData = [];
        const today = AppointmentByDistrict.today(districtId);
        today
            .then(data => {
                const centers = data.data.centers;
                for(const center of centers){
                    const sessions = center.sessions;
                    for(const session of sessions){
                        if(session.min_age_limit < 18){
                            centerData.push({
                                centerName:center.name, 
                                pincode: center.pincode, 
                                slots: session.available_capacity, 
                                date: session.date, 
                                price: center.fee_type.toLowerCase(), 
                                vaccine: session.vaccine
                            });
                        }
                    }
                }
                // return AppointmentByDistrict.tomorrow(districtId);
            })
            // .then(data => {
            //     const centers = data.data.centers;
            //     for(const center of centers){
            //         const sessions = center.sessions;
            //         for(const session of sessions){
            //             if(session.min_age_limit < 18){
            //                 centerData.push({
            //                     centerName:center.name, 
            //                     pincode: center.pincode, 
            //                     slots: session.available_capacity, 
            //                     date: session.date, 
            //                     price: center.fee_type.toLowerCase(), 
            //                     vaccine: session.vaccine
            //                 });
            //             }
            //         }
            //     }
            // })
            .then(() => {
                resolve(centerData);
            })
            .catch(error => {
                console.log(`Error in checkCentersUnder18 ${error}`);
                reject(error);
            })
    });
};

const notifyCentersUnder18 = async districtId => {
    const centers = await getCentersUnder18(districtId);
    const promises = [];
    for(const center of centers){
        promises.push(Notify(center.centerName, center.pincode, center.slots, center.date, center.price, center.vaccine));
    }
    const allPromises = Promise.all(promises);
    await allPromises;
};

module.exports = {
    getCentersUnder18,
    notifyCentersUnder18
};
