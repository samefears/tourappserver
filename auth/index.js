const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');

const User = require('../models/User');

const { LOGIN_SECRET } = require('../config');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    User.authenticate()
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: LOGIN_SECRET,
    },
    (jwtPayload, cb) => {
      return User.findById(jwtPayload.id)
        .then((user) => cb(null, user))
        .catch((err) => cb(err));
    }
  )
);

module.exports = passport;
