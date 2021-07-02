const { DataTypes} = require('sequelize');
const db = require('../db');

const enrollment = db.define('enrollment',{
    course: {
        type: DataTypes.INTEGER,
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
        values: ["Enrolled","Withdraw"],
        defaultValue: "Enrolled"
    }
});
module.exports = enrollment;