const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    orderItems: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            name: String,
            quantity: {
                type: Number,
                required: true,
                min: 1,
            },
            price: {
                type: Number,
                required: true,
            },
            image: String,
        },
    ],
    shippingAddress: {
        fullName: { type: String, required: true, trim: true},
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        state: { type: String, required: true },
        phone: { type: String, required: true },
    },
    paymentMethod: {
        type: String,
        required: true, 
        enum: ["COD", "UPI", "Razorpay"],
    },
    paymentResult: {
        id: String, 
        status: String,
        update_time: String,
        email_address: String,
    },
    itemsPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
    paidAt: {
        type: Date,
    },
    isDelivered: {
        type: Boolean,
        default: false,
    },
    deliveredAt: {
        type: Date,
    },
    status: {
        type: String,
        enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
        default: "Pending",
    },
},
{ timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;