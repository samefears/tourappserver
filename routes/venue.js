const venue = require('../controllers/venue');

module.exports = (router) => {
  // Get all venues
  router.get('/venues', venue.getAll);

  // Create new venue
  router.post('/venue/new', venue.createNew);

  // Get venue by ID
  router.get('/venue/:venueid', venue.getById);

  // Update venue by ID
  router.put('/venue/:venueid', venue.modifyVenue);

  // Delete venue by ID
  // router.delete('/venue/:venueid', venue.deleteVenue);
};
