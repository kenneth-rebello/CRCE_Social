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
    birthday:{
        type: String
    },
    picture:{
        type: String
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
        },
        marksObt:{
            type: Number,
        },
        marksOutOf:{
            type: Number
        }        
    }],
    status:[{
        semester:{
            type: String
        },
        sgpa:{
            type: Number
        },
        cgpa:{
            type: Number
        },
        backlogs:{
            type: Number
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