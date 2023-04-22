const mongoose = require("mongoose")


const dbConnection = (url)=>{
    mongoose.connect(url , {
        useNewUrlParser: true,
    })
}

module.exports = {
    dbConnection
}