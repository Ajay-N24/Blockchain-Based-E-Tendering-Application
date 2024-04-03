const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const tokenSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300,// This is the expiry time in seconds
    },
})
module.exports = mongoose.model("Otp", tokenSchema);