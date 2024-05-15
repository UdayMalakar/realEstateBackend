const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Property Schema
const propertySchema = new Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  Date:{
    type:Date,
    required:true
  },
  message:{
    type: String,
    required: true
  },
  property:{
    type:mongoose.Schema.ObjectId,
    ref:"Property"
  },
  status:{
    type:String,
    enum:["Pending","Visited","Cancel"]
  }
});

module.exports=mongoose.model('Property', propertySchema);

