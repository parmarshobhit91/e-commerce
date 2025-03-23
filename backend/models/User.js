import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    name: String,
    email: { type: String, unique: true},
    contact: String,
    password: String,
    isAdmin: { type: Boolean, default: false}
});

const User = mongoose.model('User', userSchema);

module.exports = User;