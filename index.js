const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const cors = require('cors');

const { PORT } = require('./config');

const app = express();

require('./models/db');

const corsMiddleware = cors({
  origin: [
    process.env.CLIENT_URI,
    /https:\/\/(.)+--tourdevapp.netlify.com/,
    'http://localhost:1234'
  ],
});

app.use(corsMiddleware);
app.options('*', corsMiddleware);
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
