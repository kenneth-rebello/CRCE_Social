const mongoose = require('mongoose');

const traySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'profile'
    },
    notifs: [{
        notif:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'notif'
        }
    }]
});

module.exports = Tray = mongoose.model('tray',traySchema);