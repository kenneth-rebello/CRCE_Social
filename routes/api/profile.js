const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator');
const fileUpload = require('express-fileupload')
const path = require('path');
const fs = require('fs');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');

const mongoose = require('mongoose');
const crypto = require('crypto');
const config = require('config');
const db = config.get('mongoURI');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

let gfs;

//@route    GET api/profile/me
//@desc     Open a users profile
//@access   Private
router.get('/me', auth, async function(req,res){
    try{
        const profile = await Profile.findOne({user: req.user.id}).populate('user', ['name','avatar','year','branch','email']);
        if(!profile){
            return res.status(400).json({msg: 'There is no existing profile'});
        }
        res.json(profile);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route    GET api/profile/me
//@desc     Create/Update a user profile
//@access   Private
router.post('/', [auth], async function(req, res){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});     
    }

    const {
        user,
        dateOfBirth,
        contact,
        location,
        skills,
        achievements,
        position,
        bio,
        github,
        linkedin,
        twitter,
        youtube,
        facebook,
        instagram
    } = req.body;

    let dOb = new Date(dateOfBirth)

    //Build Profile Object
    const ProfileFields = {};
    ProfileFields.user = req.user.id;
    if(dateOfBirth) ProfileFields.dateOfBirth = dateOfBirth;
    let birthday =dOb.getDate().toString()+'-'+(dOb.getMonth()+1).toString()
    ProfileFields.birthday = birthday;
    if(contact) ProfileFields.contact = contact;
    if(location) ProfileFields.location = location;
    if(position) ProfileFields.position = position;
    if(bio) ProfileFields.bio = bio;
    if(skills){
        ProfileFields.skills = skills.split(',').map(skill => skill.trim());
    }

    ProfileFields.social = {}
    if(linkedin) ProfileFields.social.linkedin = linkedin;
    if(twitter) ProfileFields.social.twitter = twitter;
    if(youtube) ProfileFields.social.youtube = youtube;
    if(facebook) ProfileFields.social.facebook = facebook;
    if(instagram) ProfileFields.social.instagram = instagram;
    if(github) ProfileFields.social.github = github;

    try{
        
        let profile = await Profile.findOne({user: req.user.id})

        if(profile){
            profile = await Profile.findOneAndUpdate({user: req.user.id}, { $set: ProfileFields}, {new:true});

            return res.json(profile);
        };

        profile = new Profile(ProfileFields);
        await profile.save();
        return res.json(profile)

    }catch(err){

        console.error(err.message);
        res.status(500).send('Server Error');

    }
  
});

//@route    GET api/profile
//@desc     Get all profiles
//@access   Public
router.get('/', async function(req, res){
    try{

        const users = await User.find({approved:true});

        const profiles = await Profile.find({user: {$in:users}}).populate('user',['name','email','year','branch','approved']);
        res.json(profiles);

    }catch(err){
        
        console.error(err.message);
        res.status(500).send('Server Error');

    }
});

//@route    GET api/profile/user/user_id
//@desc     Get profile by user id
//@access   Public
router.get('/user/:user_id', async function(req, res){
    try{

        const profile = await Profile.findOne({user: req.params.user_id}).populate('user',['name','email','avatar','year','branch']);
        
        if(!profile){
            return res.status(400).json({msg: 'There is no profile for this user'});
        }

        res.json(profile);

    }catch(err){
        
        console.error(err.message);
        res.status(500).send('Server Error');

    }
});

//@route    DELETE api/profile
//@desc     Delete profile, user and posts
//@access   Private
router.delete('/', auth, async function(req, res){
    try{
        await Post.deleteMany({ user: req.user.id });
        //Remove Profile
        await Profile.findOneAndRemove({user: req.user.id});
        //Remove User
        await User.findOneAndRemove({_id: req.user.id});
         
        return res.json({msg: 'User removed'});
    }catch(err){
        
        console.error(err.message);
        res.status(500).send('Server Error');

    }
});

