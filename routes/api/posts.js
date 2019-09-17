const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator/check');
const auth = require('../../middleware/auth');
const Post = require('../../models/Post');
const User = require('../../models/User');
const Profile = require('../../models/Profile');

//@route    POST api/posts
//@desc     Create a Post
//@access   Private
router.post('/', [auth, [
    check('text', 'Text is required').not().isEmpty()
]],
async function(req,res){
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({msg: errors.array()});
    }

    try {

        const user = await User.findById(req.user.id).select('-password');
        const profile = await Profile.find({user:req.user.id})


        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            picture: profile.picture,
            user: req.user.id
        })       

        const post = await newPost.save();

        console.log(post);
        res.json(post);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

//@route    GET api/posts
//@desc     Get all posts
//@access   Private
router.get('/', auth, async function (req, res){
    try {

        const posts = await Post.find({approved:true}).sort({ date: -1});
        return res.json(posts);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

//@route GET api/posts/user/:id
//@desc GET posts by user id
//@access Private
router.get('/user/:id', async function(req,res){
    try {

        const posts = await Post.find({user:req.params.id}).sort({date: -1});
        return res.json(posts)
        

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route    GET api/posts/:id
//@desc     Get post by id
//@access   Private
router.get('/:id', auth, async function (req, res){
    try {

        const post = await Post.findById(req.params.id);

        if(!post){
            return res.status(404).json({msg: 'Post not found'});
        }

        return res.json(post);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

//@route    DELETE api/posts/:id
//@desc     Delete a post
//@access   Private
router.delete('/:id', auth, async function (req, res){
    try {

        const post = await Post.findById(req.params.id);

        if(!post){
            return res.status(404).json({msg: 'Post not found'});
        };

        //Check user
        if(post.user.toString() !== req.user.id ){
            return res.status(401).json({msg: 'User not authorized'});
        }

        await post.remove();
        return res.send('Post removed');

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

//@route    PUT api/posts/like/:id
//@desc     Like a post
//@access   Private
router.put('/like/:id', auth, async function(req, res){
    try {
        const post = await Post.findById(req.params.id);

        //Check if already liked
        if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
            return res.status(400).json({msg: 'Already liked'});
        }

        post.likes.unshift({user: req.user.id});
        await post.save();

        res.json(post.likes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

//@route    PUT api/posts/unlike/:id
//@desc     Unlike a post
//@access   Private
router.put('/unlike/:id', auth, async function(req, res){
    try {
        const post = await Post.findById(req.params.id);
        //Check if already liked
        if(post.likes.filter(like => like.user.toString() === req.user.id).length == 0){
            return res.status(400).json({msg: 'Not liked'});
        }

        const toRemove = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
        post.likes.splice(toRemove, 1);
        await post.save();

        res.json(post.likes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error'); 
    }
});

//@route    POST api/posts/comments/:id
//@desc     Comment on a post
//@access   Private
router.post('/comment/:id', [auth, [
    check('text', 'Text is required').not().isEmpty()
]],
async function(req,res){
    
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({msg: errors.array()});
    }

    try {

        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.id);

        const newComment ={
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        };

        post.comments.unshift(newComment);

        await post.save();

        res.json(post.comments);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

//@route    DELETE api/posts/comments/:id/:comment_id
//@desc     Delete a comment
//@access   Private
router.delete('/comment/:id/:comment_id', auth, async function(req,res){
    
    try {

        const post = await Post.findById(req.params.id);

        const comment = post.comments.find(comment => comment.id === req.params.comment_id);
        if(!comment){
            return res.status(404).json({msg: 'Comment does not exist'});
        };

        if(comment.user.toString() !== req.user.id){
            return res.status(401).json({msg: 'User not authorized'});
        }

        const toRemove = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);
        post.comments.splice(toRemove, 1);
        await post.save();

        res.json(post.comments);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});


module.exports = router;