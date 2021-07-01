const Sequelize = require('sequelize');

const sequelize = new Sequelize("postgres://postgres:postgres@localhost:5432/elearning_db");

module.exports = sequelize;