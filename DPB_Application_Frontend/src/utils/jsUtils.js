import {BASE_URL} from '../services/web-service';
import {API_ID, GET_OTHER_DATA, MAX_LEN_OF_NAME, PROD_URL} from './constants';
import {DEFAULT_WELCOME_QUOTE} from './content';
import {logger} from './utils';

export const getVisibleFullName = fullname => {
  return `${fullname?.substring(0, MAX_LEN_OF_NAME)}${
    fullname?.length > MAX_LEN_OF_NAME ? '...' : ''
  }`;
};

export async function getWelcomeQuote() {
  try {
    const welcomeQuote = await fetch(
      `${BASE_URL}${GET_OTHER_DATA}?key=WELCOME_QUOTES`,
    )
      .then(res => res.json())
      .catch(err => logger("Error while fetching Creator's quote", err));
    if (welcomeQuote && welcomeQuote.value) {
      return welcomeQuote.value;
    } else {
      return DEFAULT_WELCOME_QUOTE;
    }
  } catch (error) {
    logger('Error in getWelcomeQuote();', error);
  }
}
