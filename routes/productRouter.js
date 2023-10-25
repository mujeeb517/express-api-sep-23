const express = require('express');
const productCtrl = require('../controllers/productCtrl');

const router = express.Router();

router.get('/', productCtrl.get);
router.post('/', productCtrl.post);
router.get('/:id', productCtrl.getById);
router.delete('/:id', productCtrl.remove);


module.exports = router;