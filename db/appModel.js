const mongoose = require('mongoose');

const user = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: true
    }
});
user.index({
    email: 1,
    password: 1
})
const User = mongoose.model('user',user);

module.exports = {
    User
}