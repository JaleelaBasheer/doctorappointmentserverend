const express = require('express')
const userController = require('../controller/usercontroller')
const doctorController = require('../controller/doctorcontroller')
const appointmentController = require('../controller/appiontmentcontroller')
const adminController = require('../controller/admincontroller')
const router = new express.Router()


// request for register-http://localhost:3000/register
router.post('/register',userController.register)

// request for register-http://localhost:3000/doctorregister
router.post('/doctorregister',doctorController.doctorregister)


// request for login-http://localhost:3000/login
router.post('/login',userController.login)

// request fordoctor login-http://localhost:3000/doctorlogin
router.post('/doctorlogin',doctorController.login)

// request for view all doctors -http://localhost:3000/viewalldoctors
router.get('/viewalldoctors',doctorController.viewalldoctors)

// request for view doctor profile -http://localhost:3000/viewdoctorprofile
router.get('/viewdoctorprofile/:id',doctorController.viewdoctorprofile)

// request for admin access doctor appointment -http://localhost:3000/adminaccess
router.get('/allappointments',appointmentController.allappointments)

// request for view all patients -http://localhost:3000/viewalldoctors
router.get('/viewallpatients',userController.viewallpatients)

// request for  doctor appointment -http://localhost:3000/adminaccess
router.post('/patientappointment',userController.patientappointment)

router.post('/acceptappointment',adminController.adminacceptappointment)

// request for admin access all accepted appointment -http://localhost:3000/adminaccess
router.get('/allacceptedappointment',adminController.allacceptappointments)

router.post('/rejectappointment',adminController.adminrejectappointment)

router.get('/allrejectedappointment',adminController.allrejectappointments)

router.patch('/edituser/:_id',userController.updateuser)

router.patch('/editdoctor/:_id',doctorController.updatedoctor)


router.post('/reviewdoctor',userController.reviewdoctor)

router.post('/reviewdoctorprofile/:id',doctorController.reviewdoctor)


router.get('/allreview',appointmentController.allreviews)

router.delete("/delete-my-account/:_id",userController.deleteuser)

router.delete("/delete-my-account/:_id",doctorController.deleteuser)

router.post("/forgotpassword",adminController.forgotpassword)








module.exports = router

