const user = require('../controllers/user');

module.exports = (router) => {
  // Get all users
  router.get('/users', user.getAll);

  // Get user by ID
  router.get('/user/:id', user.getById);

  // Delete user by ID
  // router.delete('/user/:id', user.deleteUser);

  // Create new User
  router.post('/user/new', user.createNew);
};
