const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
    try {
        const {orderItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, totalPrice} = req.body;

        if(!orderItems || orderItems.length === 0){
            return res.status(400).json({message: "No order itmes found"});
        }

        const order = new Order({
            user: req.user.id,
            orderItems,
            shippingAddress, 
            paymentMethod,
            itemsPrice,
            shippingPrice,
            totalPrice
        });

        const savedOrder = await order.save();
        res.status(201).json(savedOrder);

    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message});
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate("user", "name email");
        res.json(orders);
    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message});
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("user", "name email");
        if(!order){
            return res.status(404).json({message: "Order not found"});
        }
        res.json(order);
    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message});
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const {stauts} = req.body;
        const order = await Order.findById(req.params.id);

        if(!order){
            return res.status(404).json({message: "Order not found"});
        }

        order.status = stauts;
        if(stauts === "Delivered"){
            order.isDelivered = true;
            order.deliveredAt = Date.now();
        }

        const updatedOrder = await order.save();
        res.json(updatedOrder);     
    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message});
    }
};

exports.deleteOrder = async(req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if(!order){
            return res.status(404).json({message: "Order not found"});
        }

        await order.deleteOne();
        res.json({message: "Order deleted successfully"});
    } catch (error) {
        res.status(500).json({message: "Server Error", error: error.message});
    }
};