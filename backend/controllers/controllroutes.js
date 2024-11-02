const asyncHandler=require("express-async-handler");
const express=require("express");
const User = require('../models/contacts');

const getcontacts= asyncHandler(async (req,res) =>{
    const contacts = await User.find({ userId: req.user._id }); // Fetch all contacts from the collection
        if(!contacts)
        {
           res.send({message:"no contacts found"});
        }
        else
        {

            res.status(200).json(contacts);
        }
    // res.send("response from contacts server get response");
});

const postcontacts= asyncHandler ( async (req,res) =>{
    const {name,email,phone}=req.body;
    if(!name || !email || !phone)
        {
            res.status(400);
            throw new Error("All fields are mandotory")        
        }
       const newUser = new User({ name, email, phone ,userId:req.user._id});
       await newUser.save(); 
       console.log(newUser);
       res.status(201).json( {message:"create contact ",details:newUser} );
});

const getcontactsdetails= asyncHandler ( async (req,res) =>{
    
    const id = req.params.id;      
    const user = await User.findById(id); // Fetch the user by ID

    if (!user) {
        res.status(404).json({ message: 'User not found' }); // If user not found, send 404 response
    } else {
        res.status(200).json(user); // If user found, send user details as JSON response
    }
    // res.send(`contact details with id ${id}`);
});

const putcontacts=asyncHandler( async (req,res) =>{
    // const id = req.params.id;
    // const newData = req.body;

    // const updatedUser = await User.findByIdAndUpdate(id, newData, {
    //     new: true, // Return the updated document
    //     runValidators: true, // Run schema validators on the new data
    // });

    // if (!updatedUser) {
    //     res.status(404).json({ message: 'User not found' }); // If user not found, send 404 response
    // } else {
    //     res.status(200).json(updatedUser); // If user updated, send the updated user details
    // }
    const id = req.params.id;
    const newData = req.body;

    // Fetch the contact by ID
    const contact = await User.findById(id);

    if (!contact) {
        return res.status(404).json({ message: 'Contact not found' });
    }

    // Check if the userId of the contact matches the logged-in user's ID
    if (contact.userId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'User not authorized to update this contact' });
    }

    // If IDs match, update the contact
    const updatedContact = await User.findByIdAndUpdate(id, newData, {
        new: true, // Return the updated document
        runValidators: true, // Run schema validators on the new data
    });

    res.status(200).json(updatedContact); 

   
});

const deletecontacts= asyncHandler( async (req,res) =>{
    const id = req.params.id;

    // Fetch the contact by ID
    const contact = await User.findById(id);

    if (!contact) {
        return res.status(404).json({ message: 'Contact not found' });
    }

    // Check if the userId of the contact matches the logged-in user's ID
    if (contact.userId.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'User not authorized to delete this contact' });
    }

    // If IDs match, delete the contact
    const deletedContact = await User.findByIdAndDelete(id);

    res.status(200).json({ message: 'Contact deleted successfully' });
});

module.exports = { getcontacts,postcontacts,putcontacts,getcontactsdetails,deletecontacts};