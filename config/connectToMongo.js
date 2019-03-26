const mongoose = require('mongoose');
const mongoDBPath = require('./mongoConfig').PATH;

const connect = () => {
    return mongoose.connect(mongoDBPath,{ useNewUrlParser: true });
};

module.exports = {
    connect
};