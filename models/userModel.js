module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
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
    })
    return User
}