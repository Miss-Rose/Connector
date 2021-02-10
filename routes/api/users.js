const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcrypt');
const {check, validationResult} = require('express-validator');

const User = require('../../modules/User');


// @route api/users - public
// @desc  register user
router.post('/', [
        check('name', 'Name is required')
            .not()
            .isEmpty(),
        check('email', 'Put valid email')
            .isEmail(),
        check('password', 'Put valid email')
            .isLength({min: 6})
    ],
    async (req, res) => {
        console.log(req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const {name, email, password} = req.body;
        try {
            //See if user exists
                let user = await User.findOne({email});
                if(user){
                    res.status(400).json({errors: [{msg: 'user already exist'}]});
                }
            //Get user gravatar
                const avatar = gravatar.url(email, {
                    s: '200',
                    r: 'pg',
                    d: 'mm'
                });
                user = new User ({
                    name,
                    email,
                    avatar,
                    password
                });
            //Encrypt password
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(password, salt);
                await user.save();
            //Return jsonwebtokcken

            res.send('User registered')
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

module.exports = router;
