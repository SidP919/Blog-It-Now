import {isMobileOnly, isTablet} from 'react-device-detect';
import {Dimensions, Linking, Platform} from 'react-native';
import {isProduction, showCustomAlert} from '../services/web-service';
import {GENERIC_ALERT_TITLE, UNSUPPORTED_LINK_MSG} from './content';

// check if the app is running on an Android, iOS or a web-browser
export const isWeb = Platform.OS === 'web';
export const isAndroid = Platform.OS === 'android';
export const isIOS = Platform.OS === 'ios';
export const isMobileNative = isAndroid || isIOS;
export const isNotDesktopWeb = isWeb && (isMobileOnly || isTablet); // App running inside browser on Mobile or Tablet
export const isDesktopWeb = isWeb && !(isMobileOnly || isTablet); // App running inside browser on Mobile or Tablet
export const isMobileWeb = isWeb && isMobileOnly; // App running inside browser on Mobile

//returns window width and height
export const getWidth = () => Dimensions.get('window').width;
export const getHeight = () => Dimensions.get('window').height - 1;

// returns true if app is in Landscape Mode
export function ifLandscapeMode() {
  const {width, height} = Dimensions.get('window');
  return width > height;
}

// A sanity check or an attempt to ensure
// window resizing to smaller screen sizes
// doesn't get considered as a large device.
function isLargeDeviceSanityCheck() {
  return (
    Math.max(getWidth(), getHeight()) > 956 &&
    Math.min(getWidth(), getHeight()) > 320
  );
}

// returns true if app is in Landscape Mode
export function ifMobileDevice() {
  if (isWeb) {
    return !ifWebLargeLandscapeMode() && !isTablet;
  } else {
    return !ifNativeLandscapeMode();
  }
}

// returns true if app is running in a web-browser on a large device like Tablet/Desktop/Laptop in Landscape Mode
export function ifWebLargeLandscapeMode() {
  const {width, height} = Dimensions.get('window');
  return isWeb && !isMobileOnly && width > height && isLargeDeviceSanityCheck();
}

// returns true if app is running in a web-browser on a Mobile device in Landscape Mode
export function ifWebSmallLandscapeMode() {
  const {width, height} = Dimensions.get('window');
  return (
    isWeb && isMobileOnly && Math.max(width, height) > 450 && width > height
  );
}

// returns true if app is running on Tablet device
export function ifTablet() {
  return isTablet || ifNativeLandscapeMode();
}

// returns true if app is running on Tablet in LandscapeMode
export function ifTabletLandscapeMode() {
  return ifLandscapeMode() && (isTablet || ifNativeLandscapeMode());
}

// returns true if app is running in a web-browser on a Tablet device in Portrait Mode
export function ifWebTabletPortraitMode() {
  const {width, height} = Dimensions.get('window');
  return isWeb && isTablet && width < height;
}

// returns true if app is running in a native-environment(not a web-browser)
// on Android/iOS devices in Landscape Mode
export function ifNativeLandscapeMode() {
  const {width, height} = Dimensions.get('window');
  return !isWeb && width > height;
}

// Use in place of console.log():
export function logger(title = 'Logging', ...data) {
  isProduction
    ? null
    : data?.length > 0
    ? (() => {
        console.log(`==== ${title} === started ===>`);
        data.map(item => console.log(item));
        console.log(`==== ${title} === ended ===>`);
        console.log('\n');
        console.log('\n');
      })()
    : (() => {
        console.log(`<====== ${title} ======>`);
        console.log('\n');
        console.log('\n');
      })();
}

/**
 * @Size_Functions : bigSize(), mdSize(), smSize(), mdText(), smText():
 * NOTE: Below provided size functions are being used for both
 * Text and Img Elements so beware before making changes in their definitions.
 *
 * @returns different size value for small and bigger devices
 */
export const bigSize = () => {
  return (!ifWebLargeLandscapeMode() &&
    !isTablet &&
    !ifNativeLandscapeMode()) ||
    !isLargeDeviceSanityCheck() // isSmallerDevice
    ? 24
    : 32;
};
export const mdSize = () => {
  return (!ifWebLargeLandscapeMode() &&
    !isTablet &&
    !ifNativeLandscapeMode()) ||
    !isLargeDeviceSanityCheck() // isSmallerDevice
    ? 18
    : 24;
};
export const smSize = () => {
  return (!ifWebLargeLandscapeMode() &&
    !isTablet &&
    !ifNativeLandscapeMode()) ||
    !isLargeDeviceSanityCheck() // isSmallerDevice
    ? 16
    : 22;
};
export const mdText = () => {
  return (!ifWebLargeLandscapeMode() &&
    !isTablet &&
    !ifNativeLandscapeMode()) ||
    !isLargeDeviceSanityCheck() // isSmallerDevice
    ? 14
    : 20;
};
export const smText = () => {
  return (!ifWebLargeLandscapeMode() &&
    !isTablet &&
    !ifNativeLandscapeMode()) ||
    !isLargeDeviceSanityCheck() // isSmallerDevice
    ? 10
    : 14;
};

// for opening links on web & native devices
export const openLink = async url => {
  const supported = await Linking.canOpenURL(url);

  if (supported) {
    await Linking.openURL(url);
  } else {
    showCustomAlert(GENERIC_ALERT_TITLE, UNSUPPORTED_LINK_MSG, GENERIC);
    console.error(UNSUPPORTED_LINK_MSG + ': ' + url);
  }
};

export const refineUnknownData = data => {
  if (Array.isArray(data) && data.length > 0) {
    return data[0];
  } else {
    return data;
  }
};

//callbackType values for Alert:
export const EXIT_APP = 'EXIT_APP';
export const LOG_OUT = 'LOG_OUT';
export const GENERIC = 'GENERIC';
export const INVALID_USER = 'INVALID_USER';
export const CB_TYPES_WITH_CANCEL = [EXIT_APP, LOG_OUT];
