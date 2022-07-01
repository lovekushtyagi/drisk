const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: [true, 'Please add an email'],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, // can do this with express validator too
            'Please add a valid email',
          ]
    },
    password: {
        type: String,
        required: true,
    }
})


module.exports = mongoose.model('User', UserSchema);