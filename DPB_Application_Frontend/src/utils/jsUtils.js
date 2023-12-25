import {MAX_LEN_OF_NAME} from './constants';

export const getVisibleFullName = fullname => {
  return `${fullname?.substring(0, MAX_LEN_OF_NAME)}${
    fullname?.length > MAX_LEN_OF_NAME ? '...' : ''
  }`;
};

export async function getWelcomeQuote() {
  const welcomeQuote = await fetch(
    'https://api.quotable.io/random?tags=famous-quotes&maxLength=48',
  ).then(res => res.json());
  if(welcomeQuote?.content){
  // logger('welcomeQuote:', welcomeQuote);
  return ['Baba Ranchod Das - ', welcomeQuote.content];
  } else {
    ['Never Forget.','Yes. You are Unstoppable!']
  }
}
