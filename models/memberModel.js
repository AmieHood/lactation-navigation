//Set up for future updates

module.exports = (sequelize, DataTypes) => {
    const Member = sequelize.define("Member", {
        paid: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    })
    return Member
}