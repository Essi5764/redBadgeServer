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
        type: DataTypes.STRING,
        allowNull: false
    },
    instructor: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    created: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
    
});
module.exports = course;