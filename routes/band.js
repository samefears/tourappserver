const band = require('../controllers/band');

module.exports = (router, requireAuth) => {
  // Get all bands
  router.get('/bands', requireAuth, band.getAll);

  // Get Band by ID
  router.get('/band/:bandid', requireAuth, band.getById);

  // Update Band by ID
  router.put('/band/:bandid', requireAuth, band.updateById);

  // Delete Band by ID
  router.delete('/band/:bandid', requireAuth, band.deleteById);

  // Create new Band
  router.post('/band/new', requireAuth, band.createNew);
};
