const express = require('express');
const productCtrl = require('../controllers/productCtrl');
const { authorizeAdmin } = require('../middlewares/auth');

const router = express.Router();

router.get('/', productCtrl.get);
router.get('/page/:page/size/:size', productCtrl.get);

router.get('/:id', productCtrl.getById);

router.post('/', productCtrl.post);
router.delete('/:id', authorizeAdmin, productCtrl.remove);

router.put('/:id', productCtrl.update);
router.patch('/:id', productCtrl.patch);

module.exports = router;
