const ENV_CONSTANTS = require("../constants/config.contants");

const isProduction = ENV_CONSTANTS.NODE_ENV === 'production';
// Use in place of console.log():
function logger(title = 'Logging', ...data) {
  isProduction
    ? null
    : data?.length > 0
    ? (() => {
        console.log(`==== ${title} === starts ===>`);
        data.map(item => console.log(item));
        console.log(`==== ${title} === ends ===>`);
        console.log('\n');
        console.log('\n');
      })()
    : (() => {
        console.log(`<====== ${title} ======>`);
        console.log('\n');
        console.log('\n');
      })();
}

module.exports = {logger};