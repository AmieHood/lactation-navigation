let express = require('express')
let router = express.Router()
const { User } = require('../models')



// define the home page route
router.get('/', function (req, res) {
    res.send('Hello World')
})
// define the about route
router.get('/about', function (req, res) {
    res.send('About birds')
})

module.exports = router
