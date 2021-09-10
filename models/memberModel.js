// const { DataTypes } = require('sequelize')
// const { sequelize } = require('../db')


// const Member = sequelize.define('Member', {
    // paid: {
    //     type: DataTypes.BOOLEAN,
    //     allowNull: false
    // }
// });

// User.hasOne(Member, {
//     onDelete: 'CASCADE'
// });
// Member.belongsTo(User);

// module.exports = Member

module.exports = (sequelize, DataTypes) => {
    const Member = sequelize.define("Member", {
        paid: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    })
    return Member
}