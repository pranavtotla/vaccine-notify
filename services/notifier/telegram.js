const axios = require('axios');
const telegramBotToken = require('../../config/config.json').telegram.bot.accesstoken;
const telegramChannel = require('../../config/config.json').telegram.toChannel.id;

const getMessageForAvailableNotifications = (centerName, pincode, slots, date, price, vaccine) => {
    return `${centerName} - ${pincode} has ${slots} available on ${date} for ${vaccine} ${price} vaccination`;
};

const sendMessageToChannel = (message) => {
    const params = {
        method: 'get',
        url: `https://api.telegram.org/bot${telegramBotToken}/sendMessage?chat_id=${telegramChannel}&text=${message}`,
        headers: {
            'accept': 'application/json',
        }
    };

    return axios(params);
};

module.exports = {
};
