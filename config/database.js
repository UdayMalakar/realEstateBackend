const mongoose=require("mongoose");
require("dotenv").config();

exports.dbConnect = ()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{console.log("mongo DB Connected successfully")})
    .catch((error)=>{
        console.log("DB Connnection Failed");
        console.error(error);
    })
}