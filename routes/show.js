const show = require('../controllers/show');

module.exports = (router) => {
  // Add new show to a tour
  router.get('/tour/:tourid/shows', show.getAllShows);

  // Add new show to a tour
  router.post('/tour/:tourid/shows/new', show.createNew);

  // Get a singular show
  router.get('/tour/:tourid/shows/:showid', show.getById);

  // Modify a show
  router.put('/tour/:tourid/shows/:showid', show.modifyShow);

  // Delete a show
  router.delete('/tour/:tourid/shows/:showid', show.deleteShow);
};
