const appointments = require('../models/appointmentschema')
const accepts = require('../models/acceptschema')
const router = require('../routes/router')
const users = require('../models/userSchema')
const rejects = require('../models/rejectschema')
const { response } = require('express')


// get all accepted appointment
exports.allacceptappointments = async(req,res)=>{
    console.log(`Inside all accept appointments`);
    try{
        const allacceptappointments = await accepts.find()
        res.status(200).json(allacceptappointments)
    }
    catch(error){
        res.status(401).json(error)

    }


}

// admin accept
exports.adminacceptappointment = async(req,res)=>{
    console.log("Inside accept appointments");
   const {_id,number,appointmentdate,appointmenttime} = req.body
try { 
    console.log("inside try");
        const response= await appointments.findOne({_id})
        console.log(response);
        const saveaccept = response
        const result = await users.findOne({number})
        if(response){
    result.accept.push({
        _id:_id,
        number:number,
        appointmentdate:appointmentdate,
        appointmenttime:appointmenttime
    })
    await result.save()
    console.log(result);
    const acceptappointment = accepts({acceptappointmentpersons:saveaccept})
    await acceptappointment.save() 
    console.log(acceptappointment); 
                   
           const product = await appointments.deleteOne({_id})
            res.status(200).json(acceptappointment)
           
        }
        else{
            res.status(406).json("Request not found")
 
        }
   
} 
catch (error) {
    res.status(401).json(error)

}
}


// admin reject appointment
exports.adminrejectappointment = async(req,res)=>{
    console.log("Inside reject appointments");
    const {_id,number,appointmentdate,appointmenttime} = req.body
 try { 
     console.log("inside try");
         const response= await appointments.findOne({_id})
         console.log(response);
         const savereject = response
         const result = await users.findOne({number})
         if(response){
     result.reject.push({
         _id:_id,
         number:number,
         appointmentdate:appointmentdate,
         appointmenttime:appointmenttime
     })
     await result.save()
     console.log(result);
     const rejectappointment = rejects({rejectappointmentpersons:savereject})
     await rejectappointment.save() 
     console.log(rejectappointment); 
                    
            const product = await appointments.deleteOne({_id})
             res.status(200).json(rejectappointmentappointment)
            
         }
         else{
             res.status(406).json("Request not found")
  
         }
    
 } 
 catch (error) {
     res.status(401).json(error)
 
 }
}

// get all accepted appointment
exports.allrejectappointments = async(req,res)=>{
    console.log(`Inside all reject appointments`);
    try{
        const allrejectappointments = await rejects.find()
        res.status(200).json(allrejectappointments)
    }
    catch(error){
        res.status(401).json(error)

    }


}

// forgot password

exports.forgotpassword = async (req,res)=>{
    console.log("inside forgot");
    const {number,email} = req.body
    const result = await users.findOne({number})
    try {
        if(result){
            console.log(result);
            res.status(200).json({person:result})

        }
        
    } catch (error) {
        res.status(401).json(error)

    }

}