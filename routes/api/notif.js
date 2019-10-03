const express = require('express');
const router = express.Router();
const moment = require('moment')
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Post = require('../../models/Post');
const Notif  = require('../../models/Notif');
const Tray  = require('../../models/Tray');


router.get('/', auth, async(req, res)=>{
    const tray = await Tray.findOne({user:req.user.id})
    if(tray){
        const notifs = await Notif.find({_id: {$in: tray.notifs}}).sort({date:-1})
        
        res.json(notifs);
    }else{
        res.json([])
    }
})

router.get('/unseen', auth, async(req, res)=>{
    const tray = await Tray.findOne({user:req.user.id})
    
    if(tray){
        const notifs = await Notif.find({_id: {$in: tray.notifs}, seen: false}).sort({date:-1})
        
        res.json(notifs);
    }else{
        res.json([])
    }
})

router.post('/msg', auth, async(req,res) => {

    const profile = await Profile.findOne({user: req.user.id});

    const sender = await User.findById(req.user.id);

    let newNotif = new Notif({
        picture: profile.picture,
        kind: 'msg',
        text: `You have a new message(s) from ${sender.name}`,
        refer: profile._id
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

router.post('/event', auth, async(req, res)=> {

    const users1 = await User.find({branch: req.body.target[0]});
    const users2 = await User.find({year: req.body.target[0]});
    const users = [...users1, ...users2];

    const profile = await Profile.findOne({user: req.user.id});

    const trays = await Tray.find({user: {$in :users}});

    trays.map(async tray => {
        let newNotif = new Notif({
            picture: profile.picture,
            kind: 'event',
            text: `${req.body.name} created event ${req.body.heading}`,
            refer: req.body._id
        });
    
        let notif = await newNotif.save();
        tray.notifs.unshift(notif);
        await tray.save();
    })
    res.json(req.body)
})


router.post('/like', auth, async(req, res)=> {

    const user = await User.findById(req.user.id)
    const profile = await Profile.findOne({user: req.user.id});
    const post = await Post.findById(req.body.id)

    let newNotif = new Notif({
        picture: profile.picture,
        kind: 'post',
        text: `${user.name} liked your post`,
        refer: req.body.id,
        to: post.user
    });

    const notif = await newNotif.save();

    let tray = await Tray.findOne({user: post.user});

    if(!tray){
        tray = new Tray({
            user: post.user,
            notifs: [notif]
        })

        await tray.save();
    }else{
        tray.notifs.unshift(notif);
        await tray.save();
    }

    res.json(tray)
})

router.get('/birthday', auth, async(req,res)=>{

    let date = new Date();
    let check = date.getDate().toString()+'-'+(date.getMonth()+1).toString()
    const bday = await Profile.find({birthday: check}).populate('user',['name']);
    
    bday.map(async person => {

        const user = await User.findById(person.user._id);
        const friends = await Profile.find({_id: {$in: user.following}});
        const check = friends.map(each => {return each.user})

        const existing2 = await Notif.findOne({kind:'birthday', picture:person.picture, to:req.user.id});
        if(!existing2){
            const tray = await Tray.findOne({user: req.user.id});

            let newNotif = new Notif({
                picture: person.picture,
                kind: 'birthday',
                text: `It's ${person.user.name}s birthday today`,
                refer: user._id,
                to: tray.user
            });
            let notif = await newNotif.save()
            tray.notifs.unshift(notif);
            await tray.save();     
            res.json(bday)       
        }

        const existing = await Notif.findOne({kind:'birthday', picture:person.picture})
        
        if(!existing){

            const trays = await Tray.find({user: {$in: check}});
            
            trays.map(async tray => {
                let newNotif = new Notif({
                    picture: person.picture,
                    kind: 'birthday',
                    text: `It's ${person.user.name}s birthday today`,
                    refer: user._id,
                    to: tray.user
                });
                let notif = await newNotif.save()
                tray.notifs.unshift(notif);
                await tray.save();
            })   
        }

    });
    res.json(bday);
})

router.post('/seen', auth, async(req, res)=>{
    
    const done = await Notif.updateMany({_id: {$in: req.body.tray}, seen: false}, {$set:{seen: true}}, {new: true})
    res.json(done);
})

router.delete('/:id', auth, async(req, res)=>{

    const tray = await Tray.findOne({user: req.user.id});
    const notif = await Notif.findById(req.params.id);

    const toRemove = tray.notifs.map(each => each._id.toString()).indexOf(req.params.id);
    tray.notifs.splice(toRemove, 1);
    await tray.save();

    const done = await Notif.findOneAndRemove({_id: notif._id});
    res.json(done);
})

module.exports = router;