const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');

// @route api/users - public
// @desc  register user
router.post('/',[
    check('name', 'Name is required')
        .not()
        .isEmpty(),
    check('email', 'Put valid email')
        .isEmail(),
    check('password', 'Put valid email')
        .isLength({min: 6})
    ],
    (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
        res.send('User route')
    }
);

module.exports = router;
