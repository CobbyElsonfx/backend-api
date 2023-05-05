const userModel  = require("../model/user")
const jwt = require("jsonwebtoken")



const handleError = (err)=>{
    const error  = {email:"",  password:""}
    if(err.message.includes("user validation failed")){
        Object.values(err.errors).forEach(({properties})=>{
            error[properties.path] = properties.message
        })
    }  
    return error

}

const createToken =(id)=>{  
    return jwt.sign({id}, "0558119187A" , 
                    {expiresIn: "3d"})
}





const loginController = async (req,res)=>{
    const {email,password } = req.body
    try {
        const newUser = await userModel.login(email,password)
        consolole.log(newUser, "Here is the user")
        if(newUser){
            const token = await createToken(newUser_id)
            res.cookie ("jwt", token, {maxAge:2*24*60*60*1000,httpOnly:true} )
            console.log(user)
            res.status(200).json({newUser_id})
        }
             
    } catch (error) {   
        const errors = handleError(error)
        res.status(400).json({errors})
    }
}





//sigup controller


const signupController = async (req,res)=>{
    const {email,password , username} = req.body
    try {
        const user = await userModel.create(
            {email,
            password , 
            username})
        if(user){
            const token = await createToken(user._id)
            res.cookie("jwt", token, {maxAge:2*24*60*60*1000,httpOnly:true} )
            res.status(200).json({user:user})
        }
        
    } catch (error) {
        const errors = handleError(error)
        res.status(400).json({errors})
    }

}


module.exports = {
    loginController,
    signupController
}