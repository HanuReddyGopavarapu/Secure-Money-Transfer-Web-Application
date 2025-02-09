const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://asdf:asdf@cluster0.bym9w.mongodb.net/Paytm_practise");

const userschema = mongoose.Schema({
    firstname:String,
    lastname:String,
    username:String,
    password:String,
});
const accountschema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    balance:{
       
            type:Number,
            required:true
        
    }
});

const user = mongoose.model('user',userschema);
const account = mongoose.model("account",accountschema);

module.exports={user,account};
