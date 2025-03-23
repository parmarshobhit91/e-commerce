const mongoose = require("mongoose");


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Database Connected");
    } catch (error) {
        console.error(error);
    }
};


module.exports = connectDB;