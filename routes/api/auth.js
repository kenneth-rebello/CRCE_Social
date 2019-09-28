const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const {check, validationResult} = require('express-validator/check');

//@route    GET api/auth
//@desc     Test route
//@access   Public
router.get('/', auth, async function(req,res){
    try{
        const user = await User.findById(req.user.id).select('-password').populate('following.profile',['picture', 'user']);
        res.json(user);
    }catch(err){
        res.status(500).send('Server Error');
    }
});


router.post('/',
[
    check('email', 'Valid email required').isEmail(),
    check('password','Password required').exists()
],
async function(req,res){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {body, email, password} = req.body;

    try{
        // Check for existing users
        let user =  await User.findOne({email});
        
        if(!user){
            return res.status(400).json({
                errors: [{msg: 'Invalid credentials'}]
            });
        }
        

        //Check password match

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                errors: [{msg: 'Invalid credentials'}]
            });
        }

        //Return jsonwebtoken

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, config.get('jwtSecret'), {expiresIn: 360000},(err, token) => {
            if(err) throw err;
            res.json({token});
        })

    } catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }

});



module.exports = router;