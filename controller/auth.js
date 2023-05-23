const userModel  = require("../model/user")
const jwt = require("jsonwebtoken")



const handleError = (err)=>{
    const error  = {email:"",  password:"" , username:""}
    if(err.message.includes("user validation failed")){
        Object.values(err.errors).forEach(({properties})=>{
            error[properties.path] = properties.message
        })
    } 
    
    if(err.code == "11000" && Object.keys(err.keyValue) == "username"){
        error.email = "Username already exist"
    }

    if(err.code == "11000" && Object.keys(err.keyValue) == "email"){
        error.email = "Email already exist"
    }

    if(err.email = "email not registered"){
        error.email = "email not registered"
    }
    if(err.password = "Invalid password"){
        error.password = "Invalid password"
    }

    console.log("error start", error, "error end")
    return error

}

const createToken =(id)=>{  
    return jwt.sign({id}, process.env.SECRET , 
                    {expiresIn: "3d"})
}





const loginController = async (req,res)=>{
    const {email,password ,username} = req.body
    try {
        const user = await userModel.login(email,password)
        if(user){
            const token = await createToken(user._id)
            const {_id} = jwt.verify(token,process.env.SECRET)
            console.log("Before storing to local storage in the aut.js login controlelr", user._id,"and the ID", _id )
            res.cookie ("jwt", token, {maxAge:2*24*60*60*1000,httpOnly:true} )
            res.status(200).json({token,email,username})
        }
             
    } catch (error) {  
        console.error(error)  
        const errors = handleError(error)
        res.status(400).json({errors})
    }
}





//sigup controller


const signupController = async (req,res)=>{
    console.log("sent succesfully")
    const {email,password , username} = req.body
    try {
        const user = await userModel.create(
            {email,
            password , 
            username})
        if(user){
            const token = await createToken(user._id)
            res.cookie("jwt", token, {maxAge:2*24*60*60*1000,httpOnly:true} )
            //send the email and token as a response.
            console.log("sending the response")
            res.status(200).json({token,email,username})
        }
    } catch (error) {
        console.log(error)
        const errors = handleError(error)
        res.status(400).json({errors})
    }

}


module.exports = {
    loginController,
    signupController
}