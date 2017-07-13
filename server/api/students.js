const router = require('express').Router();
const { Students } = require('../db/models');

module.exports = router;

router.get('/', function (req, res, next) {
  Students.findAll()
    .then(students => res.json(students))
    .catch(next);
});

router.get('/:studentId', function (req, res, next) {
  Students.findById(req.params.studentId)
    .then(student => res.json(student))
    .catch(next);
});

router.post('/', function (req, res, next) {
  Students.create(req.body)
    .then(students => res.json(students))
    .catch(next);
});

router.delete('/:studentId', function (req, res, next) {
  const id = req.params.studentId;

  Students.destroy({ where: { id } })
    .then(() => res.status(204).end())
    .catch(next);
});

router.put('/:studentId', function (req, res, next) {
  Students.findById(req.params.studentId)
    .then(student => {
      let update = student.update(req.body);
      return update
    })
    .then(update => res.json(update))
    .catch(next);
});
