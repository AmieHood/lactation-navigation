let express = require('express')
let router = express.Router()
const { Chapter } = require('../models')

router.post("/chapter", async (req, res) => {
    const { chapterName, chapterCity, chapterState, chapterPhone, chapterWebsite } = req.body
     
    try {
        const createChapter = await Chapter.create({
            chapterName: chapterName,
            chapterCity: chapterCity,
            chapterState: chapterState,
            chapterPhone: chapterPhone,
            chapterWebsite: chapterWebsite
        })
        
    res.status(200).json({
        chapterName: createChapter.chapterName,
        chapterCity: createChapter.chapterCity,
        chapterState: createChapter.chapterState,
        chapterPhone: createChapter.chapterPhone,
        chapterWebsite: createChapter.chapterWebsite
    })
    } catch (err){
        console.log(err)
        message = {
            msg:'Failed to Create Chapter'
        }
    }
    res.json(message)
})

module.exports = router
