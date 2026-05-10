const app = require("./src/app");
const configConstants = require("./src/constants/config.constants");
const mongoose = require("mongoose");
const { logger } = require("./src/utils/logger");

(async () => {
  try {
    //Set up mongoose connection to MongoDB Atlas Database
    await mongoose.connect(configConstants.MONGODB_URI);
    logger(`Application connected to MongoDB successfully.`);
    
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
    logger("\nConnection to MongoDB failed!\n", err);
    process.exit(1);
  }
})();
