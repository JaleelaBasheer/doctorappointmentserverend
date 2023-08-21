const mongoose= require('mongoose')

const AppointmentSchema = mongoose.Schema({
        username:{
        type:String,
        required:true
    },
    number:{
        type:Number,
        required:true
    },
    doctorname:{
      type:String,
      required:true
    },
   appointmentdate:{
        type:String,
        required:true
    },
    appointmenttime:{
        type:String,
        required:true
    }
})

// create a model

const appointments = mongoose.model("appointments",AppointmentSchema)

// Export model
module.exports = appointments


