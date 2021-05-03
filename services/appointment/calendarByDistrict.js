const axios = require('axios');
const moment = require('moment');
const rootUrl = require('../config').rootUrl;
const calendarByDistrict = require('../config').calendarByDistrict;

const getAppointments = async (districtId, date) => {
    const params = {
        method: 'get',
        url: `${rootUrl}${calendarByDistrict}?district_id=${districtId}&date=${date}`,
        headers: {
            'accept': 'application/json',
        }
    };

    return axios(params);
};

const getSimpleAppointmentsToday = (districtId) => {
    const today = moment();
    const todayString = today.format('DD-MM-YYYY');
    return getAppointments(districtId, todayString);
};

const getSimpleAppointmentsTomorrow = (districtId) => {
    const today = moment();
    today.add(1, 'day');
    const tomorrowString = today.format('DD-MM-YYYY');
    return getAppointments(districtId, tomorrowString);
};

module.exports = {
    get: getAppointments,
    today: getSimpleAppointmentsToday,
    tomorrow: getSimpleAppointmentsTomorrow
};
