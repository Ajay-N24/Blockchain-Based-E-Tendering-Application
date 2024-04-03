const mongoose = require("mongoose");
const { Schema } = mongoose;
const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });
const bcrypt = require("bcrypt")
const UserSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    }
});
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    const hash = await bcrypt.hash(this.password, Number(process.env.salt));
    this.password = hash;
    next();
});
const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;