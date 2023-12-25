const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const ENV_CONSTANTS = require("./constants/config.contants");

const corsOptions = {
  origin: [ENV_CONSTANTS.CLIENT_URL, ENV_CONSTANTS.CLIENT_APP_URL],
  exposedHeaders: ['Authorization'],
};

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