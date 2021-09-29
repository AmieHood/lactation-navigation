let express = require('express')
let router = express.Router()
const { User, Counselor, Chapter } = require('../models')
let validateJWT = require("../middleware/validate-jwt")

//create Counselor
router.post('/create', validateJWT, async (req, res) => {
    const userId = req.user.id
    const userRole = 'Counselor'
    try {
        let currentUser = await User.findOne({where: { id: userId}})
        let result = await currentUser.createCounselor({
            dateAccredited: req.body.dateAccredited, 
            role: userRole
        })
        res.json(result)
    } catch (error) {
        res.json({ error })
    }
})

//validate Counselor role 
// router.get('/validate', validateJWT, async (req, res) => {
//     try {
//         let validatedUser = await Counselor.findOne({ where: { UserId: req.user.id}})
//         if (validatedUser) {
//             res.status(200).json(validatedUser)
//         } else {
//             res.status(500).json({message: 'not found'})
//         }

//     } catch (error) {
//         res.json({error})
//     }
// })

//update Counselor
router.put('/:id', validateJWT, async(req, res) => {
    const { dateAccredited } = req.body
    try {
    
    const updatedCounselor = {
        dateAccredited: dateAccredited
    }
    const query = ({where: { id: req.params.id }})
        const update = await Counselor.update(updatedCounselor, query)
        res.json(update)
    } catch (error) {
        res.json({ error})
    }
})



// get all Counselors
router.get('/all', async (req, res) => {
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
        const counselor = await Counselor.findOne({where: {role: Counselor}})
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

//Delete Counselor
router.delete('/:id', validateJWT, async(req, res) => {
    try {
        const deleteCounselor = await Counselor.destroy({where: { id: req.params.id}})
        res.json(deleteCounselor)
    } catch (error) {
        res.json({ error})
    }
})

module.exports = router