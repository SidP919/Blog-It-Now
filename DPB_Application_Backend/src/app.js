const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const ENV_CONSTANTS = require("./constants/config.contants");

// Array of allowed origins
const corsOriginArr = [ENV_CONSTANTS.CLIENT_URL, ENV_CONSTANTS.CLIENT_APP_URL];

const corsOptions = {
  origin: function (origin, callback) {
    if (isOriginAllowed(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET','POST','DELETE','PUT'],
  exposedHeaders: ['Authorization'],
};

function isOriginAllowed(origin) {
  // Check if the origin is in the allowed array or matches the Android app criteria
  return true;
  // (
  //   corsOriginArr.includes(origin) || // Check against the array of allowed origins
  //   (origin && origin.includes('Android')) // Check if the origin contains "Android"
  // );
}

// Middlewares:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());
// Setting up Morgan middleware
app.use(
  morgan("combined", {
    skip: function (req, res) {
      if (ENV_CONSTANTS.NODE_ENV === "production")
        // check if App is running in PROD env
        return (
          res.statusCode < 400
        ); // skip request that sends response with statusCode < 400 (only log errors)
      else return; // don't skip anything (log everything)
    },
    // immediate:true, // logs when request is received instead of when response is sent to client. This means that a requests will be logged even if the server crashes, but data from the response (like response code, content length, etc.) will not be logged.
  })
);

// Routes
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogsRoutes");
const otherDataRoutes = require("./routes/otherDataRoutes");

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/blogs", blogRoutes);
app.use("/api/v1/otherData", otherDataRoutes);

module.exports = app;