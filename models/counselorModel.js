module.exports = (sequelize, DataTypes) => {
    const Counselor = sequelize.define("Counselor", {
        dateAccredited: {
            type: DataTypes.DATEONLY,
            allowNull: false
        }
    })
    return Counselor
}

// const { DataTypes } = require('sequelize')
// const { sequelize } = require('../db')


// const Counselor = sequelize.define('Counselor', {
    // dateAccredited: {
    //     type: DataTypes.DATEONLY
    // }
// });

// Counselor.belongsTo(User);

// Counselor.belongsTo(Chapter);

// module.exports = Counselor