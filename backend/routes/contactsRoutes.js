const express=require("express");
const { getcontacts,postcontacts ,putcontacts,getcontactsdetails,deletecontacts} = require("../controllers/controllroutes");
const verifyToken = require("../middleware/verifyToken");
// res.json({"message":"response from contacts api"});
const router=express.Router();
router.use(verifyToken); 
router.route("/").get(getcontacts);

router.route("/").post(postcontacts);

router.route("/:id").get(getcontactsdetails);
router.route("/:id").put(putcontacts);

router.route("/:id").delete(deletecontacts);

module.exports =router;