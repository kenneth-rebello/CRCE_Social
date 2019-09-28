const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
    user1:{
        type: Schema.Types.ObjectId,
        ref:'user'
    },
    user2:{
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    messages: [{
        message: {
            type: Schema.Types.ObjectId,
            ref: 'message'
        }
    }]
});

module.exports = Chat = mongoose.model('chat', ChatSchema);