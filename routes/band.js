const band = require('../controllers/band');

module.exports = (router) => {
  // Get all bands
  router.get('/bands', band.getAll);

  // Get Band by ID
  router.get('/band/:bandid', band.getById);

  // Update Band by ID
  router.put('/band/:bandid', band.updateById);

  // Delete Band by ID
  router.delete('/band/:bandid', band.deleteById);

  // Create new Band
  router.post('/band/new', band.createNew);
};
