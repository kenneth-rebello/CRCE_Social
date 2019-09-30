const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Message = require('../../models/Message')

router.post('/newmessage', auth, async (req, res) => {

    let chat = await Chat.findOne({user1: req.user.id, user2:req.body.to});
    if(!chat){
        chat = await Chat.findOne({user2: req.user.id, user1:req.body.to});
    }
    
    if(!chat){
        let newChat = new Chat({
            user1: req.user.id,
            user2: req.body.to,
            messages: []
        })

        chat = await newChat.save();
    }

    
    let newMsg = new Message({
        text: req.body.msg,
        user: req.user.id
    })

    const msg = await newMsg.save();

    
    let messages = [...chat.messages, msg];
    const newOne = await Chat.findOneAndUpdate({_id: chat._id},{ $set: {messages: messages}}, {new:true})
    
    return res.json(msg)
})

router.get('/users', auth, async (req,res) => {

    const user = await User.findById(req.user.id);

    const friends = await Profile.find({_id: {$in: user.following}}).populate('user',['name']);

    res.json(friends);
})

router.post('/load', auth, async(req, res) => {

    const me = req.body.me;
    const to = req.body.to;

    const chat = await Chat.findOne({users: me, users: to}).populate('messages',['text','user']);
    if(chat){
        return res.json(chat.messages);
    }

})

module.exports = router;