const Tour = require('../models/Tour');

module.exports = {
  /**
   * NAME: Get all tours
   * DESCRIPTION: Get all tours
   * RETURNS: {array} All of the tours
   */
  getAll(req, res) {
    Tour.find()
      .then((tour) => res.json(tour))
      .catch((err) => res.status(400).json(err));
  },

  /**
   * NAME: Get a tour by id
   * DESCRIPTION: Get all tours
   * RETURNS: {array} All of the tours
   */
  getById(req, res) {
    Tour.findById(req.params.tourid)
      .populate({
        path: 'admins',
        select: ['firstName', 'lastName']
      })
      .then((tour) => res.json(tour))
      .catch((err) => res.status(400).json(err));
  },

  /**
   * NAME: Create a new tour
   * DESCRIPTION: Creates a new tour that includes the user._id of the admin creating it.
   * RETURNS: {object} The created tour
   */
  createNew(req, res) {
    const admins = [req.body.admin];

    const tour = new Tour({ admins, ...req.body });

    tour.save((err) => {
      if (err) {
        return res.status(400).send(err);
      }

      return res.json(tour);
    });
  },

  /**
   * NAME: Post a bulletin
   * DESCRIPTION: Finds the correct bulletin, adds a new bulletin to it and saves it
   * RETURNS: {object} The created tour
   */
  postNewBulletin(req, res) {
    Tour.findById(req.params.tourid)
      .then((tour) => {
        tour.bulletins.push({
          createdAt: Date.now(),
          message: req.body.message
        });

        return tour
          .save()
          .then((tourUpdated) => res.json(tourUpdated))
          .catch((errtour) => res.status(400).send(errtour));
      })
      .catch((err) => res.status(400).send(err));
  },

  /**
   * NAME: Add a new tour manager to a tour
   * DESCRIPTION: Finds the correct tour
   * RETURNS: {object} The created tour
   */
  addNewTourManager(req, res) {
    Tour.findById(req.params.tourid)
      .then((tour) => {
        tour.tourManagers.push(req.body.adminid);

        return tour
          .save()
          .then((tourUpdated) => res.json(tourUpdated))
          .catch((errTour) => res.status(400).send(errTour));
      })
      .catch((err) => res.status(400).send(err));
  }

  /**
   * TODO: Create endpoint for all tours associated with a user
   */

  /**
   * TODO: Create endpoint for all tours associated with a tour admin
   */

  /**
   * TODO: Delete a tour
   */
};
