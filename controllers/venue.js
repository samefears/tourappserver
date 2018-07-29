const Venue = require('../models/Venue');

module.exports = {
  getAll(req, res) {
    Venue.find()
      .then((venues) => res.json(venues))
      .catch((err) => res.status(400).json(err));
  },

  getById(req, res) {
    Venue.findById(req.params.id)
      .then((venue) => res.json(venue))
      .catch((err) => res.status(400).json(err));
  },

  createNew(req, res) {
    const venue = new Venue(req.body);

    venue.save((err) => {
      if (err) {
        return res.status(400).send(err);
      }

      return res.json(venue);
    });
  },

  modifyVenue(req, res) {
    Venue.findByIdAndUpdate(req.params.venueid, req.body)
      .then((venue) => res.json(venue))
      .catch((err) => res.status(400).json(err));
  }
};
