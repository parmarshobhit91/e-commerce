const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Product description is required"],
    },
    price: {
        type: Number,
        required: [true, "Product price is required"],
    },
    category: {
        type: String,
        required: [true, "Product category is required"],
    },
    brand: {
        type: String, 
        required: [true, "Brand is required"],
    },
    stock: {
        type: Number,
        required: [true, "Stock quantity is required"],
        min: 0,
        default: 0,
    },
    images: [
        {
            url: String,
            public_id: String,
        },
    ],
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;