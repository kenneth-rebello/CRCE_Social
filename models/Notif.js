const mongoose = require('mongoose');

const notifSchema = new mongoose.Schema({
    picture: {
        type: String
    },
    kind:{
        type: String
    },
    text:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    },
    seen:{
        type: Boolean,
        default: false
    },
    refer:{
        type: String
    },
    to:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
});

module.exports = Notif = mongoose.model('notif',notifSchema);