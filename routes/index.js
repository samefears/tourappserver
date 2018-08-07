const passport = require('passport');
const router = require('express').Router();

// require('../auth');
const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

// require('./user')(router);
require('./band')(router, requireAuth);
require('./venue')(router, requireAuth);
require('./tour')(router, requireAuth);
require('./show')(router, requireAuth);
require('./auth')(router, requireLogin);

module.exports = router;
