require("dotenv").config();

const ENV_CONSTANTS = Object.freeze({
  APP_NAME: process.env.APP_NAME || 'Blog It Now',
  APP_EMAIL: process.env.APP_EMAIL || 'abc@xyz.com',
  WELCOME_MSG: process.env.WELCOME_MSG,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017',
  MONGODB_OPTIONS: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 4000,
  CLIENT_NAME: process.env.CLIENT_NAME || 'Abcd Efgh',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000/',
  CLIENT_APP_URL: process.env.CLIENT_APP_URL || 'http://localhost:8081',
  EMAIL_HOST: process.env.EMAIL_HOST || 'smtp.gmail.com',
  EMAIL_SERVICE_NAME: process.env.EMAIL_SERVICE_NAME || 'gmail',
  EMAIL_USERNAME: process.env.EMAIL_USERNAME || 'abc@xyz.com',
  FROM_EMAIL: process.env.FROM_EMAIL || 'abc@xyz.com',
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD || 'password',
  EMAIL_PORT: process.env.EMAIL_PORT || 465,
  EMAIL_VERIFICATION_EXPIRY: parseInt(process.env.EMAIL_VERIFICATION_EXPIRY || 3, 10),
});

module.exports = ENV_CONSTANTS;
