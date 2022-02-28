const express = require('express');
const bodyParser = require('body-parser');
const Users = require('./routes/users');
const Products = require('./routes/products');
const Orders = require('./routes/orders');
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/user', Users);
app.use('/products', Products);
app.use('/order',Orders);
const InitiateMongoServer = require('./db');
InitiateMongoServer();


app.get('/index', (req, res) => {
    res.send("!!!!!!!!!API IS WORKING!!!!!!!!!");
});

app.listen(port, (req, res) => {
    console.log(`SERVER STARTED AT port: ${port}`);
}); 