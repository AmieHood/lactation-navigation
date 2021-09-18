// let express = require('express')
// let router = express.Router()
// const { User, Counselor, Chapter, Admin } = require('../models')
// let validateJWT = require("../middleware/validate-jwt")

// //create Admin
// router.post('/create', validateJWT, async (req, res) => {
//     const userId = req.user.id
//     console.log(userId);
//     try {
//         let currentUser = await User.findOne({where: { id: userId}})
//         console.log(currentUser);
//         let result = await currentUser.createAdmin({
//             dateAccredited: req.body.dateAccredited
//         })
//         res.json(result)
//     } catch (error) {
//         console.log(error);
//         res.json({ error })
//     }
// })

// //update Admin //!working but have to add admin id to endpoint. Need to figure out how to just reference token
// router.put('/:id', validateJWT, async(req, res) => {
//     const { dateAccredited } = req.body
//     // const {id} = req.params
//     try {
    
//     const updatedAdmin = {
//         dateAccredited: dateAccredited
//     }
//     const query = ({where: { id: req.params.id }})
//         const update = await Admin.update(updatedAdmin, query)
//         res.json(update)
//     } catch (error) {
//         console.error(error)
//         res.json({ error})
//     }
// })

// // get all Admins (working)
// router.get('/all', async (req, res) => {
//     try {
//         const all = await Admin.findAll()
//         res.json(all)
//     } catch (error) {
//         res.json({ error})
//     }
// })

// //get one Admin with User id
// //!Note for the UserId below: although sequelize docs indicate userId would be camel case, pg admin creates them in pascal casing. 
// //!If you are having sequelize errors, consider switching to camel case. 

// // router.get('/user/:id', async(req, res) => {
// //     try {
// //         const counselor = await Admin.findOne({where: {UserId: req.params.id}})
// //         res.json(counselor)
// //     } catch (error) {
// //         res.json({ error})
// //     }
// // })

// //get one Admin (working)
// router.get('/:id', async(req, res) => {
//     try {
//         const one = await Admin.findOne({where: { id: req.params.id}})
//         res.json(one)
//     } catch (error) {
//         res.json({ error})
//     }
// })

// //Delete Admin (working)
// router.delete('/:id', validateJWT, async(req, res) => {
//     try {
//         const deleteAdmin = await Admin.destroy({where: { id: req.params.id}})
//         res.json(deleteAdmin)
//     } catch (error) {
//         res.json({ error})
//     }
// })

// module.exports = router