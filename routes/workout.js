
const express = require("express")
const router = express.Router()
const Workoutmodel = require("../model/workout") // models name by convention must be PascalCase called they are generally considered to be classes
const {getAll_workout,post_workout,getSingle_workout, deleteSingle_workout,update_workout} = require("../controller/workout")

router.route("/" )
.get(getAll_workout)
.post(post_workout)


// the end point was made just /id and not api/workouts/id because it will appended to the endpoint defined in the server.js 
// the colon attached to the id represents a parameter that is subject to change

router.route("/:id")
.get(getSingle_workout)
.delete(deleteSingle_workout)
.patch(update_workout)



module.exports = router