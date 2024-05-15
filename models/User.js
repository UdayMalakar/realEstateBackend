const mongoose =require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    accountType:{
        type:String,
        enum:["Admin","Agent","Visitore"],
        required:true,
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Profile",
    },
    property:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Property"
        }
    ],
    profileImgUrl:{
        type:String,
        required:true,
    },
});

module.exports = mongoose.model("User",userSchema);