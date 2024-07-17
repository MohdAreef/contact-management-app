const asyncHandler=require("express-async-handler");
const express=require("express");
const User = require('../models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const registerUser= asyncHandler(async (req,res) =>{
    
    const { username, email, password } = req.body;

    try {
        // Check if a user with the requested email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
             res.status(400).json({ error: 'Email is already registered' });
        }
         
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds

        // If user does not exist, create a new user
        const newUser = new User({ username, email, password: hashedPassword });
        const savedUser = await newUser.save();

        res.status(201).json(savedUser); // Send the saved user details as a JSON response
    } catch (err) {
        console.error('Error registering user:', err);
        res.status(500).json({ error: 'Failed to register user' });
    }
    
});

const loginUser = asyncHandler(async (req,res) =>{
    
    const { email, password } = req.body;

    try {
        // Check if a user with the provided email exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Validate the password
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Create JWT payload
        const payload = {
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
            }
        };

        // Generate JWT token
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '180m' }, (err, token) => {
            if (err) throw err;
            res.status(200).json({ token }); // Send JWT token in response
        });

    } catch (err) {
        console.error('Error logging in user:', err);
        res.status(500).json({ error: 'Failed to log in user' });
    }
    
});

const currentUser = asyncHandler(async (req,res) =>{
    
    res.send(req.user);
    
});

module.exports={registerUser,loginUser,currentUser};