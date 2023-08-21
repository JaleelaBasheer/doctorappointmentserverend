const mongoose= require('mongoose')

const usersSchema = mongoose.Schema({
   
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
    bloodgroup:{
        type:String,
        required:true
    },
    image:{
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
    booking:{
        type:Array,
        required:true
    },
    review:{
        type:Array,
        required:true
    },
    accept:{
        type:Array,
        required:true
    },
   reject:{
        type:Array,
        required:true
    }
})

// create a model

const users = mongoose.model("users",usersSchema)

// Export model
module.exports = users

