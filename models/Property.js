const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Property Schema
const propertySchema = new Schema({
  imageURL: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  agentDetails:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  propertyType:{
    type:String,
    enum:["Sell","Rent"]
  },
  status:{
     type:String,
     enum:["Active","InActive"]
  },
  Price:{
    type:Number,
    required:true,
  },
  area:{
    type:String,
    required:true,
  },
  requestForVisit:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"RequestForVisit"
    }
  ],
});

module.exports=mongoose.model('Property', propertySchema);

