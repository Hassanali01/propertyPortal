const mongoose = require('mongoose')
const Propertysubtype = mongoose.Schema({
    
    propertysubtype:{
        type:String,
        unique:true
        
    },
    addedIn :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'PropertyType'
    }
})
const Psubtype = mongoose.model('PropertySubtype',Propertysubtype)

module.exports = {Psubtype}