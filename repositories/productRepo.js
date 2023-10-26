const Product = require('../model/productModel');

const get = (pageSize, page) => {
    const recordsToSkip = (page - 1) * pageSize;
    return Product
        .find({}, { __v: 0 })
        .skip(recordsToSkip)
        .limit(pageSize);
};

const add = (payload) => {
    const product = new Product(payload);
    return product.save();
};

const getById = (id) => {
    // return Product.findOne({ _id: id }, { __v: 0 });
    return Product.findById(id, { __v: 0 });
};

const remove = (id) => {
    return Product.findByIdAndRemove(id);
};

const update = (id, payload) => {
    return Product.findByIdAndUpdate(id, payload);
};

const patch = (id, payload) => {
    const updateReq = { $set: {} };
    delete payload._id;

    for (let key in payload) {
        updateReq.$set[key] = payload[key];
    }

    return Product.findByIdAndUpdate(id, updateReq);
};

module.exports = {
    get,
    add,
    getById,
    remove,
    update,
    patch,
};