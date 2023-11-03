const express = require('express');
const productCtrl = require('../controllers/productCtrl');
const { authorizeAdmin } = require('../middlewares/auth');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const random = Math.round(Math.random(0, 9) * 1E9);
        const dt = Date.now();
        const fileName = `${random}-${dt}-${file.originalname}`;
        req.body.image = fileName;
        cb(null, fileName);
    },
});

const upload = multer({ storage });

const router = express.Router();

router.get('/', productCtrl.get);
router.get('/page/:page/size/:size', productCtrl.get);

router.get('/:id', productCtrl.getById);

// write file to the file system
router.post('/', upload.single('image'), productCtrl.post);

router.delete('/:id', authorizeAdmin, productCtrl.remove);

router.put('/:id', productCtrl.update);
router.patch('/:id', productCtrl.patch);

module.exports = router;
