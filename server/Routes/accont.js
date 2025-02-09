const {Router} = require("express");
const route = Router();
const {authmiddleware} = require("../middleware/auth");
const {account} = require("../DB/index");
const mongoose = require("mongoose");


route.get("/bal",authmiddleware,async(req,res)=>{
    const currentbal = await account.findOne({userId:req.userid});
    try{

        if(!currentbal){
            return res.json({msg:"invalid user"})
        }else{
    
            res.json({bal:currentbal.balance});
        }
    }catch(e){
        res.json({msg:`error - ${e}`});
    }



});
route.post("/transfer",authmiddleware,async(req,res)=>{
    const istokenisvalid=await account.findOne({userId:req.userid});
    if(!istokenisvalid){
        return res.json({msg:"inavlid user"})
    }
    try{

        const session = await mongoose.startSession();
        session.startTransaction();
        const {to,amount}= req.body;
        const sender = await account.findOne({userId:req.userid}).session(session);
    
        if(!sender||sender.balance<amount){
            await session.abortTransaction();
            session.endSession()
            return res.json({msg:`invalid input or invalid amount`});
        }
        
        const receiver = await account.findOne({userId:to}).session(session);
        if(!receiver){
            await session.abortTransaction();
            session.endSession()
            return res.json({msg:`inavalid receiver`})
        }
        await account.updateOne({userId:req.userid},{$inc:{balance:-amount}}).session(session);
        await account.updateOne({userId:to},{$inc:{balance:amount}}).session(session);
        await session.commitTransaction();
        session.endSession();
        res.json({msg:"Transction Success"})
    }catch(e){
        await session.abortTransaction();
        session.endSession()
        res.json({msg:`Transction Failed - ${e}`});


    }
    
})

module.exports=route;