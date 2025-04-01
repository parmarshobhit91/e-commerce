const express = require("express");
const { createOrder, getAllOrders, getOrderById, updateOrderStatus, deleteOrder } = require("../controllers/orderController");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/", protect, admin, getAllOrders);
router.get("/:id", protect, getOrderById);
router.put("/:id", protect, admin, updateOrderStatus);
router.delete("/:id", protect, admin, deleteOrder);

module.exports = router;