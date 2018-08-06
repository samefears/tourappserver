const auth = require('../controllers/auth');

module.exports = (router) => {
  // Get all bands
  router.post('/auth/register', auth.register);
  router.post('/auth/login', auth.login);
};
