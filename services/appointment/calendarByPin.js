const axios = require('axios');
const rootUrl = require('../config').rootUrl;
const calendarByPin = require('../config').calendarByPin;

const getAppointments = async (pincode, date) => {
    const params = {
        method: 'get',
        url: `${rootUrl}${calendarByPin}?pincode=${pincode}&date=${date}`,
        headers: {
            'accept': 'application/json',
        }
    };

    return await axios(params);
};

const getSimpleAppointmentsToday = (pincode) => {
    const today = moment();
    const todayString = today.format('DD-MM-YYYY');
    return getAppointments(pincode, todayString);
};

const getSimpleAppointmentsTomorrow = (pincode) => {
    const today = moment();
    today.add(1, 'day');
    const tomorrowString = today.format('DD-MM-YYYY');
    return getAppointments(pincode, tomorrowString);
};

module.exports = {
    get: getAppointments,
    today: getSimpleAppointmentsToday,
    tomorrow: getSimpleAppointmentsTomorrow
};
