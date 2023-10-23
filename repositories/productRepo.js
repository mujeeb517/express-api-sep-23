const Product = require('../model/productModel');

const get = () => {
   return  Product.find();
};

const add = (payload)=>{
    const product = new Product(payload);
    return product.save();
};

module.exports = {
    get,
    add,
};