const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const {check, validationResult} = require('express-validator');
const nodemailer = require('nodemailer');

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
        
        if(!user.confirmed){
            return res.status(400).json({
                errors: [{msg: 'Please verify your email to activate your account'}]
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

router.post('/send_confirmation', async (req, res)=>{

    const user = await User.findById(req.body.id);

    const url = `https://edusocial.herokuapp.com//confirm/${user.email}/${user._id}`
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'crcesocial',
            pass: 'jonah1002'
        },
        tls: {rejectUnauthorized: false}
    });

    let mailOptions = {
        from: 'crcesocial@gmail.com',
        to: user.email,
        subject: `Email Verification - Edu-Social`,
        text: `Please click the following link to verify your email id and access your Edu-Social account ${url}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log('Did not send: '+error)
        }else{
            console.log('Email sent: '+info.response)
        }
        transporter.close();
    })
})

router.post('/confirm_email', async(req,res) => {

    const user = await User.findById(req.body.id);

    if(user.email === req.body.email){
        user.confirmed = true;
        await  user.save();
        return res.json({check: true})
    }else{
        return res.json({check: false})
    }

})

module.exports = router;