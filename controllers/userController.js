let express = require('express')
let router = express.Router()
const {User} = require('../models')

//New User account
router.post("/signup", async (req, res) => {
    const { email, password, firstName, lastName, userCity, userState, userPhone } = req.body
     
    try {
        const createUser = await User.create({
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            userCity: userCity,
            userState: userState,
            userPhone: userPhone
        })
        
    res.status(200).json({
        email: createUser.email,
        firstName: createUser.firstName,
        lastName: createUser.lastName,
        userCity: createUser.userCity,
        userState: createUser.userState,
        userPhone: createUser.userPhone
    })
    } catch (err){
        console.log(err)
        message = {
            msg:'Failed to Create User'
        }
    }
    res.json(message)
})

//Login User
router.post("/login", async (req, res) => {
    const { email } = req.body

    try {
        const getUser = await User.findOne({
            where: {
                email: email
            }
        })
        res.status(200).json({
            email: getUser.email,
            firstName: getUser.firstName,
            lastName: getUser.lastName,
            userCity: getUser.userCity,
            userState: getUser.userState,
            userPhone: getUser.userPhone
        })
    } catch(err) {
        console.log(err);
    }
})
    

module.exports = router
