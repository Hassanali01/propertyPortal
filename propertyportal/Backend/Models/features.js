const mongoose = require('mongoose')
const Propertyfeature = mongoose.Schema({



    featurename:{
        type:String,


        
    },
    featuretype:{
        type:String,

    },

    addedIn :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'PropertySubtype'
    }

})
const Pfeatures = mongoose.model('PropertyFeature',Propertyfeature)

module.exports = {Pfeatures}