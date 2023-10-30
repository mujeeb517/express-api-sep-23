const express = require('express');
const homeRouter = require('./routes/homeRouter');
const productRoutes = require('./routes/productRouter');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

mongoose.connect('mongodb://127.0.0.1:27017/products-sep-23')
    .then(() => console.log('Connected to Db'))
    .catch(err => console.log(err));

app.use(bodyParser.json());
app.use('/', homeRouter);

// validate my request
// middleware
function authenticate(req, res, next) {
    const headers = req.headers;
    console.log(headers.authorization);
    next();
}


// pipeline
// stages
// 

app.use(authenticate);


app.use('/api/products', productRoutes);
