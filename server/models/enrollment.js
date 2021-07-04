const { DataTypes} = require('sequelize');
const db = require('../db');

const enrollment = db.define('enrollment',{
    firstname: {
        type: DataTypes.STRING,
        allowNull: false},
    lastname: {
        type: DataTypes.STRING,
        allowNull: false},
    course: {
        type: DataTypes.STRING,
        allowNull: false},
    category: {
        type: DataTypes.STRING,
        allowNull: false,
        
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        
    }
});
module.exports = enrollment;