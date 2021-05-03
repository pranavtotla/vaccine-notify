const CronJob = require('cron').CronJob;
const AppointmentByDistrict = require('../appointment').District;
const Notify = require('../notifier').telegram.notifyAvailability;

const checkCentersUnder18 = async districtId => {
    return new Promise((resolve, reject) => {
        const centerData = [];
        const today = AppointmentByDistrict.today(districtId);
        today
            .then(data => {
                const centers = data.data.centers;
                for(const center of centers){
                    const sessions = center.sessions;
                    for(const session of sessions){
                        if(session.min_age_limit < 46){
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
                return AppointmentByDistrict.tomorrow(districtId);
            })
            .then(data => {
                const centers = data.data.centers;
                for(const center of centers){
                    const sessions = center.sessions;
                    for(const session of sessions){
                        if(session.min_age_limit < 45){
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
            })
            .then(data => {
                resolve(centerData);
            })
            .catch(error => {
                console.log(`Error in checkCentersUnder18 ${error}`);
            })
    });

    today
        .then(data => {
            const centers = data.centers;
            for(const center of centers){
                const sessions = center.sessions;
                for(const session of sessions){
                    if(session.min_age_limit < 45){
                        Notify(center.name, center.pincode, session.available_capacity, session.date, center.fee_type, session.vaccine);
                    }
                }
            }
        })
        .catch(error => {
            console.log(`Error in checkCentersUnder18 ${error}`);
        });

    tomorrow
        .then(data => {
            const centers = data.centers;
            for(const center of centers){
                const sessions = center.sessions;
                for(const session of sessions){
                    if(session.min_age_limit < 45){
                        Notify(center.name, center.pincode, session.available_capacity, session.date, center.fee_type, session.vaccine);
                    }
                }
            }
        })
        .catch(error => {
            console.log(`Error in checkCentersUnder18 ${error}`);
        });
};


module.exports = {
    checkCentersUnder18
};
