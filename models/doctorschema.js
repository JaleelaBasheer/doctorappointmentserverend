const mongoose= require('mongoose')

const doctorSchema = mongoose.Schema({
    id: {
        type:Number,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true
    },
    number:{
        type:Number,
        required:true,
        
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    specilization:{
        type:String,
        required:true
    },
    education:{
        type:String,
        required:true
    },
    experience:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    place:{
        type:String,
        required:true
    },
    
    review:{
        type:Array,
        required:true
    }
   
    
})

// create a model

const doctors = mongoose.model("doctors",doctorSchema)

// Export model
module.exports = doctors

