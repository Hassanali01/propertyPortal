const mongoose = require('mongoose')
const AutoIncrement = require("mongoose-sequence")(mongoose)
const propertySchema = new mongoose.Schema({
  propertyno: Number,
  propertyImages: {
    type: Array,

  },
  Title: {
    type: String,
  },
  Price: {
    type:Number,
  },
  Type: {
    type: String,
  },
  subtype:{
    type:String
  },
  city: {
    type: String
  },
  Purpose: {
    type: String,
  },
  DetailLocation: {
    type: String,
  },

  Area: {
    type: Number,
  },
  Bedrooms: {
    type: Number,
  },
  kitchen: {
    type: String,
  },
  storeroom: {
    type: String,
  },

  Description: {
    type: String,
  },
  email:{
   type:String
  },
  Auther:{
     type:mongoose.Schema.Types.ObjectId,
     ref:'User'
   }

}, { strict: false })

propertySchema.plugin(AutoIncrement, { inc_field: 'propertyno' });
const properties = mongoose.model('Properties', propertySchema);
module.exports = properties;
