const Product = require('../model/productModel');
const Review = require('../model/reviewModel');

const count = (search) => {
    const filter = {
        $or: [
            { brand: new RegExp(search, 'i') },
            { model: new RegExp(search, 'i') }
        ]
    };
    return Product.count(filter);
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

const get = (pageSize, page, sortBy, sortDir, search) => {
    const recordsToSkip = (page - 1) * pageSize;
    const sortField = getSortBy(sortBy);
    const sortDirField = getSortDir(sortDir);

    // pattern matching

    // mobile number, sending otp
    // 9900ab2892
    // 10 digts
    // abc@gmail.com
    // character@akdfkdf.character
    // [0-9]{10}
    // [a-z][A-Z]+@[a-z][A-Z]+.[a-z][A-Z]+

    const filter = {
        $or: [
            { brand: new RegExp(search, 'i') },
            { model: new RegExp(search, 'i') }
        ]
    };

    return Product
        .find(filter, { __v: 0 })
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

const addReview = (payload) => {
    const review = new Review(payload);
    return review.save();
};

const getReviews = (productId) => {
    return Review.find({productId},{_id:0,__v:0});
};


module.exports = {
    get,
    add,
    getById,
    remove,
    update,
    patch,
    count,
    addReview,
    getReviews,
};