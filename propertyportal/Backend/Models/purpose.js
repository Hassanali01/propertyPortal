const mongoose = require("mongoose");
const purposeSchema = mongoose.Schema({

    purpose:{
        type:String,
        requied:true,
        unique:true
    }
})

const Purpose = mongoose.model('Purpose',purposeSchema);
module.exports = Purpose;