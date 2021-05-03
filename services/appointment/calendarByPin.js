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

module.exports = {
    get: getAppointments
};
