const jwt = require('jwt-simple');
const User = require('../models/user');
const moment = require('moment');
const { LOGIN_SECRET } = require('../config');

function tokenForUser(user) {
  const timestamp = moment()
    .add(1, 'months')
    .unix();
  return jwt.encode({ userId: user.id, iat: timestamp }, LOGIN_SECRET);
}

exports.validate = function(token) {
  if (!token) {
    throw new Error('Token was not provided');
  }
  const decoded = jwt.decode(token, LOGIN_SECRET);
  return User.findById(decoded.userId, function(err, user) {
    if (err) {
      throw new Error('User not found');
    }

    return user;
  });
};

exports.protectRoute = function(req, res, next) {
  if (!req.headers.token) {
    return res.status(422).send({ error: 'You must be logged in' });
  }

  let decoded;
  try {
    decoded = jwt.decode(req.headers.token, LOGIN_SECRET);
  } catch (err) {
    return res.status(422).send({ error: 'You must be logged in' });
  }

  const now = moment()
    .add(1, 'months')
    .unix();
  const timestamp = decoded.iat;

  if (timestamp > now) {
    return res.status(422).send({ error: 'You must be logged in' });
  }

  return User.findById(decoded.userId, function(err) {
    if (err) {
      return res.status(422).send({ error: 'You must be logged in' });
    }

    next();
  });
};

exports.signin = function(req, res) {
  res.send({
    token: tokenForUser(req.user),
    id: req.user.id,
    firstName: req.user.firstName,
    lastName: req.user.lastName,
  });
};

exports.signup = function(req, res, next) {
  const { email, password, firstName, lastName } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide an email and password' });
  }

  if (!firstName || !lastName) {
    return res.status(422).send({ error: 'You must provide your name' });
  }

  User.findOne({ email: email }, function(err, existingUser) {
    if (err) {
      return next(err);
    }

    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    const user = new User(req.body);

    user.save(function(err) {
      if (err) {
        return next(err);
      }

      res.json({
        token: tokenForUser(user),
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
      });
    });
  });
};

exports.signinFB = function(req, res, next) {
  const email = req.body.email;
  const id = req.body.id;
  const accessToken = req.body.accessToken;
  const name = req.body.name;
  if (!email || !id) {
    return res.status(422).send({ error: 'You must provide an email and id' });
  }

  User.findOne({ email: email }, function(err, user) {
    if (err) {
      return next(err);
    }

    if (!user) {
      const newUser = new User({
        email: email,
        facebook: {
          email: email,
          fbid: id,
          accessToken: accessToken,
          name: name,
        },
      });

      newUser.save(function(err) {
        if (err) {
          return next(err);
        }

        res.json({
          token: tokenForUser(newUser),
          id: newUser.id,
          name: newUser.facebook.name,
        });
      });
    } else {
      user.facebook.email = email;
      user.facebook.fbid = id;
      user.facebook.accessToken = accessToken;
      user.facebook.name = name;
      user.save();
      res.json({
        token: tokenForUser(user),
        id: user.id,
        name: user.facebook.name,
      });
    }
  });
};

exports.signinGoogle = function(req, res, next) {
  const email = req.body.email;
  const id = req.body.id;
  const accessToken = req.body.accessToken;
  const name = req.body.name;
  if (!email || !id) {
    return res.status(422).send({ error: 'You must provide an email and id' });
  }

  User.findOne({ email: email }, function(err, user) {
    if (err) {
      return next(err);
    }

    if (!user) {
      const newUser = new User({
        email: email,
        google: {
          email: email,
          googleid: id,
          accessToken: accessToken,
          name: name,
        },
      });

      newUser.save(function(err) {
        if (err) {
          return next(err);
        }

        res.json({
          token: tokenForUser(newUser),
          id: newUser.id,
          name: newUser.google.name,
        });
      });
    } else {
      user.google.email = email;
      user.google.googleid = id;
      user.google.accessToken = accessToken;
      user.google.name = name;
      user.save();
      res.json({
        token: tokenForUser(user),
        id: user.id,
        name: user.google.name,
      });
    }
  });
};
