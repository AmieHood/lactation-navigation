const { sequelize } = require('../db')
const { DataTypes } = require('sequelize')

const DefineUser = require('./userModel')
const DefineCounselor = require('./counselorModel')
const DefineChapter = require('./chapterModel')
const DefineAdmin = require('./adminModel')
const DefineMember = require('./memberModel')

const User = DefineUser(sequelize, DataTypes)
const Counselor = DefineCounselor(sequelize, DataTypes)
const Chapter = DefineChapter(sequelize, DataTypes)
const Admin = DefineAdmin(sequelize, DataTypes)
const Member = DefineMember(sequelize, DataTypes)

User.hasOne(Counselor, {
});
Counselor.belongsTo(User);

Chapter.hasMany(Counselor);
Counselor.belongsTo(Chapter);

//Set up for future updates
User.hasOne(Admin, {
    onDelete: 'CASCADE'
});
Admin.belongsTo(User);

Admin.belongsToMany(Chapter, {through: 'ChapterAdmin'});
Chapter.belongsToMany(Admin, {through: 'ChapterAdmin'});

User.hasOne(Member, {
    onDelete: 'CASCADE'
});
Member.belongsTo(User);


module.exports = { User, Counselor, Chapter, Admin, Member }