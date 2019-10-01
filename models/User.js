const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    approved:{
        type: Boolean,
        default: false
    },
    admin:{
        type: Boolean,
        default: false
    },
    email: {
        type:  String,
        required: true,
        unique: true
    },
    confirmed:{
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    branch:{
        type: String
    },
    year:{
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    following: [{
        profile:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'profile'
        }
    }]
});

module.exports = User = mongoose.model('user',userSchema);