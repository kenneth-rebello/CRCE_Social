const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator/check');
const auth = require('../../middleware/auth');
const Post = require('../../models/Post');
const User = require('../../models/User');
const Profile = require('../../models/Profile');

router.get('/posts', auth, async (req, res) => {

    const posts= await Post.find({approved:false}).sort({date: -1});

    res.json(posts);

});

router.get('/approve/:id', auth, async (req, res) => {

    const post = await Post.findOne({_id:req.params.id});

    post.approved = true;

    await post.save();

    res.json(post);
});

module.exports = router;