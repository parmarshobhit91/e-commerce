const Product = require("../models/Product");

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);      
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({message: "Internal Server Error"});
    }
};

exports.addProduct = async (req, res) => {
    try {
        const {name, price, description, category, image, stock, brand} = req.body;
        
        if(!name || !price || !description || !category || !image || stock===undefined || !brand){
            return res.status(400).json({message: "Missing required fields"});
        }
        const newProduct = new Product({name, price, description, category, brand, image, stock});
        await newProduct.save();
        res.status(201).json({message: "Product added successfully", products : newProduct});
    } catch (error) {
        console.error("Error adding products:", error);
        res.status(500).json({message: "Internal Server Error"});
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const {id} = req.params;
        const updates = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(id, updates, {new: true});
        if(!updatedProduct){
            return res.status(404).json({message: "Product not found"});
        }
        res.json({message: "Product updated successfully", products: updatedProduct});
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({message: "Internal Server Error"});
    }
};

exports.removeProduct = async(req, res) => {
    try {
        const {id} = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);

        if(!deletedProduct){
            return res.status(404).json({message: "Product not found"});
        }
        res.json({message: "Product removed successfully"});
    } catch (error) {
        console.error("Error removing product:", error);
        res.status(500).json({message: "Internal Server Error"});
    }
};