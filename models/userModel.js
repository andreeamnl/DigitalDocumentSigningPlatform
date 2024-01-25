const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    token: String,
    isEmailVerified: Boolean,
});

const User = mongoose.model("User", userSchema);

module.exports = {
    User,
    userSchema,
};