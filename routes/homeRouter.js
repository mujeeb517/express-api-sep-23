const express = require('express');
const homeCtrl = require('../controllers/homeCtrl');

const router = express.Router();

router.get('/',homeCtrl.get);
router.get('/health',homeCtrl.health);


module.exports = router;