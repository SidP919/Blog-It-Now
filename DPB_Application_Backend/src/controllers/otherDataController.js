const OtherData = require("../models/otherDataSchema.js");
const { logger } = require("../utils/logger.js");

/****************************************************************************************
 * @GET_OTHER_DATA
 * @route http://localhost:4000/api/v1/otherData/getData
 * @requestType GET
 * @description Get Other Data Controller which sends the requested data to client
 * @parameters key
 * @returns JSON object( containing response message, value of the key)
 **************************************************************************************/
const getOtherData = async function (req, res) {
  try {
    const { key } = req.query;
    if (!key) {
      return res.status(400).json({
        success: false,
        message: `Mandatory data hasn't been sent in the request!`,
      });
    }
    const data = await OtherData.findOne({ key });
    if (!data) {
      return res.status(400).json({
        success: false,
        message: `No such key exists in the database!`,
      });
    }

    if (key === "WELCOME_QUOTES") {
      const welcomeQuotesArr = data.value?.split(" | ");
      const randomIndex =
        welcomeQuotesArr.length > 0
          ? Math.round(Math.random() * welcomeQuotesArr.length - 1)
          : null;
      const welcomeQuote = welcomeQuotesArr[randomIndex];
      return res.status(200).json({
        success: true,
        message: `Fetched data successfully from the database!`,
        value: `❝ ${welcomeQuote.replace(" – ", `❞ – `)}`,
      });
    }

    return res.status(200).json({
      success: true,
      message: `Fetched data successfully from the database!`,
      value: data.value,
    });
  } catch (error) {
    logger("Error 405: ", error);
    res.status(405).json({
      success: false,
      message: `Oops! something went wrong on the server side while retrieving the otherData.`,
    });
  }
};

/****************************************************************************************
 * @CREATE_OTHER_DATA
 * @route http://localhost:4000/api/v1/otherData/createData
 * @requestType POST
 * @description Create Other Data Controller which can only be used by Admin to create new data in the DB
 * @parameters key, value
 * @returns JSON object( containing response message)
 **************************************************************************************/
const createOtherData = async function (req, res) {
  try {
    const { key, value } = req.body;
    if (!key || !value) {
      return res.status(400).json({
        success: false,
        message: `Mandatory data hasn't been sent in the request!`,
      });
    }
    const existingData = await OtherData.findOne({ key });
    if (existingData) {
      return res.status(400).json({
        success: false,
        message: `This key already exists in the database!`,
      });
    }
    const data = await OtherData.create({
      key,
      value,
    });
    return res.status(200).json({
      success: true,
      message: `Data has been Created successfully.`,
    });
  } catch (error) {
    logger("Error 405: ", error);
    res.status(405).json({
      success: false,
      message: `Oops! something went wrong on the server side while creating new otherData.`,
    });
  }
};

module.exports = {
  getOtherData,
  createOtherData,
};
