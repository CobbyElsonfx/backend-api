const mongoose = require("mongoose")

const workoutSchema  = new mongoose.Schema({
    title: {
        type:String,
        required: [true, "Title is required"]
    },
    reps: {
        type:Number,
        required:true
    },
    load:{
        type:Number,
        required:true
    }
},
{timestamps:true})


module.exports =  mongoose.model("workouts", workoutSchema)