const { generateFromEmail } = require("unique-username-generator");

const getUniqueUsername = (email, noOfDigits) => { //abc1233@xy.com // abc1233@yz.com
  return generateFromEmail(email, noOfDigits);
};

module.exports = getUniqueUsername;
