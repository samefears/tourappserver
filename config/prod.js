module.exports = {
  DB: {
    URI: process.env.URI,
    name: process.env.DB_NAME,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
  },
  LOGIN_SECRET: process.env.LOGIN_SECRET,
  PORT: process.env.PORT,
};
