const appointments = require('../models/appointmentschema')
const reviews = require('../models/reviewschema')
const users = require('../models/userSchema')
const jwt = require('jsonwebtoken')
const router = require('../routes/router')

// all appointments
exports.allappointments = async(req,res)=>{
    console.log(`Inside all appointments`);
    try{
        const allappointments = await appointments.find()
        res.status(200).json(allappointments)
    }
    catch(error){
        res.status(401).json(error)

    }


}

// to display all reviews

exports.allreviews = async(req,res)=>{
    console.log(`Inside all appointments`);
    try{
        const allreviews = await reviews.find()
        res.status(200).json(allreviews)
    }
    catch(error){
        res.status(401).json(error)

    }
}



