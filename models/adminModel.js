module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define("Admin", {
        //email, password
        role: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return Admin
}
