const User =require("../models/User");
const OTP =require("../models/OTP");
const otpGenerator=require("otp-generator");
const  bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
require("dotenv").config();
// Send OTP Buisness Login And Controller which is sends otp before creating any entry in a database at the time of SIgnup

exports.sendOTP=async(req,res)=>{
    try{
        //fetch email from request ki body!
        const {email} =req.body;
        //check if user exist or NOT
        console.log(email)
        const userExist = await User.findOne({email:email});

        if(userExist)
        {
            return res.status(400)
            .json({
                success:false,
                message:"User already registerd please LOGIN"
            })
        }


        //genrate OTP

        var otp =otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        })

        //check unique otp or not

        let result =await OTP.findOne({otp:otp});

        while(result)
        {
            otp =otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false
            })
    
            //check unique otp or not
    
             result =await OTP.findOne({otp:otp});

        }

        const otpPayload ={email,otp};

       const OtpBody= await OTP.create(otpPayload)


       return res.status(200)
       .json({
        success:true,
        message:"Otp sent successfully",
        OtpBody
       })


    }catch(error)
    {
        console.log(error);
        return res.status(500)
        .json({
            success:false,
            message:"Somthing went wrong in otp genration !"
        })

    }
};


//sign UP Buisness LOGIC


exports.signup = async(req,res)=>{
    try{
        const {firstName,lastName,email,password,confirmPassword,otp,accountType} =req.body;
        console.log(otp)
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp)
        {
            return res.status(400)
            .json({
                success:false,
                message:"Please Enter all the details !"
            })
        }

        if(password!==confirmPassword)
        {
            return res.status(401)
            .json({
                success:false,
                message:"Password ans ConfirmPassword are NOT macthed"
            })
        }

        const userExist =await User.findOne({email:email});
        if(userExist)
        {
            return res.status(403)
            .json({
                success:false,
                message:"User already registerd please login !"
            })
        }
        const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log(recentOtp)
        if(recentOtp[0].otp.length===0)
        {
            return res.status({
                success:false,
                message:"please retry otp not available !"
            })
        }

        if(recentOtp[0].otp!==otp)
        {
            return res.status(400)
            .json({
                success:false,
                message:"OTP Not matched please enter correct otp"
            })
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const user =await User.create({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            accountType,
            profileImgUrl:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        })
        
        return res.status(200)
        .json({
            success:true,
            message:"Sign UP successfully welcome to BlogiBABA",
            user
        })
    }
    catch(error)
    {
        console.log(error);
        return res.status(500)
        .json({
            success:false,
            message:"Somthing went wrong in SignUp !"
        })
    }
};


//log IN Buisness LOGIC login Route
exports.login = async(req,res)=>{
    try{
        const {email,password} =req.body;

        if(!email || !password)
        {
            return res.status(400)
            .json({
                success:false,
                message:"Please enter all the details"
            })
        };

        let userExist = await User.findOne({email:email});
        if(!userExist)
        {
            return res.status(403)
            .json({
                success:false,
                message:"User not found please enter correct details"
            })
        };

        const passwordMatch = await bcrypt.compare(password,userExist.password);
        if(!passwordMatch)
        {
            return res.status(402)
            .json({
                success:false,
                message:"Password Not matched please enter correct password "
            })
        };

        const payload = {
            email:userExist.email,
            id:userExist._id,
            userImgUrl:userExist.profileImgUrl,
            userName:userExist.firstName,
            userLastName:userExist.lastName
        };
        userExist=userExist.toObject;
        const token = jwt.sign(payload, process.env.JWT_SECRET ,{
            expiresIn:"2h",
        });

        userExist.token =token;
        userExist.password=undefined;
        //create cookie and send response
        const options ={
            expires: new Date(Date.now()+ 3*24*60*60*1000)
        }
        res.cookie("token",token,options)
        .status(200)
        .json({
            sucess:true,
            token,
            userExist,
            message:"logged in successfully"
        })

    }catch(error)
    {
        console.log(error);
        return res.status(500)
        .json({
            success:false,
            message:"Somthing went wrong in login !"
        })
    }
};


exports.logout = (req, res) => {
    // Invalidate token on the frontend side
    // Optionally, communicate with the server to update the token expiry
   console.log("nnnnnnnnnnnnnn")
    // Clear the token cookie
    res.clearCookie('token');

    res.status(200).json({
        success: true,
        message: 'Logged out successfully',
    });
};