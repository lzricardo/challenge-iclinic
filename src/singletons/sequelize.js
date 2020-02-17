const Sequelize = require('sequelize');
const config = require('../config/database');

let sequelize = new Sequelize(config.database, config.username, config.password, config);

module.exports = sequelize;