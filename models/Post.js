const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    approved: {
        type: Boolean,
        default: false
    },
    picture:{
        type: String
    },
    upload:{
        type: String
    },
    text:{
        type: String,
        required: true
    },
    name:{
        type: String
    },
    likes: [
        {
            user:{
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        }
    ],
    comments: [
        {
            user:{
                type: Schema.Types.ObjectId,
                ref: 'user'
            },
            text:{
                type: String,
                required: true
            },
            name:{
                type: String
            },
            picture:{
                type: String
            },
            date:{
                type:Date,
                default: Date.now
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Post = mongoose.model('post', PostSchema);