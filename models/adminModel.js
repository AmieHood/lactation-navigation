module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define("Admin", {
        role: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return Admin
}

// const { DataTypes } = require('sequelize')
// const { sequelize } = require('../db')


// const Admin = sequelize.define('Admin', {
    // role: {
    //     type: DataTypes.STRING,
    //     allowNull: false
    // }
// });

// Admin.belongsTo(User);

// Admin.belongsToMany(Chapter, {through: 'ChapterAdmin'});

// module.exports = Admin