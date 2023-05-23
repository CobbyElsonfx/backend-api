const userModel = require("../model/user")
const jwt = require("jsonwebtoken")


const requireAuth = async (req,res,next)=>{
    const {authorization} = req.headers

    if(!authorization){
      return  res.status(401).json({error:"Authentication required"})
    }
    const token = await  authorization.split(" ")[1]
    try {
      //Extracts the user ID from the token
        const auth = jwt.verify(token,process.env.SECRET, async (err,decodedToken) =>{
          if(err){
            console.log(err.message, "token error")
          }else{
            console.log(decodedToken.id)
            req.user = await userModel.findById(decodedToken.id).select("_id")
            next()
          }
        })
        
        //Use the id to find the user object and selects the Id , this code may seem redundant but 
        // it ensures security since the users Id could have been alterd by one way or the other and needs to be 
        //verified
    } catch (error) {
     console.log(error) 
     return res.status(400).json({error:"Not authorised"})   
    }
}



module.exports = requireAuth