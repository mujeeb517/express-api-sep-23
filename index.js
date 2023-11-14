const express = require('express');
const homeRouter = require('./routes/homeRouter');
const productRoutes = require('./routes/productRouter');
const userRouter = require('./routes/userRouter');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path=require('path');
const fs=require('fs');

const { tokenAuth } = require('./middlewares/auth.js');

const app = express();

const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

mongoose.connect('mongodb://127.0.0.1:27017/products-sep-23')
    .then(() => console.log('Connected to Db'))
    .catch(err => console.log(err));

const ws= fs.createWriteStream(path.join(__dirname,'logs', 'req.log'), { flags: 'a' });

app.use(morgan('dev'));

app.use(morgan('common',{
    stream:ws
}));

app.use(bodyParser.json());

// static files
app.use(express.static('uploads'));

// public
app.use('/', homeRouter);
app.use('/api/users', userRouter);

// app.use(basicAuth);
// app.use(tokenAuth);

// private
app.use('/api/products', productRoutes);