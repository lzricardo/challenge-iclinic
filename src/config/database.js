require('environment');

module.exports = {
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    dialect: process.env.DB_DIALECT,
    storage: './__test__/database.sql',
    operatorsAliases: process.env.DB_OPERATORS_ALIASES,
    logging: false,
    define: {
      timestamp: true,
      underscored: true,
      underscoredAll: true
    }
};
