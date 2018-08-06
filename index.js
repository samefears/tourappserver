const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const { PORT } = require('./config');
const { checkForAuth } = require('./middlewares');

const app = express();

require('./models/db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials'
  );
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('short'));
} else {
  app.use(morgan('dev'));
}

const routes = require('./routes');

app.use('/api', routes);

/* eslint-disable-next-line no-console */
app.listen(PORT, () => console.log(`Server running on http://locahost:${PORT}`));
