const db = require('../db');
const UserModel = require('./user');
const CourseModel = require('./course');
const EnrollModel = require('./enrollment');


module.exports = {
    dbConnection: db,
    UserModel,
    CourseModel,
    EnrollModel
};

UserModel.hasMany(CourseModel);
CourseModel.belongsTo(UserModel);

UserModel.hasMany(EnrollModel);
EnrollModel.belongsTo(UserModel);