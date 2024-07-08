const express = require('express')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const router = express.Router()
const User = require('../models/user.model.js')

//create a user using POST : /api/auth - no need of a logged in user 
router.post('/createuser',
    //express-validator 
    [
        body('name', 'enter a valid name').isLength({ min: 3 }),
        body('email', 'enter a valid email').isEmail(),
        body('password', 'password must be atleast 5 characters long').isLength({ min: 5 })
    ],
    async (req, res) => {

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        try {
            //user already exists?
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                return res.status(400).json({ error: 'user with this email already exists' })
            }
            //secure password using bcrypt
            const salt = await bcrypt.genSalt(10)
            const secPassword = await bcrypt.hash(req.body.password, salt)

            //create a record
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPassword,
            })

            const data = {
                user: {
                    id : user._id
                }
            }
            const authToken = jwt.sign(data, "shhhh")

            //return res
            // res.json(user)
            res.json({authToken:authToken})

        } catch (error) {
            console.log(error.message)
            return res.status(500).json({ error: error.message })
        }
    }
)

module.exports = router