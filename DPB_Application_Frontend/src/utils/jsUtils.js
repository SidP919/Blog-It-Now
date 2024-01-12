import {API_ID, GET_OTHER_DATA, MAX_LEN_OF_NAME, PROD_URL} from './constants';
import {DEFAULT_CREATOR_QUOTE} from './content';
import {logger} from './utils';

export const getVisibleFullName = fullname => {
  return `${fullname?.substring(0, MAX_LEN_OF_NAME)}${
    fullname?.length > MAX_LEN_OF_NAME ? '...' : ''
  }`;
};

export async function getWelcomeQuote() {
  try {
    const welcomeQuote = await fetch(
      'https://api.quotable.io/random?tags=famous-quotes&maxLength=48',
    )
      .then(res => res.json())
      .catch(err => logger('Error while fetching Welcome quote', err));
    if (welcomeQuote?.content) {
      return ['Baba Ranchod Das - ', welcomeQuote.content];
    } else {
      return ['Baba Ranchod Das - ', DEFAULT_CREATOR_QUOTE];
    }
  } catch (error) {
    logger('Error in getWelcomeQuote()', error);
  }
}

export async function getCreatorQuote() {
  try {
    const creatorQuote = await fetch(
      `${PROD_URL}${API_ID}${GET_OTHER_DATA}?key=CREATOR_QUOTE`,
    )
      .then(res => res.json())
      .catch(err => logger("Error while fetching Creator's quote", err));
    if (creatorQuote) {
      return creatorQuote.value;
    } else {
      return DEFAULT_CREATOR_QUOTE;
    }
  } catch (error) {
    logger('Error in getCreatorQuote();', error);
  }
}
