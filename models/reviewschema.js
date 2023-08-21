const mongoose= require('mongoose')

const ReviewSchema = mongoose.Schema({
        username:{
        type:String,
        required:true
    },
    number:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
   
    description:{
        type:String,
        required:true
    }
})

// create a model

const reviews= mongoose.model("reviews",ReviewSchema)

// Export model
module.exports = reviews

