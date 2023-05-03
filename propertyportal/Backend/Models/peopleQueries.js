const mongoose = require('mongoose')
const QuerrySchema = new mongoose.Schema({

  Title: {
    type: String,
  },
  MinPrice: {
    type: String,
  },
  MaxPrice: {
    type: String,
  },
  Type: {
    type: String,
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

  "Bedroom(s)": {
    type: String,
  },
  Area: {
    type: String,
  },
  "Bedroom(s)": {
    type: String,
  },
  features:{
    type:Array
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
  Coordinates:{
   
    type:Array,
  },
  postedBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Users'
  }

}, { timestamps:true })


const Querries = mongoose.model('Querries', QuerrySchema);
module.exports = Querries;  
