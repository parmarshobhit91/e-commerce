const express = require("express");
const { getAllProducts, addProduct, removeProduct, updateProduct } = require("../controllers/productController");
const router = express.Router();

router.get("/all", getAllProducts);
router.post("/addproduct", addProduct);
router.put("/updateproduct", updateProduct);
router.delete("/removeproduct", removeProduct);

module.exports = router;