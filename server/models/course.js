const { DataTypes} = require('sequelize');
const db = require('../db');

const course = db.define('course',{
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
    
});
module.exports = course;