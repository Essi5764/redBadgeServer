const {DataTypes} = require('sequelize');
const db = require('../db');
const User = db.define('User', {
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    admin:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    
});

module.exports = User;