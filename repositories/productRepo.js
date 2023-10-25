const Product = require('../model/productModel');


const get = () => {
    // db call
    // nodejs delegate
    return Product.find({}, { __v: 0 });
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

module.exports = {
    get,
    add,
    getById,
    remove,
};