const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator/check');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');

//@route    GET api/profile/me
//@desc     Open a users profile
//@access   Private
router.get('/me', auth, async function(req,res){
    try{
        const profile = await Profile.findOne({user: req.user.id}).populate('user', ['name','avatar','year','branch']);
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
        githubusername,
        linkedin,
        twitter,
        youtube,
        facebook,
        instagram
    } = req.body;

    //Build Profile Object
    const ProfileFields = {};
    ProfileFields.user = req.user.id;
    if(dateOfBirth) ProfileFields.dateOfBirth = dateOfBirth;
    if(contact) ProfileFields.contact = contact;
    if(location) ProfileFields.location = location;
    if(position) ProfileFields.position = position;
    if(bio) ProfileFields.bio = bio;
    if(skills){
        ProfileFields.skills = skills.split(',').map(skill => skill.trim());
    }
    if(githubusername) ProfileFields.dept = githubusername;
    ProfileFields.social = {}
    if(linkedin) ProfileFields.social.linkedin = linkedin;
    if(twitter) ProfileFields.social.twitter = twitter;
    if(youtube) ProfileFields.social.youtube = youtube;
    if(facebook) ProfileFields.social.facebook = facebook;
    if(instagram) ProfileFields.social.instagram = instagram;

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

        const profiles = await Profile.find({user: {$in:users}}).populate('user',['name','avatar','year','branch']);
        res.json(profiles);

    }catch(err){
        
        console.error(err.message);
        res.status(500).send('Server Error');

    }
});

//@route    GET api/profile/user/user_id
//@desc     Get all profiles
//@access   Public
router.get('/user/:user_id', async function(req, res){
    try{

        const profile = await Profile.findOne({user: req.params.user_id}).populate('user',['name','avatar','year','branch']);
        
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
    const { semester, sgpa } = req.body;
    let cgpa = parseFloat(sgpa);
    profile.status.forEach((stat)=>{
        cgpa = cgpa + parseFloat(stat.sgpa)
    })
    
    profile.status.length>0 && (cgpa = parseFloat(cgpa/(profile.status.length+1)))
    

    const newStatus = {
        semester, sgpa, cgpa
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

        console.log(profile.skills);
        profile.skills.unshift(skill);
        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


module.exports = router;