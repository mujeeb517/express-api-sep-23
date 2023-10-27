const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    brand: String,
    model: String,
    price: Number,
    inStock: Boolean,
    discount: Number,
    createdDate: Date,
    updatedDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', schema);