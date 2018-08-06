const passport = require('passport');
const User = require('../models/User');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const { LOGIN_SECRET } = require('../config');

const localOptions = { usernameField: 'email' };

const jwtOptions = {
  // Telling Passport to check authorization headers for JWT
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
  // Telling Passport where to find the secret
  secretOrKey: LOGIN_SECRET,
};

const localLogin = new LocalStrategy(localOptions, (email, password, next) => {
  User.findOne({ email }, (err, user) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return next(null, false, {
        error: 'Your login details could not be verified. Please try again.',
      });
    }

    user.comparePassword(password, function(err, isMatch) {
      if (err) {
        return next(err);
      }

      if (!isMatch) {
        return next(null, false, {
          error: 'Your login details could not be verified. Please try again.',
        });
      }

      return next(null, user);
    });
  });
});

const jwtLogin = new JwtStrategy(jwtOptions, function(payload, next) {
  User.findById(payload._id, function(err, user) {
    if (err) {
      return next(err, false);
    }

    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
  });
});

passport.use(jwtLogin);
passport.use(localLogin);
