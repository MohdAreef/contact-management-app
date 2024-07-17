const mongoose = require('mongoose');

// Define the schema
const userSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone:{
        type:String,
        required:true,
    }
},{

    timestamps: true
}
);

// Create the model
const User = mongoose.model('contacts', userSchema);

module.exports = User;
