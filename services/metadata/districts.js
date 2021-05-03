const axios = require('axios');
const rootUrl = require('../config').rootUrl;
const districts = require('../config').districts;

const getDistricts = async (stateId) => {
    const params = {
        method: 'get',
        url: `${rootUrl}${districts}${stateId}`,
        headers: {
            'accept': 'application/json',
        }
    };

    return await axios(params);
};

module.exports = {
    get: getDistricts
};
