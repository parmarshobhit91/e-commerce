const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(cors({
    origin: "http://localhost:5173", // No trailing slash
    credentials: true, // If you need cookies/auth headers
}));

connectDB();

app.use(express.json());

const authRoute = require("./routes/authRoutes");
const productRoute = require("./routes/productRoutes");

app.use("/user", authRoute);
app.use("/products", productRoute);





app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})