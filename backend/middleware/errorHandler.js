const {constants}=require("../constants")
const errorHandler=(err,req,res,next) =>{
    const statusCode=res.statusCode ? res.statusCode : 500;
    switch(statusCode){
        case constants.VALIDATION_ERROR:
         res.json({title:"Validation Error",message:err.message,stackTrace:err.stackTrace})
        break;

        
        case constants.NOT_FOUND:
         res.json({title:" Not found Error",message:err.message,stackTrace:err.stackTrace})
        break;

        
        case constants.UNAUTHERIZED_ERROR:
         res.json({title:"Unautherized Error",message:err.message,stackTrace:err.stackTrace})
        break;

        
        case constants.FORBIDDEN_ERROR:
         res.json({title:"forbidden Error",message:err.message,stackTrace:err.stackTrace})
        break;

        case constants.SERVER_ERROR:
            res.json({title:"Server Error",message:err.message,stackTrace:err.stackTrace})
           break;

        default:
            console.log("no error all is good");
            break;
   

    }
}
module.exports=errorHandler;