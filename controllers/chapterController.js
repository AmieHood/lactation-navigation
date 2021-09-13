let express = require('express')
let router = express.Router()
let validateJWT = require("../middleware/validate-jwt")
const { Counselor, Chapter } = require('../models')

router.post("/", validateJWT, async (req, res) => {
    const { chapterName, chapterCity, chapterState, chapterPhone, chapterWebsite } = req.body

    try {
        const result = await Chapter.create({
            chapterName,
            chapterCity,
            chapterState,
            chapterPhone,
            chapterWebsite, 
            counselorId: req.body.CounselorId
        })
        res.json(result)
    } catch (error) {
        res.json({ error })
    }
})

// get all Chapters
router.get('/all', validateJWT, async (req, res) => {
    try {
        const all = await Chapter.findAll()
        res.json(all)
    } catch (error) {
        res.json({ error})
    }
})

//get one Chapter
router.get('/:id', async(req, res) => {
    try {
        const one = await Chapter.findOne({where: { id: req.params.id}})
        res.json(one)
    } catch (error) {
        res.json({ error})
    }
})

//update Chapter
router.put('/:id', async(req, res) => {
    const { chapterName, chapterCity, chapterState, chapterPhone, chapterWebsite } = req.body

    const updatedChapter = {
        chapterName: chapterName,
        chapterCity: chapterCity,
        chapterState: chapterState,
        chapterPhone: chapterPhone,
        chapterWebsite: chapterWebsite, 
        counselorId: req.body.Counselor.id
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

module.exports = router
