const express = require('express')
const router = express.Router()
const User = require('../models/user.model.js')

//create a user using POST : /api/auth

router.post('/', async (req, res)=>{
    const result = await User.create(req.body)

    if(!result)
        throw new Error("Failure to insert")
    console.log(req.body);
    res.json(req.body)
})

module.exports = router