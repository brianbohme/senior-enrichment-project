const db = require('./server/db');
const Students = require('./server/db/models/students');
const Campuses = require('./server/db/models/campuses');

const students = [{
  name: 'Brian Bohme',
  email: 'bohmebrian@gmail.com',
  campusId: 2
}, {
  name: 'Alexander Hamilton',
  email: 'yourobddientservent@a.ham',
  campusId: 1
}, {
  name: 'Evan Hansen',
  email: 'dearevanhansen@connerproject.com',
  campusId: 2

}];

const campuses = [{
  name: 'Princeton',
  image: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Emmanuel_College_Front_Court%2C_Cambridge%2C_UK_-_Diliff.jpg'
}, {
  name: 'Fullstack Academy',
  image: 'https://www.pmxagency.com/wp-content/uploads/2013/10/photo2_b.jpg'
}];

const seed = () =>
  Promise.all(campuses.map(campus =>
    Campuses.create(campus))
  )
    .then(() =>
      Promise.all(students.map(student =>
        Students.create(student))
      ));

const main = () => {
  console.log('Syncing db...');
  db.sync({ force: true })
    .then(() => {
      console.log('Seeding database...');
      return seed();
    })
    .catch(err => {
      console.log('Error while seeding');
      console.log(err.stack);
    })
    .then(() => {
      db.close();
      console.log('All done!')
      return null;
    });
};

main();
