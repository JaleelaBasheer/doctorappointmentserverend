const mongoose= require('mongoose')

const acceptSchema = mongoose.Schema({
     acceptappointmentpersons:{
        type:Array,
        required:true
     }
})

// create a model

const accepts = mongoose.model("accepts",acceptSchema)

// Export model
module.exports = accepts


