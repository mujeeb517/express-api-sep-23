const Product = require('../model/productModel');

const count = () => {
    return Product.count();
};

const getSortBy = (sortBy) => {
    switch (sortBy.toLowerCase()) {
        case 'brand':
        case 'model':
        case 'price':
        case 'discount':
            return sortBy.toLowerCase();
        default:
            return 'brand';
    }
};

const getSortDir = (sortDir) => {
    switch (sortDir.toLowerCase()) {
        case 'asc':
            return 1;
        case 'desc':
            return -1;
        default:
            return -1;
    }
};

const get = (pageSize, page, sortBy, sortDir) => {
    const recordsToSkip = (page - 1) * pageSize;
    const sortField = getSortBy(sortBy);
    const sortDirField = getSortDir(sortDir);

    return Product
        .find({}, { __v: 0 })
        .sort({ [sortField]: sortDirField })
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
    count,
};