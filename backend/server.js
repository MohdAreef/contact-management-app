const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbConnection");
const dotenv=require("dotenv").config();
const cors = require('cors');
const app=express();
const port = process.env.PORT || 9898 ;

connectDB();
// Use CORS middleware
app.use(cors());

app.use(express.json());
app.use("/api/contacts",require("./routes/contactsRoutes"));
app.use("/api/users",require("./routes/userRoutes"));

app.use(errorHandler);

app.listen(port,()=>{
    console.log(`server is running on ${port}`)
}) 