router.put('/follow', auth, async(req,res) => {
    try {
        
        let user = await User.findById(req.user.id);

        const { id } = req.body;

        
        if(user.following.some(one => one._id == id)){
            return res.status(400).json({msg: 'Already connected'});
        }else{
            let other = await Profile.findOne({_id: id});
            let otherUser = await User.findOne({_id: other.user});
            let me = await Profile.findOne({user: req.user.id});
            otherUser.following.unshift(me._id);
            await otherUser.save();
            user.following.unshift(id);
            await user.save();

        }

        user = await User.findById(req.user.id).populate('following.profile',['picture']);

        res.json(user)

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.put('/unfollow', auth, async(req,res) => {
    try {
        
        let user = await User.findById(req.user.id);

        const { id } = req.body;
        if(user.following.some(one => one._id == id)){
            user.following = user.following.filter(one => one._id != id);
            await user.save();
        }else{
            return res.status(400).json({msg: 'Not connected yet'});
        }

        user = await User.findById(req.user.id).populate('following.profile',['picture']);

        res.json(user)

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

router.post('/picture', auth, async (req, res) => {

    const posts = await Post.find({user:req.user.id});

    const conn = mongoose.createConnection(db, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });

    const storage = new GridFsStorage({
        url: db,
        file: (req, file) => {
            return new Promise((resolve, reject) => {
                
                crypto.randomBytes(16, (err, buf) => {
                    
                    if (err) {
                        return reject(err);
                    }

                    const filename = buf.toString('hex') + path.extname(file.originalname);

                    const fileInfo = {
                        filename: filename,
                        bucketName: 'uploads'
                    };
                    resolve(fileInfo);
                });
            });
        }
    });

    const upload = multer({ storage }).single('file');

    conn.once('open', async() => {
        console.log('MongoDB Uploader connected');
        gfs = Grid(conn.db, mongoose.mongo);
        gfs.collection('uploads');
        upload(req, res, async()=>{
            console.log('Success');
            const profile = await Profile.findOne({user: req.user.id});
            if(profile.picture){
                gfs.remove({filename: profile.picture, root: 'uploads'}, (err) => {
                    if(err){
                        return res.status(404).json({err: err});
                    }
                });
            }
            const updated = await Profile.findOneAndUpdate({user: req.user.id}, { $set:{picture: req.file.filename}}, {new:true});
            posts.map(async(post) => {
                await Post.findOneAndUpdate({_id:post._id}, {$set:{picture: req.file.filename}})
            });
            res.json(updated);
        });
    });

})

router.delete('/picture', auth, async(req, res)=>{

    const profile = await Profile.findOne({user: req.user.id});
    
    if(profile.picture){
        gfs.remove({filename: profile.picture, root: 'uploads'}, (err) => {
            if(err){
                return res.status(404).json({err: err});
            }
        });
    }

    const updated = await Profile.findOneAndUpdate({user: req.user.id}, { $set:{picture: undefined}}, {new:true});
    res.json(updated);

    const posts = await Post.find({user:req.user.id});
    posts.map(async(post) => {
        await Post.findOneAndUpdate({_id:post._id}, {$set:{picture: undefined}})
    });
})


//@route    PUT api/profile/experience
//@desc     Add Profile Education
//@access   Private

router.put('/education', [auth, [
    check('institute','Institute name is required').not().isEmpty(),
    check('course','Course is required').not().isEmpty(),
    check('to','Completion date is required').not().isEmpty()
]],
async function(req, res){
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const { institute, course, to, from } = req.body;

    const newEdu = {
        institute, course, from, to
    }


    try {

        const profile = await Profile.findOne({user: req.user.id}).populate('user', ['name','avatar','year','branch']);

        profile.education.unshift(newEdu);

        await profile.save();

        res.json(profile);
        
    } catch (err) {

        console.error(err.message);
        res.status(500).send('Server error');

    }
});



//@route    DELETE api/profile/education
//@desc     Delete Profile Education
//@access   Private

router.delete('/education/:edu_id', auth, async function(req, res){
    try {
        const profile = await Profile.findOne({user: req.user.id}).populate('user', ['name','avatar','year','branch']);

        const toRemove = profile.education.map(item => item.id).indexOf(req.params.edu_id);

        profile.education.splice(toRemove, 1);

        await profile.save();
        return res.json(profile);        
    } catch (err) {

        console.error(err.message);
        res.status(500).send('Server error');

    }
});



//@route    PUT api/profile/status
//@desc     Add Academic Status
//@access   Private

router.put('/status', [auth, [
    check('semester','Semester is required').not().isEmpty(),
    check('sgpa','SGPA is required').not().isEmpty()
]],
async function(req, res){
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const profile = await Profile.findOne({user: req.user.id}).populate('user', ['name','avatar','year','branch']);
    let { semester, sgpa, backlogs } = req.body;


    if(semester === 'First' && profile.status[0]){
        return res.status(400).json({errors: [{msg: 'Incorrect semester'}]});
    }
    if(semester === 'Second' && profile.status[0].semester != 'First'){
        return res.status(400).json({errors: [{msg: 'Incorrect semester'}]});
    }
    if(semester === 'Third' && profile.status[0].semester != 'Second'){
        return res.status(400).json({errors: [{msg: 'Incorrect semester'}]});
    }
    if(semester === 'Fourth' && profile.status[0].semester != 'Third'){
        return res.status(400).json({errors: [{msg: 'Incorrect semester'}]});
    }
    if(semester === 'Fifth' && profile.status[0].semester != 'Fourth'){
        return res.status(400).json({errors: [{msg: 'Incorrect semester'}]});
    }
    if(semester === 'Sixth' && profile.status[0].semester != 'Fifth'){
        return res.status(400).json({errors: [{msg: 'Incorrect semester'}]});
    }
    if(semester === 'Seventh' && profile.status[0].semester != 'Sixth'){
        return res.status(400).json({errors: [{msg: 'Incorrect semester'}]});
    }
    if(semester === 'Eighth' && profile.status[0].semester != 'Seventh'){
        return res.status(400).json({errors: [{msg: 'Incorrect semester'}]});
    }

    let cgpa = parseFloat(sgpa);
    profile.status.forEach((stat)=>{
        cgpa = cgpa + parseFloat(stat.sgpa)
        backlogs = backlogs + parseInt(stat.backlogs)
    })
    
    profile.status.length>0 && (cgpa = parseFloat(cgpa/(profile.status.length+1)))
    
    cgpa = parseFloat(cgpa.toFixed(2))

    const newStatus = {
        semester, sgpa, cgpa, backlogs
    }

    try {

        profile.status.unshift(newStatus);

        await profile.save();

        res.json(profile);
        
    } catch (err) {

        console.error(err.message);
        res.status(500).send('Server error');

    }
});


//@route    DELETE api/profile/marks
//@desc     Delete Profile Marks
//@access   Private

router.delete('/status/:status_id', auth, async function(req, res){
    try {
        const profile = await Profile.findOne({user: req.user.id}).populate('user', ['name','avatar','year','branch']);

        const toRemove = profile.status.map(item => item.id).indexOf(req.params.status_id);

        profile.status.splice(toRemove, 1);

        await profile.save();
        return res.json(profile);        
    } catch (err) {

        console.error(err.message);
        res.status(500).send('Server error');

    }
});


//@route    PUT api/skill
//@desc     Add Skill
//@access   Private

router.put('/skill', [auth, [
    check('skill','Skill is required').not().isEmpty(),
]],
async function(req, res){

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {skill} = req.body;
    try {
        const profile = await Profile.findOne({user: req.user.id}).populate('user', ['name','avatar','year','branch']);

        profile.skills.unshift(skill);
        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


router.put('/skill/remove', auth, async function(req, res){

    try {
        const profile = await Profile.findOne({user: req.user.id});

        profile.skills = profile.skills.filter( each => each !== req.body.skill);
        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.post('/search', auth, async function(req, res){
    try {
        
        const users = await User.find({name:{$regex: req.body.terms}});
        
        const profiles = await Profile.find({user: {$in: users}}).populate('user', ['name','approved','year','branch']);
        
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

router.get('/following/:id', auth, async function(req, res){

    try {
        
        const user = await User.findById(req.params.id);

        const friends = await Profile.find({_id: {$in: user.following}}).populate('user',['name','approved','year','branch']);
        
        res.json(friends);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }

})

module.exports = router;