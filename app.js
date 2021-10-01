require('dotenv').config()
const express = require('express')
const app = express()
// const port = 3000
const { sequelize } = require('./db')
const controllers = require('./controllers')

app.use(express.json())

app.use(require('./middleware/headers'))

app.use('/user', controllers.userController)
app.use('/counselor', controllers.counselorController)
app.use('/chapter', controllers.chapterController)

// ! place validate server here
app.listen(process.env.PORT, () => {
    console.log(`server is listening on port ${process.env.PORT}`)
})


sequelize.authenticate()
.then(() => sequelize.sync())
// .then(() => sequelize.sync({force: true}))
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`[Server]: App is listening on 3000.`);
    })
})
.catch((err) => {
    console.log(`[Server]: Server crashed. Error = ${err}`);
})
