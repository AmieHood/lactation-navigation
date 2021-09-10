const { sequelize, syncDb } = require('../db')
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
    onDelete: 'CASCADE'
});
Counselor.belongsTo(User);

Chapter.hasMany(Counselor);
Counselor.belongsTo(Chapter);

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

syncDb(sequelize, {alter: true})

module.exports = { User, Counselor, Chapter, Admin, Member }