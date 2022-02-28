const { urlencoded } = require('body-parser');
const express = require('express');
const { check, validationResult } = require("express-validator");
const ProductRouter = express.Router();
const expressAsyncHandler = require('express-async-handler');
const Products = require('../models/products_db');
const User = require('../models/user_db');

// dding products by method 1
ProductRouter.post('/addProducts', [
  check("name", "Please Enter Product name"),
  check("brand", "Please Enter Product Brand"),
  check("category", "Please enter a valid email"),
  check("description", "Please Enter address"),
  check("price", "Please enter a valid password"),
  check("seller", "Enter Seller ID"),
  check("ratings", "Enter Product Rating"),
  check("reviews")],
  async (req, res) => {

    const { name, brand, category, description, price, seller, ratings, reviews } = req.body;

    let product = new Products({
      name,
      brand,
      category,
      description,
      price,
      seller,
      ratings,
      reviews
    });



    try {
      let saveProd = await product.save();
      return res.send("DATA SAVED SUCCESSFULLY");

    } catch (err) {
      return res.status(500).json(err);
    }
  });

//adding products by method 2
ProductRouter.post('/add', async (req, res) => {
  const newProduct = new Products(req.body);

  try {
    const saveProd = await newProduct.save();
    return res.status(200).json(saveProd);
  } catch (err) {
    return res.status(500).json(err);
  }

});

ProductRouter.get('/all', async (req, res) => {
  try {
    const get_all = await Products.find();
    res.send(get_all);
    const x = get_all[0].seller;
    console.log(x);
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }

});

//Get Different Product Category
ProductRouter.get('/getByCategory', async (req, res) => {
  const categories = await Products.find().distinct('category');
  res.send(categories);
});


//Get product details by id
ProductRouter.get('/:id', async (req, res) => {
  const product = await Products.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});


//Updating Product Details
ProductRouter.put('/:id', async (req, res) => {
  const productId = req.params.id;
  const product = await Products.findById(productId);
  if (product) {
    product.name = req.body.name;
    product.category = req.body.category;
    product.price = req.body.price;
    product.stockCount = req.body.stockCount;
    const updatedProduct = await product.save();
    res.send({ message: 'Product Updated', product: updatedProduct });
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});


//Deleting Product Details
ProductRouter.delete('/:id', async (req, res) => {
  const product = await Products.findById(req.params.id);
  if (product) {
    const deleteProduct = await product.remove();
    res.send({ message: 'Product Deleted', product: deleteProduct });
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

module.exports = ProductRouter;