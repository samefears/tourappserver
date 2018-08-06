const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/user');
const { LOGIN_SECRET } = require('../config');

function generateToken(user) {
  return jwt.sign(user, LOGIN_SECRET, {
    expiresIn: 10080,
  });
}

function setUserInfo(request) {
  return {
    _id: request._id,
    firstName: request.firstName,
    lastName: request.lastName,
    email: request.email,
  };
}

module.exports = {
  login(req, res, next) {
    let userInfo = setUserInfo(req.user);

    res.status(200).json({
      token: 'JWT ' + generateToken(userInfo),
      user: userInfo,
    });
  },

  register(req, res, next) {
    const { email, firstName, lastName, password } = req.body;

    if (!email) {
      return res.status(422).json({ error: 'You must enter an email address.' });
    }

    if (!firstName || !lastName) {
      return res.status(422).json({ error: 'You must enter an email address.' });
    }

    if (!password) {
      return res.status(422).json({ error: 'You must enter an password.' });
    }

    User.findOne({ email: email }, function(err, existingUser) {
      if (err) {
        return next(err);
      }

      if (existingUser) {
        return res.status(422).json({ error: 'That email already exists.' });
      }

      let user = new User(req.body);

      user.save(function(err, user) {
        if (err) {
          return next(err);
        }

        let userInfo = setUserInfo(req.user);

        res.status(201).json({
          token: 'JWT ' + generateToken(userInfo),
          user: userInfo,
        });
      });
    });
  },
};
