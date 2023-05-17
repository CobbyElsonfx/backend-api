const userModel = require("../model/user")
const jwt = require("jsonwebtoken")



const requireAuth = async (req,res,next)=>{
    const {authentication} = req.headers

    if(!authentication){
        res.status(400).json("Authentication required")
    }
    const token = await  authentication.split(" ")[1]
    try {
        const {id} = jwt.verify(token,process.env.SECRET)
          
    } catch (error) {
     console.log(error) 
     res.status(400).json({error:"Not authorised"})   
    }
}



module.exports = requireAuth