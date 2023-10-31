const express = require('express');
const userCtrl = require('../controllers/userCtrl');

const router = express.Router();

router.post('/signup', userCtrl.signup);

module.exports = router;


// model -> repo -> ctrl -> router -> index.js