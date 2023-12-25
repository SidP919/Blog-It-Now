const app = require("./src/app");
const configConstants = require("./src/constants/config.contants");
const mongoose = require("mongoose");
const { logger } = require("./src/utils/logger");

(async () => {
  try {
    //Set up mongoose connection to MongoDB Atlas Database
    await mongoose
      .connect(configConstants.MONGODB_URI)
      .then((db) => {
        logger(`Application connected to MongoDB successfully.`);
      })
      .catch((error) => {
        logger("\nConnection to MongoDB failed!");
        throw error;
      });
    app.on("error", (err) => {
      logger("\nError thrown from app.on(): ", err);
      throw err;
    });

    // setup application to listen at configConstants.PORT
    const PORT = configConstants.PORT;
    const listenFunc = () => {
      logger(`Server running on Port:${PORT}`);
    };
    app.listen(PORT, listenFunc);
  } catch (err) {
    logger("\nError occurred!\n", err);
    throw err;
  }
})();
