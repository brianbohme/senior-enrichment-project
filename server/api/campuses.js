const router = require('express').Router();
const { Campuses } = require('../db/models');

module.exports = router;

router.get('/', function (req, res, next) {
  Campuses.findAll()
    .then(campuses => res.json(campuses))
    .catch(next);
});

router.get('/:campusId', function (req, res, next) {
  Campuses.findById(req.params.campusId)
    .then(campus => res.json(campus))
    .catch(next);
});

router.post('/', function (req, res, next) {
  Campuses.create(req.body)
    .then(campus => res.json(campus))
    .catch(next);
});

router.delete('/:campusId', function (req, res, next) {
  const id = req.params.campusId;

  Campuses.destroy({ where: { id } })
    .then(() => res.status(204).end())
    .catch(next);
});

router.put('/:campusId', function (req, res, next) {
  Campuses.findById(req.params.campusId)
    .then(campus => {
      let update = campus.update(req.body);
      return update
    })
    .then(update => res.json(update))
    .catch(next);
});
