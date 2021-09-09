require('dotenv').config()

// const express = require('express')
// const { sequelize } = require('./db')
// const app = express()
// const port = 3000

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })


const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_DBNAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
    host: process.env.DB_HOST,
    dialect: 'postgres'
    }
);

const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userCity: {
        type: DataTypes.STRING
    },
    userState: {
        type: DataTypes.STRING
    },
    userPhone: {
        type: DataTypes.STRING
    }
});

const Counselor = sequelize.define('Counselor', {
    dateAccredited: {
        type: DataTypes.DATEONLY
    }
});

User.hasOne(Counselor, {
    onDelete: 'CASCADE'
});
Counselor.belongsTo(User);

const Chapter = sequelize.define('Chapter', {
    chapterName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    chapterCity: {
        type: DataTypes.STRING,
        allowNull: false
    },
    chapterState: {
        type: DataTypes.STRING, 
        allowNull: false
    },
    chapterPhone: {
        type: DataTypes.STRING
    },
    chapterWebsite: {
        type: DataTypes.STRING
    }
});

Chapter.hasMany(Counselor);
Counselor.belongsTo(Chapter);

const Admin = sequelize.define('Admin', {
    role: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

User.hasOne(Admin, {
    onDelete: 'CASCADE'
});
Admin.belongsTo(User);

Admin.belongsToMany(Chapter, {through: 'ChapterAdmin'});
Chapter.belongsToMany(Admin, {through: 'ChapterAdmin'});

//stretch goal:

const Member = sequelize.define('Member', {
    paid: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
});

User.hasOne(Member, {
    onDelete: 'CASCADE'
});
Member.belongsTo(User);


;(async() => {
    await sequelize.authenticate()
    // await sequelize.sync({force: true})
    await sequelize.sync()
    
    // app.listen(port, () => {
    //     console.log(`Example app listening at http://localhost:${port}`)
    // })
})();
