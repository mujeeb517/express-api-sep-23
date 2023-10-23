const productRepo = require('../repositories/productRepo');

const get = (req, res) => {
    productRepo.get()
        .then(data => {
            res.status(200);
            res.send(data);
        })
        .catch(err => {
            res.status(500);
            res.send('Internal server error');
        });
};

const post = async (req, res) => {
    try {
        await productRepo.add(req.body);
        res.status(201);
        res.send('Created');
    } catch (err) {
        res.status(500);
        res.send('Internal server error');
    }
};

module.exports = {
    get,
    post,
};

// index.js -> productRouter -> productCtrl -> productSvc-> productRepo -> 200, data
// add
// POST : localhost:3000/api/products
// body {brand,model,price, inStock, discount}