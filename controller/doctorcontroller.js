const doctors = require('../models/doctorschema')
const users = require('../models/userSchema')
const jwt = require('jsonwebtoken');
const reviews = require('../models/reviewschema');


// register logic
exports.doctorregister = async(req,res)=>{
    console.log(`Inside register function`);
    // res.status(200).json("Register Request received...")
        // get data from req body
        const {id,username,number,password,email,image,department,specilization,education,experience,address,place} = req.body
        try{
                // check number in users model
    
            const result = await doctors.findOne({id})
            if(result){
        // if yes, no: exist,send response as "already exist"
        res.status(406).json("Account already exist...Please Login!!!")
    
            }
            else{
                    // if no: not exist, add to users model,send response as "successfully registered" 
                    const newdoctor = new doctors({
                       id,username,number,password,email,image,department,specilization,education,experience,address,place
                    })
                    console.log(newdoctor);

                    // to save changes to mongodb
                   await newdoctor.save()
                //    send response as "success"
                res.status(200).json(newdoctor)
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
     const person= await doctors.findOne({number,password})
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

//  doctor individually personnel page
exports.doctorloginpersonel= async (req,res)=>{
    console.log(`Inside login function`);
    // res.status(200).json("login Request received...")
    // get data from req body

const{number,password} = req.body

try {
 // check number in mongodb
 const person= await doctors.findOne({number,password})
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

//  all doctors 
exports.viewalldoctors = async(req,res)=>{
    try{
        const alldoctors = await doctors.find()
        res.status(200).json(alldoctors)
    }
    catch(error){
        res.status(401).json(error)

    }
}

// view doctor profile
exports.viewdoctorprofile = async(req,res)=>{
    console.log("inside view profile");

        // res.status(200).json(" Request received...")
    // get doctor number from req
    const {id} = req.params  
    // find id in atlas
    try{
        const doctorprofile = await doctors.findOne({id})
        if(doctorprofile){
            console.log(doctorprofile);
            res.status(200).json(doctorprofile)
        }
        else{
            res.status(404).json("Doctor profile not found!!!!")
        }

    }
    catch(error){
        res.status(401).json(error)

    }

}

// updatedoctor

exports.updatedoctor = async(req,res)=>{
    const {_id} = req.params
    // const {username,number,password,email,bloodgroup,image,address,place} = req.body
    try{
   console.log("inside try");
      const result = await doctors.findByIdAndUpdate(_id,req.body);
      console.log(result);
      if(result){
        const updatevalue = await doctors.findById(_id);
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

// // review doctor
exports.reviewdoctor = async(req,res)=>{
    const {username,number,image, description} = req.body
    const {id} = req.params
    const result = await doctors.findOne({id})
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
                     
          res.status(200).json(result)

        }
        else{
            res.status(406).json("please login")

        }
    }
    catch(error){
        res.status(401).json(error)

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






