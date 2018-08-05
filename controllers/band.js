const Band = require('../models/Band');

module.exports = {
  getAll(req, res) {
    Band.find({})
      .then((band) => res.json(band))
      .catch((err) => res.status(400).json(err));
  },

  getById(req, res) {
    Band.findById(req.params.bandid)
      .then((band) => res.json(band))
      .catch((err) => res.status(400).json(err));
  },

  updateById(req, res) {
    Band.findByIdAndUpdate(req.params.bandid, req.body)
      .then((band) => res.json(band))
      .catch((err) => res.status(400).json(err));
  },

  deleteById(req, res) {
    Band.findOneandDelete(req.params.bandid)
      .then((band) => res.json(band))
      .catch((err) => res.status(400).json(err));
  },

  createNew(req, res) {
    const band = new Band(req.body);

    band
      .save()
      .then((newBand) => res.json(newBand))
      .catch((err) => res.status(400).json(err));
  },
};
