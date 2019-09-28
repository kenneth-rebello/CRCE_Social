const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
    users: [{
        user:{
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    }],
    messages: [{
        message:{
            type: Schema.Types.ObjectId,
            ref: 'message'
        }
    }]
});

module.exports = Chat = mongoose.model('chat', ChatSchema);