const express = require('express');
const productCtrl = require('../controllers/productCtrl');

const router = express.Router();

router.get('/', productCtrl.get);
router.get('/page/:page/size/:size', productCtrl.get);

router.post('/', productCtrl.post);
router.get('/:id', productCtrl.getById);
router.delete('/:id', productCtrl.remove);
router.put('/:id', productCtrl.update);
router.patch('/:id', productCtrl.patch);

module.exports = router;
