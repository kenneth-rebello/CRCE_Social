const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Notif  = require('../../models/Notif');
const Tray  = require('../../models/Tray');


router.get('/', auth, async(req, res)=>{
    const tray = await Tray.findOne({user:req.user.id})
    if(tray){
        const notifs = await Notif.find({_id: {$in: tray.notifs}}).sort({date:-1})
        
        res.json(notifs);
    }
})

router.get('/unseen', auth, async(req, res)=>{
    const tray = await Tray.findOne({user:req.user.id})
    if(tray){
        const notifs = await Notif.find({_id: {$in: tray.notifs}, seen: false}).sort({date:-1})
        
        res.json(notifs);
    }
})

router.post('/msg', auth, async(req,res) => {

    const profile = await Profile.findOne({user: req.user.id});

    const sender = await User.findById(req.user.id);

    let newNotif = new Notif({
        picture: profile.picture,
        kind: 'msg',
        text: `You have a new message(s) from ${sender.name}`
    });

    const notif = await newNotif.save();
    const tray = await Tray.findOne({user: req.body.to})

    if(!tray){
        let tray = new Tray({
            user: req.body.to,
            notifs: [notif]
        })

        await tray.save();
    }else{
        tray.notifs.unshift(notif);
        await tray.save();
    }

    res.json(notif)
    
})

router.post('/seen', auth, async(req, res)=>{
    
    await Notif.updateMany({_id: {$in: req.body.tray}, seen: false}, {$set:{seen: true}}, {new: true})
    
})

module.exports = router;