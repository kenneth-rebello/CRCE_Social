const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator/check');
const fileUpload = require('express-fileupload')
const auth = require('../../middleware/auth');
const Event = require('../../models/Event');
const User = require('../../models/User');
const Profile = require('../../models/Profile');

router.use(fileUpload());


router.get('/', auth, async(req, res) => {

    const events = await Event.find().populate('user',['name','email','branch', 'year']).sort({date:1});

    res.json(events);

})

router.get('/me', auth, async(req,res) => {

    const user = await User.findOne({_id: req.user.id});

    const events = await Event.find({"target.0": user.branch, "target.0": user.year}).populate('user',['name','branch','year','email']).sort({date: 1});

    res.json(events);
})


router.post('/', [auth, [
    check('desc', 'Description is required').not().isEmpty()
]],
async function(req,res){
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({msg: errors.array()});
    }

    const user = await User.findById(req.user.id).select('-password');
    if(req.files){
        
        const file = req.files.file;
        const fileName = `crceSocialevent${Date.now()}${file.name}`

        file.mv(`./client/public/events/${fileName}`,async err => {
            if(err){
                console.error(err);
                return res.status(500).send(err);
            }
            try {
                const profile = await Profile.findOne({user:req.user.id})
                console.log(req.body);
                const newEvent = new Event({
                    heading: req.body.heading,
                    desc: req.body.desc,
                    date: req.body.date,
                    target: req.body.target,
                    name: user.name,
                    picture: profile.picture,
                    upload: fileName,
                    user: req.user.id
                })      
                const event = await newEvent.save();
        
                console.log(event);
                return res.json(event);
        
            } catch (err) {
                console.error(err.message);
                return res.status(500).send('Server Error');
            }
        });
    }else{
        try {
            const profile = await Profile.findOne({user:req.user.id})
    
            const newEvent = new Event({
                heading: req.body.heading,
                desc: req.body.desc,
                date: req.body.date,
                target: req.body.target,
                name: user.name,
                picture: profile.picture,
                user: req.user.id
            })      
            const event = await newEvent.save();
    
            return res.json(event);
    
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
});


router.get('/:id', auth, async function (req, res){
    try {

        const event = await Event.findById(req.params.id).populate('interested.user',['name','branch','year']);

        if(!event){
            return res.status(404).json({msg: 'Event not found'});
        }

        return res.json(event);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});


router.put('/interested/:id', auth, async function(req, res){
    try {
        const event = await Event.findById(req.params.id);

        //Check if already recorded interest
        if(event.interested.filter(like => like.user.toString() === req.user.id).length > 0){
            return res.status(400).json({msg: 'Already recorded'});
        }

        event.interested.unshift({user: req.user.id});
        await event.save();

        res.json(event.interested);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});


router.put('/notinterested/:id', auth, async function(req, res){
    try {
        const event = await Event.findById(req.params.id);
        
        if(event.interested.filter(like => like.user.toString() === req.user.id).length == 0){
            return res.status(400).json({msg: 'Not liked'});
        }

        const toRemove = event.interested.map(like => like.user.toString()).indexOf(req.user.id);
        event.interested.splice(toRemove, 1);
        await event.save();

        res.json(event.interested);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

module.exports = router;