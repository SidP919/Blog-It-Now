import InterRegular from '../assets/fonts/Inter-Regular.ttf';
import InterBold from '../assets/fonts/Inter-Bold.ttf';
import InterMedium from '../assets/fonts/Inter-Medium.ttf';
import InterSemiBold from '../assets/fonts/Inter-SemiBold.ttf';
import InterBlack from '../assets/fonts/Inter-Black.ttf';
import InterExtraBold from '../assets/fonts/Inter-ExtraBold.ttf';
import InterExtraLight from '../assets/fonts/Inter-ExtraLight.ttf';
import InterLight from '../assets/fonts/Inter-Light.ttf';
import InterThin from '../assets/fonts/Inter-Thin.ttf';
import {isWeb} from './utils';

export const FONT_INTER_REGULAR = !isWeb ? 'Inter-Regular' : InterRegular;
export const FONT_INTER_BOLD = !isWeb ? 'Inter-Bold' : InterBold;
export const FONT_INTER_MEDIUM = !isWeb ? 'Inter-Medium' : InterMedium;
export const FONT_INTER_SEMIBOLD = !isWeb ? 'Inter-SemiBold' : InterSemiBold;
export const FONT_INTER_BLACK = !isWeb ? 'Inter-Black' : InterBlack;
export const FONT_INTER_EXTRABOLD = !isWeb ? 'Inter-ExtraBold' : InterExtraBold;
export const FONT_INTER_EXTRALIGHT = !isWeb
  ? 'Inter-ExtraLight'
  : InterExtraLight;
export const FONT_INTER_LIGHT = !isWeb ? 'Inter-Light' : InterLight;
export const FONT_INTER_THIN = !isWeb ? 'Inter-Thin' : InterThin;
