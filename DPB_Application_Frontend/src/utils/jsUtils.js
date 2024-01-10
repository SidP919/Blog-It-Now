import {API_ID, GET_OTHER_DATA, MAX_LEN_OF_NAME, PROD_URL} from './constants';
import {DEFAULT_CREATOR_QUOTE} from './content';
import {logger} from './utils';

export const getVisibleFullName = fullname => {
  return `${fullname?.substring(0, MAX_LEN_OF_NAME)}${
    fullname?.length > MAX_LEN_OF_NAME ? '...' : ''
  }`;
};

export async function getWelcomeQuote() {
  const welcomeQuote = await fetch(
    'https://api.quotable.io/random?tags=famous-quotes&maxLength=48',
  ).then(res => res.json());
  if (welcomeQuote?.content) {
    // logger('welcomeQuote:', welcomeQuote);
    return ['Baba Ranchod Das - ', welcomeQuote.content];
  } else {
    ['Baba Ranchod Das - ', 'Never Forget. Yes. You are Unstoppable!'];
  }
}

export async function getCreatorQuote() {
  try {
    const creatorQuote = await fetch(
      `${PROD_URL}${API_ID}${GET_OTHER_DATA}?key=CREATOR_QUOTE`,
    ).then(res => res.json());
    if (creatorQuote) {
      return creatorQuote.value;
    } else {
      return DEFAULT_CREATOR_QUOTE;
    }
  } catch (error) {
    console.error(error);
  }
}
