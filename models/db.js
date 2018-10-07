const mongoose = require('mongoose');

const { DB } = require('../config');

const PROD = process.env.NODE_ENV === 'production';

let DBuri = `mongodb://${DB.URI}/${DB.name}`;

if (PROD) {
  DBuri = `mongodb://${DB.user}:${DB.pass}@${DB.URI}/${DB.name}`;
}
mongoose.connect(
  DBuri,
  { useNewUrlParser: true }
);
const db = mongoose.connection;

/* eslint-disable-next-line no-console */
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  /* eslint-disable-next-line no-console */
  console.log(`MongoDB connected at ${DB.URI}/${DB.name}`);
});

module.exports = db;
