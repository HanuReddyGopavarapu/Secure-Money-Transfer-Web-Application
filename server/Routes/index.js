const {Router} = require("express");
const route = Router();
const userroute = require("./user");
const accountroute = require("./accont");


route.use("/user",userroute);
route.use("/account",accountroute);



module.exports=route;