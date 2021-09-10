require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const { sequelize } = require('./db')

app.use(require('./middleware/headers'))

const controllers = require('./controllers')

app.use(express.json())

// const user = require('./controllers/userController')
app.use('/user', controllers.userController)
// ! place validate server here
app.use('/chapter', controllers.chapterController)

// app.use('/test', (req, res) => {
//     res.send('This is a test.')
// })

sequelize.authenticate()
.then(() => sequelize.sync())
.then(() => {
    app.listen(3000, () => {
        console.log(`[Server]: App is listening on 3000.`);
    })
})
.catch((err) => {
    console.log(`[Server]: Server crashed. Error = ${err}`);
})
// app.listen(port, () => {
//     console.log(`App listening at http://localhost:${port}`);
// })
;(async() => {
    // try{
    //     await syncDb()
    //     console.log('connection established successfully');
    // } catch (error){
    //     console.error(error)
    // }

    // app.get('/', (req, res) => {
    //     res.send('Hello World!')
    // })
    // app.listen(port, () => {
    //     console.log(`App listening at http://localhost:${port}`);
    // })
})()
