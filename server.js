require("dotenv").config()
const port = process.env.PORT
const cors = require('cors');
const express = require("express")
const  app = express()
var path = require("path")
const morgan = require("morgan")
const workoutsRouter = require("./routes/workout")
const {dbConnection} = require("./db/connection")


 
//middlewares

const corsOptions = {
    origin: 'http://localhost:5173'
  };
app.use(cors(corsOptions));
app.use(express.json())
app.use(morgan("dev"))
app.use(express.static(path.join(__dirname,"public")))

app.use("/api/workouts", workoutsRouter)





const startServer = async ()=>{
    try {
        const db = await dbConnection(process.env.MONGO_URI)
        app.listen(port, ()=>{
            console.log(`Listening on Port ${port}`)
        })
        
    } catch (error) {
        console.log(error)
        
    }

}

startServer()
