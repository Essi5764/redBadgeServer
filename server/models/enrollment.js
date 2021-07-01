const { DataTypes} = require('sequelize');
const db = require('../db');

const enrollment = db.define('course',{
    course: {
        type: DataTypes.STRING,
        allowNull: false},
    
    enrolled: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    student: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});
module.exports = enrollment;