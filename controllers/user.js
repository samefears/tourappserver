const User = require('../models/User');

module.exports = {
  getAll(req, res) {
    User.find()
      .then((user) => res.json(user))
      .catch((err) => res.status(400).json(err));
  },

  getById(req, res) {
    User.findById(req.params.id)
      .then((user) => res.json(user))
      .catch((err) => res.status(400).json(err));
  },

  createNew(req, res) {
    const user = new User(req.body);

    user.save((err) => {
      if (err) {
        return res.status(400).send(err);
      }

      return res.json(user);
    });
  },
};
