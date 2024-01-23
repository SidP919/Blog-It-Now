import {BASE_URL} from '../services/web-service';
import {API_ID, GET_OTHER_DATA, MAX_LEN_OF_NAME, PROD_URL} from './constants';
import {DEFAULT_WELCOME_QUOTE} from './content';
import {logger} from './utils';

export const getVisibleFullName = fullname => {
  return `${fullname?.substring(0, MAX_LEN_OF_NAME)}${
    fullname?.length > MAX_LEN_OF_NAME ? '...' : ''
  }`;
};

export async function fetchWelcomeQuote() {
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

export function getPrettyNumber(value) {
  if (value < 1000) {
    return value.toString();
  } else if (value < 1000000) {
    return (value / 1000).toFixed(2) + ' K';
  } else if (value < 1000000000) {
    return (value / 1000000).toFixed(2) + ' M';
  } else {
    return (value / 1000000000).toFixed(2) + ' B';
  }
}

export function formattedDate(inputDate) {
  return new Date(inputDate).toLocaleDateString(['en-GB', 'en-US'], {
    day: 'numeric',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'shortGeneric',
  });
}
