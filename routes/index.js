const router = require('express').Router();

require('./user')(router);
require('./band')(router);
require('./venue')(router);
require('./tour')(router);
require('./show')(router);

module.exports = router;
