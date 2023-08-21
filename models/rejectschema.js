const mongoose= require('mongoose')

const rejectSchema = mongoose.Schema({
     rejectappointmentpersons:{
        type:Array,
        required:true
     }
})

// create a model

const rejects = mongoose.model("rejects",rejectSchema)

// Export model
module.exports = rejects