const mongoose = require('mongoose');

const uri = 'mongodb://localhost:27017/contacts-backend-'; // Replace 'mydatabase' with the name of your database

const connectDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB', err);
    }
};

module.exports = connectDB;
