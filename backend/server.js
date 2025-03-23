const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

app.use(cors(
    origin = "http://localhost:5173/"
))
app.use(express.json());


connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})