const express=require("express");
const { registerUser, loginUser, currentUser } = require("../controllers/userroutes");
const verifyToken = require("../middleware/verifyToken");
const route = express.Router();

route.route("/register").post(registerUser);

route.route("/login").post(loginUser);

route.route("/current").get( verifyToken, currentUser);

module.exports=route;