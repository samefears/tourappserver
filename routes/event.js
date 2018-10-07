const event = require('../controllers/event');

module.exports = (router) => {
  // Add new show to a tour
  router.get('/tour/:tourid/shows', event.getAllShows);

  // Add new show to a tour
  router.post('/tour/:tourid/shows/new', event.createNew);

  // Get a singular show
  router.get('/tour/:tourid/shows/:showid', event.getById);

  // Modify a show
  router.put('/tour/:tourid/shows/:showid', event.modifyShow);

  // Delete a show
  router.delete('/tour/:tourid/shows/:showid', event.deleteShow);
};
