const mongosee = require('mongoose');

const UserSchema = mongosee.Schema({
    email: {
        type: String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        required: [true, 'User mail required']
    },
    password: {
        type: String,
        minlength: [3, 'User password min 3 string'],
        required: [true, 'User password required']
    },
    creation_date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongosee.model('Users', UserSchema);