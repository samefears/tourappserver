const Tour = require('../models/Tour');

module.exports = {
  getAll(req, res) {
    Tour.find({}, (err, tour) => {
      if (err) {
        console.log(err);
        return res.status(400).json(err);
      }

      return res.json(tour);
    });
  },

  getById(req, res) {
    Tour.findById(req.params.tourid)
      .then((tour) => res.json(tour))
      .catch((err) => res.status(400).json(err));
  },

  createNew(req, res) {
    const tour = new Tour(req.body);

    tour.save((err) => {
      if (err) {
        return res.status(400).send(err);
      }

      return res.json(tour);
    });
  },

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
};
