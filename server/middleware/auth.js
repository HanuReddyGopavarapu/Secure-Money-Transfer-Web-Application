const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");



function authmiddleware(req,res,next){
    try{

    
    const authheader = req.headers.authorization;
    if(!authheader||!authheader.startsWith("Bearer ")){
        return res.json({msg:"invalid token"})
    }
    else{
        const gettoken = authheader.split(" ")[1];

        const verifytoken = jwt.verify(gettoken,JWT_SECRET);
        req.userid = verifytoken._id
        next();
        }
    
    }catch(e){
        res.json({msg:`error ${e}`});
        
    }
        
    
};
module.exports={authmiddleware};