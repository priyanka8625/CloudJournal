const mongoose = require('mongoose')

const DB_NAME = require('./constants.js')

const connecToMongo = async () => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        console.log(`MONGODB connected!! DB HOST : ${connectionInstance.connection.host}`)
    }catch(error){
        console.error("MONGODB CONNECTION FAILED : "+error);
        process.exit(1)
    }
}

module.exports = connecToMongo