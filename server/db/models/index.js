const Students = require('./students')
const Campuses = require('./campuses')

Students.belongsTo(Campuses)
Campuses.hasMany(Students)

module.exports = { Students, Campuses }
