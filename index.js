const express = require('express');
const cors = require('cors'); // commonjs
const homeRouter = require('./routes/homeRouter');
const productRoutes = require('./routes/productRouter');
const userRouter = require('./routes/userRouter');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const config = require('./config');

const { tokenAuth } = require('./middlewares/auth.js');

const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

mongoose.connect(config.conStr)
    .then(() => console.log('Connected to Db'))
    .catch(err => console.log(err));

const ws = fs.createWriteStream(path.join(__dirname, 'logs', 'req.log'), { flags: 'a' });

// allow all origins
app.use(cors());

app.use(morgan('dev'));

app.use(morgan('common', {
    stream: ws
}));

app.use(bodyParser.json());

// static files
app.use(express.static('uploads'));

// public
app.use('/', homeRouter);
app.use('/api/users', userRouter);

// app.use(basicAuth);
app.use(tokenAuth);

// private
app.use('/api/products', productRoutes);