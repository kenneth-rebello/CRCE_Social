const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator/check');
const User = require('../../models/User');



//@route    GET api/users
//@desc     Register user
//@access   Public
router.post('/',
[
    check('name','Name is required').not().isEmpty(),
    check('email', 'Valid email is required').isEmail(),
    check('branch', 'Branch is required').not().isEmpty(),
    check('year', 'Year is required').not().isEmpty(),
    check('password','Password must have 6 or more characters').isLength({min:6})
],
async function(req,res){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {name, email, branch, year, password} = req.body;

    try{
        // Check for existing users
        let user =  await User.findOne({email});
        
        if(user){
            return res.status(400).json({
                errors: [{msg: 'User already exists'}]
            });
        }


        user = new User({
            name,
            email,
            branch,
            year,
            password
        });

        //Encrypt password

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        return res.json({id: user._id})        

    } catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }

});

module.exports = router;