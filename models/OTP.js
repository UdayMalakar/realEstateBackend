
const mongoose =require("mongoose");
const mailSender = require("../utils/mailSender");

const OTPSchema = new mongoose.Schema({
   email:{
        type:String,
        trim:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60,
    }
});



// A function -> to send email


async function sendVerificationEmail(email,otp)
{

    try{
        const mailResponse= await mailSender(email,"Verification Email from Estate-",otp);
        console.log("Email Sent Successfully")

    }catch(error)
    {
        console.error("Error while sending email",error);
    }
};


OTPSchema.pre("save",async function(next){
    await sendVerificationEmail(this.email,this.otp);
    next();
})
module.exports = mongoose.model("OTP",OTPSchema);