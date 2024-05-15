
const mongoose =require("mongoose");

const profileSchema = new mongoose.Schema({
    gender:{
        type:String,
        trim:true,
    },
    about:{
        type:String,
        trim:true,
    },
    contactNumber:{
        type:String,
        trim:true
    },
    yearOfExperience:{
        type:Number,
    },
    address:{
        type:String,
    },
    licenseNo:{
        type:String,
    }
});

module.exports = mongoose.model("Profile",profileSchema);