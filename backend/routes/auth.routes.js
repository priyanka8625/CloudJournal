const express = require('express')
const { body, validationResult } = require('express-validator');
const router = express.Router()
const User = require('../models/user.model.js')

//create a user using POST : /api/auth

router.post('/',
    [
        body('name', 'enter a valid name').isLength({min: 3}),
        body('email', 'enter a valid email').isEmail(),
        body('password', 'password must be atleast 5 characters long').isLength({min : 5})
    ] ,
    async (req, res)=>{

        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }

        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        }).then(user => res.json(user))
        .catch(error => {console.log(error)
            res.json({error: error.message})
        })
    }
)

module.exports = router