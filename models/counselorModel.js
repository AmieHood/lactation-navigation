module.exports = (sequelize, DataTypes) => {
    const Counselor = sequelize.define("Counselor", {
        dateAccredited: {
            type: DataTypes.STRING
        },
        role: {
            type: DataTypes.STRING
        }
    })
    return Counselor
}