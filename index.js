const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const { PORT } = require('./config');
const { checkForAuth } = require('./middlewares');

const app = express();

require('./models/db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

if (process.env.NODE_ENV === 'production') {
  app.use(morgan('short'));
} else {
  app.use(morgan('dev'));
}

const routes = require('./routes');

app.use('/api', checkForAuth, routes);

/* eslint-disable-next-line no-console */
app.listen(PORT, () => console.log(`Server running on http://locahost:${PORT}`));
