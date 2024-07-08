const mongoose = require('mongoose')

const mongoURI = "mongodb+srv://admin:admin@cluster0.w34paiw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const connecToMongo = async () => {
    const result = await mongoose.connect(mongoURI)
    if(result){
        console.log("Connected to MongoDB successfully!")
    }else{
        console.log("Failed to connect to MongoDB")
    }
}

module.exports = connecToMongo