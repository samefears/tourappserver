const router = require('express').Router();

require('./group')(router);
require('./venue')(router);
require('./tour')(router);
require('./event')(router);

module.exports = router;
