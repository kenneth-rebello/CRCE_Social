const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator/check');
const auth = require('../../middleware/auth');
const Post = require('../../models/Post');
const User = require('../../models/User');

router.get('/posts', auth, async (req, res) => {

    const posts= await Post.find({approved:false}).sort({date: 1});

    res.json(posts);

});

router.get('/users', auth, async (req,res) => {

    const users = await User.find({approved:false}).sort({date: 1});
    
    res.json(users);

});

router.get('/approve/post/:id', auth, async (req, res) => {

    const post = await Post.findOne({_id:req.params.id});

    post.approved = true;

    await post.save();

    res.json(post);
});

router.get('/approve/user/:id', auth, async (req, res) => {

    const user = await User.findOne({_id:req.params.id});

    user.approved = true;

    await user.save();

    res.json(user);
});

module.exports = router;