require("dotenv").config();

const ENV_CONSTANTS = Object.freeze({
  APP_NAME: process.env.APP_NAME,
  APP_EMAIL: process.env.APP_EMAIL,
  WELCOME_MSG: process.env.WELCOME_MSG,
  MONGODB_URI: process.env.MONGODB_URI,
  MONGODB_OPTIONS: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 4000,
  CLIENT_NAME: process.env.CLIENT_NAME,
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000/',
  CLIENT_APP_URL: process.env.CLIENT_APP_URL || 'http://localhost:8081',
  EMAIL_HOST: process.env.EMAIL_HOST,
  EMAIL_SERVICE_NAME: process.env.EMAIL_SERVICE_NAME,
  EMAIL_USERNAME: process.env.EMAIL_USERNAME,
  FROM_EMAIL: process.env.FROM_EMAIL,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  EMAIL_PORT: process.env.EMAIL_PORT,
  EMAIL_VERIFICATION_EXPIRY: parseInt(process.env.EMAIL_VERIFICATION_EXPIRY, 10),
});

module.exports = ENV_CONSTANTS;
