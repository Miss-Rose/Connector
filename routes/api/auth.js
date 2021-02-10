const express = require('express');
const router = express.Router();

// api/auth - public
router.get('/',
    (req, res) => res.send('Auth route')
);

module.exports = router;
