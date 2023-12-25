require("dotenv").config();

const AUTH_CONSTANTS = Object.freeze({
  JWT_AUTH_SECRET: process.env.AUTH_JWT_SECRET, // The jwtSecret is a secret key used for JWT token generation and verification.
  JWT_EXPIRY_TIME: process.env.EXPIRATION_TIME, // The jwtExpiration specifies the token expiration time.
});

module.exports = AUTH_CONSTANTS;
