const db = require('./server/db');
const Students = require('./server/db/models/students');
const Campuses = require('./server/db/models/campuses');

const students = [{
  name: 'Brian Bohme',
  email: 'bohmebrian@gmail.com',
  campusId: 1
}, {
  name: 'Random Student',
  email: 'randomstudent@yahoo.com',
  campusId: 2
}];

const campuses = [{
  name: 'Fullstack Academy',
  image: 'insertimagehere'
}, {
  name: 'Grace Hopper',
  image: 'insertimagethere'
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
