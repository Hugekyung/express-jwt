const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        requried: true,
    }
})

module.exports = mongoose.model('UserInfo', UserSchema);