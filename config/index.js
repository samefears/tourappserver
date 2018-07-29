const PROD = process.env.NODE_ENV === 'producion';
module.exports = PROD ? require('./prod.js') : require('./dev.js');
