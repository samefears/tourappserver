const tour = require('../controllers/tour');

module.exports = (router) => {
  // Get all tours
  router.get('/tours', tour.getAll);

  // Create new tour
  router.post('/tour/new', tour.createNew);

  // Get Tour by ID
  router.get('/tour/:tourid', tour.getById);

  // Delete Tour by ID
  // router.delete('/tour/:tourid', tour.deleteById);

  // Post new bulletin
  router.post('/tour/:tourid/bulletin/new', tour.postNewBulletin);

  // Add new tour manager
  router.post('/tour/:tourid/tourmanagers/new', tour.addNewTourManager);
};
