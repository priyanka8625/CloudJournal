const connecToMongo = require('./db.js')
const express = require('express')
const dotenv = require('dotenv')

dotenv.config({
    path: './.env'
})

const app = express()

connecToMongo()
.then(() => {
    //listen for errors before creating server
    app.on("error", (error) =>{
        console.log("APP ERROR: "+error)
        throw(error)//to stop appln
    })

    //listen server on port
    app.listen(process.env.PORT || 5050, ()=>{
        console.log(`server is running on port : ${process.env.PORT}`)
    })
    
})
.catch((err) => {
    console.log(`Mongodb connection failed: ${err}`)
})

app.use(express.json())

//routes
app.use('/api/auth', require('./routes/auth.routes.js'))
app.use('/api/notes', require('./routes/note.routes.js'))
