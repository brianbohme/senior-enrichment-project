const Sequelize = require('sequelize');
const db = require('../db');

module.exports = db.define('campuses', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  image: Sequelize.STRING
});
