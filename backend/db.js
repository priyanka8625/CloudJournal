const mongoose = require('mongoose')

const mongoURI = process.env.MONGO_URI

const connecToMongo = async () => {
    const result = await mongoose.connect(mongoURI)
    if(result){
        console.log("Connected to MongoDB successfully!")
    }else{
        console.log("Failed to connect to MongoDB")
    }
}

module.exports = connecToMongo