const express = require('express')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const router = express.Router()
const User = require('../models/user.model.js');
const fetchUser = require('../middleware/fetchUser.middleware.js');

//Route1: create a user using POST : /api/auth/createuser - no need of a logged in user 
router.post('/createuser',
    //express-validator 
    [
        body('name', 'enter a valid name').isLength({ min: 3 }),
        body('email', 'enter a valid email').isEmail(),
        body('password', 'password must be atleast 5 characters long').isLength({ min: 5 })
    ],
    async (req, res) => {
        let success = false
        // validate req.body data
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({success, errors: errors.array() })
        }

        try {
            //user already exists?
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                return res.status(400).json({success, error: 'user with this email already exists' })
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
                    id: user._id
                }
            }
            const authToken = jwt.sign(data, process.env.JWT_SECRET)

            //return res
            // res.json(user)
            success= true
            res.json({success, authToken: authToken })

        } catch (error) {
            console.log(error.message)
            return res.status(500).json({success, error: error.message })
        }
    }
)

//Route2: login user - POST : /api/auth/login - no need of logged in user
router.post('/login',
    //express-validator 
    [
        body('email', 'enter a valid email').isEmail(),
        body('password', 'password cant be blank').exists()
    ],
    async (req, res) => {
        let success = false;
        // validate req.body data
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() })
        }

        const {email, password} = req.body;
        try{
            let user = await User.findOne({email})
            if(!user){
                return res.status(400).json({success, error: 'Please try to login with correct credentials'})
            }

            const passwordCompare = await bcrypt.compare(password, user.password)
            if(!passwordCompare){
                return res.status(400).json({success, error: 'Please try to login with correct credentials'})
            }
            //if user is with correct details
            const data = {
                user: {
                    id: user._id
                }
            }
            const authToken = jwt.sign(data, process.env.JWT_SECRET)
            success = true
            res.json({ success, authToken: authToken })
        }catch(error){
            console.log(error.message)
            return res.status(500).json({ error: error.message })
        }
    }
)

//Route3: Get logged in user information on /api/auth/getuser - login required
router.get('/getuser', fetchUser, async(req, res)=>{
    let success = false;
    const userId = req.user.id
    try{
        const user = await User.findById(userId).select("-password")
        success = true
        res.status(200).json({success, user})
    }catch(error){
        res.status(500).json({success, message:"Internal Server Error"})
    }
})

module.exports = router