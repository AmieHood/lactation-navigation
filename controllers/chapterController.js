let express = require('express')
let router = express.Router()
let validateJWT = require("../middleware/validate-jwt")
const { User, Counselor, Chapter } = require('../models')

//create Chapter
router.post("/create", validateJWT, async (req, res) => {
    const { chapterName, chapterCity, chapterState, chapterPhone, chapterWebsite } = req.body
    const userId = req.user.id

    try {
        const newChapter = await Chapter.create({
            chapterName,
            chapterCity,
            chapterState,
            chapterPhone,
            chapterWebsite, 
        })
        const currentCounselor = await Counselor.findOne({where: {UserId: userId}})
        await newChapter.addCounselor(currentCounselor)
        let updatedChapter = await Chapter.findOne({where: {id: newChapter.id}})
        res.json(updatedChapter)
    } catch (error) {
        res.json({ error })
    }
})

//update Chapter //!Works if add ChapterId to endpoint
router.put('/:id', validateJWT, async(req, res) => {
    const { chapterName, chapterCity, chapterState, chapterPhone, chapterWebsite } = req.body
    // const userId = req.user.id

    const updatedChapter = {
        chapterName,
        chapterCity,
        chapterState,
        chapterPhone,
        chapterWebsite, 
    }
    const query = ({where: { id: req.params.id}})
    try {
        const update = await Chapter.update(updatedChapter, query)
        res.json(update)
    } catch (error) {
        console.error(error)
        res.json({ error})
    }
})

// get all Chapters (working)
router.get('/all', validateJWT, async (req, res) => {
    try {
        const all = await Chapter.findAll()
        res.json(all)
    } catch (error) {
        res.json({ error})
    }
})

//get one Chapter (working)
router.get('/:id', async(req, res) => {
    try {
        const one = await Chapter.findOne({where: { id: req.params.id}})
        res.json(one)
    } catch (error) {
        res.json({ error})
    }
})

// Delete Chapter (working)
router.delete('/:id', validateJWT, async(req, res) => {
    try {
        const deleteChapter = await Chapter.destroy({where: { id: req.params.id}})
        res.json(deleteChapter)
    } catch (error) {
        res.json({ error})
    }
})

module.exports = router
