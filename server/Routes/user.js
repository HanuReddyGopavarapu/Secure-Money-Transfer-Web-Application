const {Router} = require("express");
const route = Router();
const {usersignupschema,usersigninschema,userupdateschema} = require("../schema/userschema");
const {user,account} = require("../DB/index");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");
const {authmiddleware} = require("../middleware/auth");
const { default: mongoose } = require("mongoose");


route.post("/signup",async(req,res)=>{
    try{

    

    const {success} = usersignupschema.safeParse(req.body);
    if (!success){
        return res.json({msg:"invalid input"});
    }
    const userexist = await user.findOne({username:req.body.username});
    if(userexist){
        return res.json({msg:"user already exist"});
    }else{
         
        
        const newuser = await user.create(req.body);
        const userid = newuser._id;
        await account.create({
            userId:userid,
            balance:1+Math.random()*1000
        })
        
    }
    }
    catch(e){
        res.json({msg:`error - ${e}`});
    }
    

});
route.post("/signin",async(req,res)=>{
    
    try{
        const {success} = usersigninschema.safeParse(req.body);
    if(!success){
        return res.json({msg:"input invalid"})
    }
    const userexist = await user.findOne({username:req.body.username,password:req.body.password});
   
    if(!userexist){
        return res.json({msg:"incorrect mail and password"})
    }else{
        const jwttoken = jwt.sign({_id:userexist._id},JWT_SECRET)
        res.json({token:jwttoken,user:userexist.username});  

    }
    }catch(e){
        res.json({msg:`errror - ${e}`})
    }
    
});

route.put("/update", authmiddleware,async(req,res)=>{
    
    const istokenisvalid=await user.findOne({_id:req.userid});
    if(!istokenisvalid){
        return res.json({msg:"inavlid user"})
    }
    try{
        
        const {success} = userupdateschema.safeParse(req.body);
        if(!success){
            return res.json({msg:"invalid input"})
        }else{
            await user.updateOne({_id:req.userid},{$set:req.body});
            res.json({msg:"updated info"});
        }

        
    }catch(e){
        res.json({msg:`error - ${e}`})
    }

});
route.get("/search",authmiddleware,async(req,res)=>{
    const istokenisvalid=await user.findOne({_id:req.userid});
    if(!istokenisvalid){
        return res.json({msg:"inavlid user"})
    }
    try{

        const filter = req.query.filter||" ";
        const users = await user.find({
            $or:[{
                firstname:{
                    "$regex":filter
                }},
                {lastname:{
                    "$regex":filter
                }
        }]
            
        })
        res.json({user:users.map(u=>({
            firstname:u.firstname,
            lastname:u.lastname,
            username:u.username,
            _id:u._id
    
        }))})
    }catch(e){
        res.json({msg:`error-${e}`})
    }
});

module.exports=route;