const express = require('express');
const protect = require('../middleware/Auth');
const AsyncHandler = require('express-async-handler');
const Order = require('../models/Order');
const { create } = require('../models/User');
const orderRoute = express.Router();

// when user made an order.
orderRoute.post("/", protect, AsyncHandler(async(req, res) => {
    const {
        orderItems, 
        shippingAddress, 
        paymentMethod, 
        shippingPrice, 
        taxPrice, 
        totalPrice, 
        price
    } = req.body;

    if (orderItems && orderItems.length === 0)
    {
        res.status(400);
        // throw new Error('No order items found.');
        res.json({'message': 'No order items found'});
    }
    else 
    {
        const order = new Order({
            orderItems, 
            shippingAddress,
            paymentMethod,
            shippingPrice,
            taxPrice,
            totalPrice,
            price,
            user: req.user._id
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);

    }
}));

// order payment route
orderRoute.put("/:id/payment", protect, AsyncHandler(async(req, res) => {
    // get the order id.
    const order = await Order.findById(req.params.id);

    // console.log(order);

    if(order)
    {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            updated_time: req.body.updated_time,
            email_address: req.body.email_address
        };
        const updateOrder = await order.save();
        res.status(200).json(updateOrder);
    }
    else
    {
        res.status(404);
        throw new Error("Order Not Found");
    }
}));

// get all the order list of the user
orderRoute.get("/", protect, AsyncHandler(async(req, res) => {
    const orders = await Order.find({user:req.user._id}).sort({_id:-1});

    if (orders)
    {
        res.status(200).json(orders);
    }
    else 
    {
        res.status(404);
        throw new Error("Order Not Found");
    }
}));

// get order by ID
orderRoute.get("/:id", protect, AsyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id).populate("user", "email");
    if(order)
    {
        res.status(200).json(order);
    }
    else
    {
        res.status(404);
        throw new Error("Order Not Found");
    }
}));

module.exports = orderRoute;