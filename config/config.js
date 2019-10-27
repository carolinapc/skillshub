require("dotenv").config();

module.exports = {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PWD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "mysql",
    "operatorsAliases": false,
    "dialectOptions": {
      "multipleStatements": true
    }
  },
  "test": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PWD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "mysql",
    "operatorsAliases": false,
    "dialectOptions": {
      "multipleStatements": true
    }
  },
  "production": {
    "use_env_variable": "JAWSDB_URL",
    "dialect": "mysql",
    "dialectOptions": {
      "multipleStatements": true
    }
  },
  "uploadFolder": "./client/public/images/uploads"
};
