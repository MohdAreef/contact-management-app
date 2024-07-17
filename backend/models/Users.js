// models/User.js

const mongoose = require('mongoose');

// Define the schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,"Please add the username"],
        unique: true,
    },
    email: {
        type: String,
        required: [true,"Please add the email"],
        unique: true,
        // Regular expression to validate email format
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
        type: String,
        required: [true,"Please add the password"],
        minlength: 6, // Minimum password length validation
    },
}, {
    timestamps: true // Adds createdAt and updatedAt fields automatically
});

// Create the model
const User = mongoose.model('users', userSchema);

module.exports = User;
