const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    productId: {
        type: String,
        required: [true, 'ProductId is required'],
    },
    subject: {
        type: String,
        required: [true, 'Subject is required'],
    },
    message: {
        type: String,
        required: [true, 'message is required']
    },
    rating: {
        type: Number,
        required: [true, 'Rating is required'],
    },
    createdDate: {
        type: Date,
        required: true
    },
    updatedDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('reviews', schema);