const productRepo = require('../repositories/productRepo');

const get = async (req, res) => {
    // const products = await productRepo.get();
    // res.status(200);
    // res.json(products);
    var p = productRepo.get();
    p.then(function (products) {
        res.status(200);
        res.json(products);
    })
        .catch(function (err) {
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

const getById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await productRepo.getById(id);
        if (data) {
            res.status(200);
            res.json(data);
        } else {
            res.status(404);
            res.send('not found');
        }
    } catch (err) {
        res.status(500);
        res.send('Internal server error');
    }
};

const remove = async (req, res) => {
    try {
        const id = req.params.id;
        await productRepo.remove(id);
        res.status(204);
        res.send();
    } catch (err) {
        res.status(500);
        res.send('internal server error');
    }
};

module.exports = {
    get,
    post,
    getById,
    remove,
};

// delete
// getbyId single
// GET http://localhost:3000/api/products/:id
// repo method, controller, router
// index.js -> productRouter -> productCtrl -> productSvc-> productRepo -> 200, data
// add
// POST : localhost:3000/api/products
// body {brand,model,price, inStock, discount}

// index.js -> 3000
// localhost:3000/api/products GET
// DELETE localhost:3000/api/products/:id