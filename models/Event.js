const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({

    date:{
        type: Date,
    },
    picture:{
        type: String
    },
    heading:{
        type: String
    },
    desc:{
        type: String
    },
    name:{
        type: String
    },
    upload:{
        type: String
    },
    target:{
        type: [String]
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    interested: [
        {
            user:{
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        }
    ],

});

module.exports = Event = mongoose.model('event', EventSchema);