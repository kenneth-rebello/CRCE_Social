const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Message = require('../../models/Message')

router.post('/newmessage', auth, async (req, res) => {

    const user = await User.findById(req.user.id).select('-password');

    let newMsg = new Message({
        text: req.body.msg,
        user: user._id
    })

    const msg = await newMsg.save();
    return res.json(msg)
})

module.exports = router;