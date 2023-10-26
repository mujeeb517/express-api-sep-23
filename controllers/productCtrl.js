const productRepo = require('../repositories/productRepo');

const get = async (req, res) => {
    const page = req.params.page || 1;
    const pageSize = req.params.size || 10;

    var p = productRepo.get(pageSize, page);
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

const update = async (req, res) => {
    try {
        const id = req.params.id;
        const payload = req.body;
        await productRepo.update(id, payload);
        res.status(204);
        res.send();
    } catch (err) {
        res.status(500);
        res.send('Internal server error');
    }
};

const patch = async (req, res) => {
    try {
        const id = req.params.id;
        const payload = req.body;
        await productRepo.patch(id, payload);
        res.status(204);
        res.send();
    } catch (err) {
        res.status(500);
        res.send('Internal server error');
    }
};

module.exports = {
    get,
    post,
    getById,
    remove,
    update,
    patch,
};


// GET, POST, DELETE, PUT, PATCH
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
// PUT /api/products/:id

// Pagination (enough, performance)

// Page size: 10
// current:  1, 2, 3, 4, 5
// 1 - 100
// 1- 10
// 10 11-20
// 21-30
// 31 - 40 
// 51 - 60

// skip: (current-1) * pageSize 
// 1 * 10  = 10, 11 - 20
// (n-1)*pageSize
// 4*10 = 40 41-50


// 101 records
// pageSize: 10
// totalPages: Math.ceil(records/pageSize) = 101/10 = 11

// totalRecords: x
// pageSize: 10
// current: 
