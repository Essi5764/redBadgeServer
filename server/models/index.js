const db = require('../db');
const UserModel = require('./user');
const CourseModel = require('./course');
const EnrollementModel = require('./enrollment');


module.exports = {
    dbConnection: db,
    UserModel,
    CourseModel,
    EnrollementModel
};

UserModel.hasMany(CourseModel);
CourseModel.belongsTo(UserModel);

UserModel.hasMany(EnrollementModel);
EnrollementModel.belongsTo(UserModel);