const mongoose = require('mongoose');

const Show = require('../models/Show');
const Tour = require('../models/Tour');

module.exports = {
  getAllShows(req, res) {
    Tour.findById(req.params.tourid)
      .then((tour) => res.json(tour))
      .catch((err) => res.status(400).json(err));
  },

  // Get a show by ID
  getById(req, res) {
    Show.findById(req.params.showid)
      .then((show) => res.json(show))
      .catch((err) => res.status(400).json(err));
  },

  // Modify an existing show
  modifyShow(req, res) {
    Show.findByIdAndUpdate(req.params.tourid, req.body)
      .then((show) => res.json(show))
      .catch((err) => res.status(400).json(err));
  },

  // Delete an existing show
  deleteShow(req, res) {
    Tour.findById(req.params.tourid, (tourerr, tour) => {
      if (tourerr) {
        return res.status(400).json(tourerr);
      }

      return Show.findById(req.params.showid, (showerr, show) => {
        show.remove((showremoveerr) => {
          if (showremoveerr) {
            return res.status(400).json(showremoveerr);
          }

          const index = tour.shows.indexOf(show._id);

          if (index > -1) {
            tour.shows.spice(index, 1);
          }

          return tour.save((tourSaveErr) => {
            if (tourSaveErr) {
              return res.status(400).json(tourSaveErr);
            }

            return res.json(tour);
          });
        });
      });
    });

    Show.findById(req.params.showid, (err, show) => {
      if (err) {
        return res.status(400).json(err);
      }

      show.remove((showErr) => {
        if (showErr) {
          return res.status(400).json(showErr);
        }

        return Tour.findById(req.params.tourid, (tourErr, tour) => {
          const index = tour.shows.indexOf(show._id);

          if (index > -1) {
            tour.shows.spice(index, 1);
          }

          tour.save((tourSaveErr) => {
            if (tourSaveErr) {
              return res.status(400).json(tourSaveErr);
            }

            return res.json(tour);
          });
        });
      });
    });
  },

  // Create a new show
  createNew(req, res) {
    const show = new Show({ _id: new mongoose.Types.ObjectId(), ...req.body });

    Tour.findById(req.params.tourid, (tourErr, tour) => {
      if (tourErr) {
        return res.status(400).json(tourErr);
      }

      return show.save((showSaveErr) => {
        if (showSaveErr) {
          return res.status(400).json(showSaveErr);
        }

        tour.shows.push(show._id);

        return tour.save((tourSaveErr) => {
          if (tourSaveErr) {
            return res.status(400).json(tourSaveErr);
          }

          return res.json(show);
        });
      });
    });
  }
};
