/**
 * Check for User Auth
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */
module.exports.checkForAuth = (req, res, next) => {
  /* eslint-disable-next-line no-console */
  console.log('logging for auth');
  next();
};
