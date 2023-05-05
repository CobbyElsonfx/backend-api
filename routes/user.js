const express = require("express")
const router = express.Router()
const {signupController,loginController} = require("../controller/auth")


//login router
const login_post =  router.post("/login" , loginController)



//signup router
const signup_post = router.post("/signup" , signupController)


module.exports = router     