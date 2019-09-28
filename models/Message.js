const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    text:{
        type: String
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
});

module.exports = Message = mongoose.model('message', MessageSchema);