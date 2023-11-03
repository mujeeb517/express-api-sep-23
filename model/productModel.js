const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    brand: {
        type: String,
        required: [true, 'Brand is required'],
        minLength: [3, 'Brand should have at least 3 chars'],
        maxLength: [50, 'Brand should not exceed 50 chars'],
    },
    model: {
        type: String,
        required: [true, 'Model is required'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: [0, 'Invalid price'],
        max: [100000, 'Invalid price'],
        // validate: {
        //     validator: function (val) {
        //         return val > 10 && val < 1000;
        //     },
        //     message: 'custom validation failed'
        // }
    },
    image: {
        type: String
    },
    inStock: Boolean,
    discount: Number,
    createdDate: Date,
    updatedDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('products', schema);