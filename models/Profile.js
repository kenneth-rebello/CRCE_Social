const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    dateOfBirth:{
        type: Date,
        required: true
    },
    dept:{
        type: String,
        required: true
    },
    batch:{
        type: String,
        required: true
    },
    contact:{
        type: [String]
    },
    location:{
        type: String
    },
    skills:{
        type: [String]
    },
    achievements:{
        type: [String]
    },
    position:{
        type: String
    },
    bio:{
        type: String
    },
    githubusername:{
        type: String
    },
    education:[{
        institute:{
            type: String,
        },
        course:{
            type: String,
        },
        from:{
            type: Date
        },
        to:{
            type: Date,
        }
    }],
    social:{
        linkedin:{
            type: String
        },
        twitter:{
            type: String
        },
        youtube:{
            type: String
        },
        facebook:{
            type: String
        },
        instagram:{
            type: String
        }
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);