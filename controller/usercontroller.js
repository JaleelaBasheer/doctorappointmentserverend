const users = require('../models/userSchema')
const jwt = require('jsonwebtoken')
const appointments = require('../models/appointmentschema')
const reviews = require('../models/reviewschema')
const router = require('../routes/router')
const accepts = require('../models/acceptschema')

// register logic
exports.register = async(req,res)=>{
    console.log(`Inside register function`);

    // res.status(200).json("Register Request received...")
    // get data from req body
    const {username,number,password,email,bloodgroup,image,address,place} = req.body
    try{
            // check number in users model

        const result = await users.findOne({number})
        if(result){
    // if yes, no: exist,send response as "already exist"
    res.status(406).json("Account already exist...Please Login!!!")

        }
        else{
                // if no: not exist, add to users model,send response as "successfully registered" 
                const newuser = new users({
                   username,number,password,email,bloodgroup,image,address,place
                })
                // to save changes to mongodb
               await newuser.save()
            //    send response as "success"
            res.status(200).json(newuser)
        }
}
catch(err){
    res.status(401).json(err)
}
}

// login logic
exports.login = async(req,res)=>{
    console.log(`Inside login function`);
        // res.status(200).json("login Request received...")
        // get data from req body
  
    const{number,password} = req.body

    try {
     // check number in mongodb
     const person= await users.findOne({number,password})
   if(person){
    // user already exist--login success
    const token = jwt.sign({loginno:number},"supersecretkey12345")
    res.status(200).json({loginperson:person,token})
   }
   else{
    res.status(404).json("Invalid number or Password")
   }
    }
    catch(err){
        res.status(401).json(err)
    }


}

// appointment
exports.patientappointment = async(req,res)=>{
    console.log(`Inside appointment function`);
            // res.status(200).json("appointment Request received...")

    const {username,number,doctorname,appointmentdate,appointmenttime} = req.body
    const result = await users.findOne({number})
    console.log(result);
    try {
        if(result){
            result.booking.push({
                doctorname:doctorname,
                patientdate:appointmentdate,
                patienttime:appointmenttime
            })
            await result.save()
            console.log(result);
            const newappointment = appointments({...req.body})
            console.log(newappointment);   
            await newappointment.save()   
            
            res.status(200).json({newappointment})
        }
        else{
            res.status(406).json("Account not found...Please Login!!!")
        }

        
    } catch (error) {
        res.status(401).json(error)
    }

}

// review doctor
exports.reviewdoctor = async(req,res)=>{
    const {username,number,image, description} = req.body
    const result = await users.findOne({number})
    console.log(result);

    try{
        if(result){
            result.review.push({
                username:username,
                number:number,
                image:image,
                description:description
            })
            await result.save()
            console.log(result);
            const newreview = new reviews({
                username,number,image,description
              })
              console.log({newreview});
              // to save changes to mongodb
             await newreview.save()            
          res.status(200).json(newreview)

        }
        else{
            res.status(406).json("please login")

        }
    }
    catch(error){
        res.status(401).json(error)

    }
}

// all patients list
exports.viewallpatients = async(req,res)=>{
    try{
        const allpatients = await users.find()
        res.status(200).json(allpatients)
    }
    catch(error){
        res.status(401).json(error)

    }
}

// updateuser

exports.updateuser = async(req,res)=>{
    const {_id} = req.params
    try{
   console.log("inside try");
      const result = await users.findByIdAndUpdate(_id,req.body);
      console.log(result);
      if(result){
        const updatevalue = await users.findById(_id);
        console.log(updatevalue);

        res.status(200).json(updatevalue)
        
      }
      else{
        res.status(404).json("Account not found!!!")

      }
      
    }
    catch(err){
        res.status(401).json(err)

    }
}

// delete account

exports.deleteuser = async(req,res)=>{

    // get login data from token
    const { _id }= req.params

    try{
       await users.deleteOne({_id})
       res.status(200).json("Account removed successfully!!!! ")

    }
    catch(err){
        res.status(401).json(err);
    }


}



    




 