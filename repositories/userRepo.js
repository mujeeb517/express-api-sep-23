const User = require('../model/userModel');

const add = (payload) => {
    const user = new User(payload);
    return user.save();
};

module.exports = {
    add,
};
