let express = require('express')
let router = express.Router()
const {User} = require('../models')
const { Counselor } = require('../models')
const { UniqueConstraintError } = require("sequelize/lib/errors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const validateJWT = require('../middleware/validate-jwt')

//Signup User account
router.post("/signup", async (req, res) => {
    const { email, password, firstName, lastName, userCity, userState, userPhone } = req.body     
    try {
        const user = await User.create({
            email,
            password: bcrypt.hashSync(password, 12),
            firstName,
            lastName,
            userCity,
            userState,
            userPhone,
        })

        let token = jwt.sign({id: user.id, email: user.email}, 
            process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24})

        res.status(201).json({
            message: "User successfully registered", 
            user: user,
            sessionToken: token
        })

    } catch(err) {
        if (err instanceof UniqueConstraintError){
            res.status(409).json({
                message: "username already in use",
            })
        } else {
            res.status(500).json({
                message: "Failed to register user",
            })
        }
    }
})

//Login User
router.post("/login", async (req, res) => {
    const { email, password } = req.body

    try {
        const loginUser = await User.findOne({
            where: {
                email: email
            },
            include: 
                Counselor
            
        })
        if(loginUser){
            
            let passwordComparison = await bcrypt.compare(password, loginUser.password)
            
            if (passwordComparison) {

            let token = jwt.sign({id: loginUser.id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24})

            res.status(200).json({
                user: loginUser,
                message: "User successfully logged in!",
                sessionToken: token
            })
            } else {
                res.status(401).json({
                    message: "Incorrect username or password"
                })
            }
        } else {
            res.status(401).json({
                message: "Incorrect username or password"
            })
        }
    } catch(err) {
        res.status(500).json({
            message: "Failed to login user",
        })
    }
})
    

//get all users 
router.get('/all', validateJWT, async (req, res) => {
    try{
        const all = await User.findAll()
        res.json(all)
    } catch (error) {
        res.json({ error })
    }
})

//get one user

router.get('/:id', validateJWT, async (req, res) => {
    try{
        const one = await User.findOne({
            where: { id: req.params.id}
        })
        res.json(one)
    } catch (error) {
        res.json({ error })
    }
})

//update User 
router.put('/:id', validateJWT, async(req, res) => {
    const { email, firstName, lastName, userCity, userState, userPhone } = req.body
    // const {id} = req.params
    try {
    
    const updatedUser = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        userCity: userCity,
        userState: userState,
        userPhone: userPhone,
    }
    const query = ({where: { id: req.params.id }})
        const update = await User.update(updatedUser, query)
        res.json(update)
    } catch (error) {
        res.json({ error})
    }
})

//Delete User
router.delete('/:id', validateJWT, async(req, res) => {
    try {
        const deleteUser = await User.destroy({where: { id: req.params.id}})
        res.json(deleteUser)
    } catch (error) {
        res.json({ error})
    }
})

module.exports = router
