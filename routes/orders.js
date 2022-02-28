const { urlencoded } = require('body-parser');
const express = require('express');
const { check, validationResult } = require("express-validator");
const OrderRouter = express.Router();
// const expressAsyncHandler = require('express-async-handler');
const Products = require('../models/products_db');
const User = require('../models/user_db');
const Orders = require('../models/orders_db');

//creating an order
OrderRouter.post('/addOrder', [
  check("orderItems", "Enter Details for Order Items"),
  check("shippingAddress", "Enter Address Details"),
  check("paymentMethod", "Enter Payment Method : COD by default"),
  check("paymentResult", "Enter Payment Result"),
  check("itemsPrice", "Enter Item Price"),
  check("shippingPrice", "Enter shipping price"),
  check("totalPrice", "Enter Total price i.e. shipping+items"),
  check("isPaid", "IS PAYMENT DONE"),
  check("paidAt", "WHERE WAS PAYMENT DONE"),
  check("isDelivered", "HAS PRODUCT BEEN DELIVEREd"),
  check("deliveredAt", "PRODUCT WAS DELIVERED AT"),
  check("seller_id", "Enter Seller ID"),
  check("user_id", "Enter User ID")
], async (req, res) => {
  const newOrder = new Orders(req.body);
  try {
    let saveOrder = await newOrder.save();
    return res.status(200).json(saveOrder);
  } catch (err) {
    return res.status(500).json(err);
  }
});

OrderRouter.get('/getOrderDetails', async (req, res) => {
  try {
    const get_all = await Orders.find();
    res.send(get_all);
    const x = get_all[0].seller_id;
    const y = await User.findById(x);
    console.log(y);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

//get a particular order
OrderRouter.get('/:id', async (req, res) => {
  const order = await Orders.findById(req.params.id);
  if (order) { res.send(order); }
  else { res.status(404).send({ message: "No Such Order Exist" }); }
});


//Update
OrderRouter.put('/:id', async(req,res)=>{
  try{
    const updatedOrder = await Orders.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {new:true}
    );
    res.status(200).json(updatedOrder);
  }catch(err){
    return res.status(500).json(err);
  }
});


//Delete Orders
OrderRouter.delete('/:id',async(req,res)=>{
  const order = await Orders.findById(req.params.id);
  if(order){
    const deleteOrder = await order.remove();
    return res.send({ message: 'Order Deleted', order: deleteOrder });
  }else{
    return res.send({ message: 'Order Not Found' });
  }
});


module.exports = OrderRouter;