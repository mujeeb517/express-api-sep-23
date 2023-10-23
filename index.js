const express = require('express');
const homeRouter = require('./routes/homeRouter');
const productRoutes = require('./routes/productRouter');
const mongoose = require('mongoose');

const app = express();

const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// java -> oracle (drivers)
// node - oracle (CPP) 
// node - mongodb (drivers)
// ODM -> Object Document Mapper
// ORM -> Object Relational db mapper (connection)
// structure
// product -> {brand, model, price, reviews:[{name:},{}]}

mongoose.connect('mongodb://127.0.0.1:27017/products-sep-23')
    .then(() => console.log('Connected to Db'))
    .catch(err => console.log(err));

app.use('/', homeRouter);
app.use('/api/products', productRoutes);
