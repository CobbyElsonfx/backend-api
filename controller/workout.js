//controllers 


const Workoutmodel = require("../model/workout") // models name by convention must be PascalCase called they are generally considered to be classes
const mongoose = require("mongoose")




//GET ALL WORKOUTS
const getAll_workout = async (req,res)=>{
    try {
        const workout = await Workoutmodel.find({}).sort({createdAt:-1})
        res.status(200).json(workout)
        
    } catch (error) {
        res.status(400).json({error:error.message})
        
    }
}

//POST A SINGLE WORKOUT
const post_workout = async (req,res)=>{
    const {title,reps,load} = req.body
    try {
        const workout = await Workoutmodel.create({title,reps,load})
        res.status(200).json(workout)  
        
    } catch (error) {
       res.status(400).json({error:error.message})        
    }
}


//GET A SINGLE WORKOUT
const getSingle_workout = async (req,res)=>{
     const {id} = req.params
    
     
    try {
        if (!mongoose.Types.ObjectId.isValid(id)){
            return   res.status(404).json({error:"not found"})
         }

        const workout = await Workoutmodel.findById(id)

        if(!workout){
          return   res.status(404).json({error:"not found"})
        }
        
          return res.status(200).json(workout)
      
        
    } catch (error) {
        res.status(400).json({error:error.message})
        
    }
    
}


// DELETE A SINGLE WORKOUT
const deleteSingle_workout = async (req,res)=>{
  const {id} = req.params
  try {
    if (!mongoose.Types.ObjectId.isValid(id)){
        return   res.status(404).json({error:"not Valid"})
      }

    const workout = await Workoutmodel.findOneAndDelete({_id: id})
    
    if(!workout){
      return   res.status(404).json({error:"not found"})
    }else{
        return res.status(200).json(workout)
    }
  
  } catch (error) {
    res.status(400).json({msg:error.message})
  }

  
}



//UPDATE A SINGLE WORKOUT
const update_workout =  async (req,res)=>{
    const {id} = req.params
    try {
        if (!mongoose.Types.ObjectId.isValid(id)){
            return   res.status(404).json({error:"not found"})
          }
        const workout =  await Workoutmodel.findByIdAndUpdate(id,req.body,{
            runValidators:true,
            new:true
        })
        if(!workout){
            return   res.status(404).json({error:"not found"})
          }else{
              return res.status(200).json(workout)
          }

    } catch (error) {
        res.status(400).json({msg:error.message})
        
    }
 }

 
module.exports = {
    getAll_workout,
    post_workout,
    getSingle_workout,
    deleteSingle_workout,
    update_workout

}