const mongoose = require("mongoose");
const {Psubtype} = require('./propertysubtype')
const PropertyTypeSchema = mongoose.Schema({

    propertyType:{
        type:String,
        requied:true,
        unique:true
    }
})

PropertyTypeSchema.pre('findOneAndDelete',async function(next){
 
    await Psubtype.deleteMany({addedIn:this._conditions._id})
    next();
})
// PropertyTypeSchema.pre('findOneAndDelete',async function(next){

//     console.log(this._conditions)
//     // console.log("req",req)
//    console.log("i am in pre middleware")
//    await Psubtype.deleteMany({addedIn:this._conditions._id}, function(err,result){
//     if(err){
//         console.log(err)
//     }
//     else{
//         console.log(result)
//     }
//    });
// })

const propertytypes = mongoose.model('PropertyType',PropertyTypeSchema);
module.exports = {propertytypes}