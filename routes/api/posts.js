const express = require('express');
const router = express.Router();

// api/posts - public
router.get('/',
    (req, res) => res.send('Posts route')
);

module.exports = router;
