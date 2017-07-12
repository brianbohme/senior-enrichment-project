const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('students', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  }
});

