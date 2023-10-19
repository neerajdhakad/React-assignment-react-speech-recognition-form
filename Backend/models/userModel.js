const mongoose = require("mongoose");

//Schema
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    district:{
        type:String,
        required:true
    },
    village:{
        type:String,
        required:true
    },
    panCard:{
        type:String,
        unique:true,
        required:true
    },
    aadhaarNumber:{
        type:Number,
        unique:true,
        required:true
    },
})

//Model
const User = mongoose.model('User',userSchema)
module.exports = User