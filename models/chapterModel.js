module.exports = (sequelize, DataTypes) => {
    const Chapter = sequelize.define("Chapter", {
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
    })
    return Chapter
}