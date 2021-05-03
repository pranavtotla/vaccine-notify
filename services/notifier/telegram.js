const getMessageForAvailableNotifications = (centerName, pincode, slots, date, price, vaccine) => {
    return `${centerName} - ${pincode} has ${slots} available on ${date} for ${vaccine} ${price} vaccination`;
};

module.exports = {
    getMessageForAvailableNotifications
};
