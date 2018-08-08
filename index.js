const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');

const { PORT } = require('./config');

const app = express();

require('./models/db');

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json'
  );
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('short'));
} else {
  app.use(morgan('dev'));
}

const Authentication = require('./controllers/auth');
const routes = require('./routes');

app.use('/api', Authentication.protectRoute, routes);

/**
 * Authentication Routes
 */

require('./auth');
const requireSignin = passport.authenticate('local', { session: false });

app.post('/signin', requireSignin, Authentication.signin);
app.post('/signup', Authentication.signup);

app.post('/login/facebook', Authentication.signinFB);
app.post('/login/google', Authentication.signinGoogle);

/* eslint-disable-next-line no-console */
app.listen(PORT, () => console.log(`Server running on http://locahost:${PORT}`));
