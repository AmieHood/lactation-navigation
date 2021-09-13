let express = require('express')
let router = express.Router()
const { User, Counselor } = require('../models')
let validateJWT = require("../middleware/validate-jwt")

//create Counselor
router.post('/', validateJWT, async (req, res) => {
    // const { userId } = req.user
    try {
        const result = await Counselor.create({
            dateAccredited: req.body.dateAccredited,
            UserId: req.user.id
            // ChapterId: 
        })
        console.log(userId)
        res.json(result)
    } catch (error) {
        console.log(error);
        res.json({ error })
    }
})

// get all Counselors
router.get('/all', validateJWT, async (req, res) => {
    try {
        const all = await Counselor.findAll()
        res.json(all)
    } catch (error) {
        res.json({ error})
    }
})

//get one Counselor with User id
//!Note for the UserId below: although sequelize docs indicate userId would be camel case, pg admin creates them in pascal casing. 
//!If you are having sequelize errors, consider switching to camel case. 

router.get('/user/:id', async(req, res) => {
    try {
        const counselor = await Counselor.findOne({where: {userId: req.params.id}})
        res.json(counselor)
    } catch (error) {
        res.json({ error})
    }
})

//get one Counselor
router.get('/:id', async(req, res) => {
    try {
        const one = await Counselor.findOne({where: { id: req.params.id}})
        res.json(one)
    } catch (error) {
        res.json({ error})
    }
})


module.exports = router