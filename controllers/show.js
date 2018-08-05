const mongoose = require('mongoose');

const Show = require('../models/Show');
const Tour = require('../models/Tour');

module.exports = {
  /**
   * NAME: Get all shows
   * DESCRIPTION: Get them all
   * RETURNS: {array} An array of shows
   */
  getAllShows(req, res) {
    Tour.findById(req.params.tourid)
      .then((tour) => res.json(tour))
      .catch((err) => res.status(400).json(err));
  },

  /**
   * NAME: Get a show
   * DESCRIPTION: Get a show by ID
   * RETURNS: {object} The show searched for
   */
  getById(req, res) {
    Show.findById(req.params.showid)
      .then((show) => res.json(show))
      .catch((err) => res.status(400).json(err));
  },

  /**
   * NAME: Modify a show
   * DESCRIPTION: Update the details of a show
   * RETURNS: {object} The modified show
   */
  modifyShow(req, res) {
    Show.findByIdAndUpdate(req.params.tourid, req.body)
      .then((show) => res.json(show))
      .catch((err) => res.status(400).json(err));
  },

  /**
   * NAME: Delete a show
   * DESCRIPTION: Find the tour the show belongs to, then find the show and delete. Next save the tour model
   * RETURNS: {object} The tour that the show was deleted from
   */
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
  },

  /**
   * NAME: Create a show for a tour
   * DESCRIPTION: Find a tour, create and save a show, add it to the tour and save.
   * RETURNS: {object} The created show
   */
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
  },
};
