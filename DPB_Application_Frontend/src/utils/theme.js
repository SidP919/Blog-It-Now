export const colorProfiles = {
  PURPLE: {
    LIGHT_PRIMARY: '#8729fd',
    DARK_PRIMARY: '#5e10bc',
    LIGHT_SECONDARY: '#eee1ff',
    DARK_SECONDARY: '#2c0c56',
    TEXT_PRIMARY: '#ffffcf',
    LIGHT_TEXT_PRIMARY: '#2c0c56',
    LIGHT_TEXT_SECONDARY: '#758283',
    DARK_TEXT_SECONDARY: '#cad5e2',
    LIGHT_LINK_PRIMARY: '#6e00ff',
    DARK_LINK_PRIMARY: '#c697ff',
    DANGER: '#ff0000',
    SUCCESS: '#046A38',
  },
  ORANGE: {
    LIGHT_PRIMARY: '#ff8f00',
    DARK_PRIMARY: '#ff6f00',
    LIGHT_SECONDARY: '#fffce2',
    DARK_SECONDARY: '#913f00',
    TEXT_PRIMARY: '#ffffff',
    LIGHT_TEXT_PRIMARY: '#913f00',
    LIGHT_TEXT_SECONDARY: '#758283',
    DARK_TEXT_SECONDARY: '#cad5e2',
    LIGHT_LINK_PRIMARY: '#ffc107',
    DARK_LINK_PRIMARY: '#ffe082',
    DANGER: '#ff0000',
    SUCCESS: '#046A38',
  },
};

// NOTE: use "Color Highlight by Sergii N" extension in VS Code
// to get a better comparison at the colors being used
// for different modes & themes.
export const getColors = appColor => ({
  main: {
    LIGHT: colorProfiles[appColor].LIGHT_PRIMARY, // '#8729fd', '#ff8f00'
    DARK: colorProfiles[appColor].DARK_PRIMARY, // '#5e10bc', '#ff6f00'
  },
  bgColor: {
    LIGHT: colorProfiles[appColor].LIGHT_SECONDARY, // '#eee1ff', '#fffce2'
    DARK: colorProfiles[appColor].DARK_SECONDARY, // '#2c0c56', '#913f00'
  },
  headerTitle: {
    LIGHT: colorProfiles[appColor].TEXT_PRIMARY, // '#ffffcf', '#ffffff'
    DARK: colorProfiles[appColor].TEXT_PRIMARY, // '#ffffcf', '#ffffff'
  },
  headerLogo: {
    LIGHT: colorProfiles[appColor].TEXT_PRIMARY, // '#ffffcf', '#ffffff'
    DARK: colorProfiles[appColor].TEXT_PRIMARY, // '#ffffcf', '#ffffff'
  },
  sideBarHeaderLogo: {
    LIGHT: colorProfiles[appColor].LIGHT_PRIMARY, // '#8729fd', '#ff8f00'
    DARK: colorProfiles[appColor].TEXT_PRIMARY, // '#ffffcf', '#ffffff'
  },
  sideBarItemLogo: {
    LIGHT: colorProfiles[appColor].TEXT_PRIMARY, // '#ffffcf', '#ffffff'
    DARK: colorProfiles[appColor].TEXT_PRIMARY, // '#ffffcf', '#ffffff'
  },
  title: {
    LIGHT: colorProfiles[appColor].LIGHT_PRIMARY, // '#8729fd', '#ff8f00'
    DARK: colorProfiles[appColor].TEXT_PRIMARY, // '#ffffcf', '#ffffff'
  },
  mdTitle: {
    LIGHT: colorProfiles[appColor].DARK_PRIMARY, // '#5e10bc', '#ff6f00'
    DARK: colorProfiles[appColor].TEXT_PRIMARY, // '#ffffcf', '#ffffff'
  },
  text: {
    LIGHT: colorProfiles[appColor].LIGHT_TEXT_PRIMARY, // '#2c0c56', '#913f00'
    DARK: colorProfiles[appColor].TEXT_PRIMARY, // '#ffffcf', '#ffffff'
  },
  placeHolderText: {
    LIGHT: colorProfiles[appColor].LIGHT_TEXT_SECONDARY, // '#758283', '#cad5e2'
    DARK: colorProfiles[appColor].DARK_TEXT_SECONDARY, // '#758283', '#cad5e2'
  },
  btnBgColor: {
    LIGHT: colorProfiles[appColor].TEXT_PRIMARY, // '#ffffcf', '#ffffff'
    DARK: colorProfiles[appColor].DARK_SECONDARY, // '#2c0c56', '#913f00'
  },
  btnText: {
    LIGHT: colorProfiles[appColor].DARK_PRIMARY, // '#5e10bc', '#ff6f00'
    DARK: colorProfiles[appColor].TEXT_PRIMARY, // '#ffffcf', '#ffffff'
  },
  border: {
    LIGHT: colorProfiles[appColor].DARK_PRIMARY, // '#5e10bc', '#ff6f00'
    DARK: colorProfiles[appColor].TEXT_PRIMARY, // '#ffffcf', '#ffffff'
  },
  activeItem: {
    LIGHT: colorProfiles[appColor].DARK_PRIMARY, // '#5e10bc', '#ff6f00'
    DARK: colorProfiles[appColor].LIGHT_PRIMARY, // '#8729fd', '#ff8f00'
  },
  thumbColor: {
    LIGHT: colorProfiles[appColor].DARK_PRIMARY, // '#5e10bc', '#ff6f00'
    DARK: colorProfiles[appColor].LIGHT_PRIMARY, // '#8729fd', '#ff8f00'
  },
  trackColor: {
    LIGHT: colorProfiles[appColor].LIGHT_TEXT_SECONDARY, // '#758283', '#cad5e2'
    DARK: colorProfiles[appColor].DARK_TEXT_SECONDARY, // '#758283', '#cad5e2'
  },
  alertBg: {
    LIGHT: colorProfiles[appColor].LIGHT_SECONDARY, // '#eee1ff', '#fffce2'
    DARK: colorProfiles[appColor].DARK_SECONDARY, // '#2c0c56', '#913f00'
  },
  alertTitle: {
    LIGHT: colorProfiles[appColor].DARK_PRIMARY, // '#5e10bc', '#ff6f00'
    DARK: colorProfiles[appColor].TEXT_PRIMARY, // '#ffffcf', '#ffffff'
  },
  alertMsg: {
    LIGHT: colorProfiles[appColor].DARK_PRIMARY, // '#5e10bc', '#ff6f00'
    DARK: colorProfiles[appColor].TEXT_PRIMARY, // '#ffffcf', '#ffffff'
  },
  alertBtnBg: {
    LIGHT: colorProfiles[appColor].LIGHT_PRIMARY, // '#8729fd', '#ff8f00'
    DARK: colorProfiles[appColor].DARK_PRIMARY, // '#5e10bc', '#ff6f00'
  },
  alertBtnText: {
    LIGHT: colorProfiles[appColor].TEXT_PRIMARY, // '#ffffcf', '#ffffff'
    DARK: colorProfiles[appColor].TEXT_PRIMARY, // '#ffffcf', '#ffffff'
  },
  alertBorder: {
    LIGHT: colorProfiles[appColor].DARK_PRIMARY, // '#5e10bc', '#ff6f00'
    DARK: colorProfiles[appColor].TEXT_PRIMARY, // '#ffffcf', '#ffffff'
  },
  linkColor: {
    LIGHT: colorProfiles[appColor].LIGHT_LINK_PRIMARY, // '#6e00ff', '#ffc107'
    DARK: colorProfiles[appColor].DARK_LINK_PRIMARY, // '#c697ff', '#ffe082'
  },
  cardBg: {
    LIGHT: colorProfiles[appColor].LIGHT_PRIMARY, // '#8729fd', '#ff8f00'
    DARK: colorProfiles[appColor].DARK_PRIMARY, // '#5e10bc', '#ff6f00'
  },
  cardText: {
    LIGHT: colorProfiles[appColor].TEXT_PRIMARY, // '#ffffcf', '#ffffff'
    DARK: colorProfiles[appColor].TEXT_PRIMARY, // '#ffffcf', '#ffffff'
  },
  inputView: {
    LIGHT: colorProfiles[appColor].TEXT_PRIMARY, // '#ffffcf', '#ffffff'
    DARK: colorProfiles[appColor].DARK_SECONDARY, // '#2c0c56', '#913f00'
  },
  inputIcon: {
    LIGHT: colorProfiles[appColor].DARK_PRIMARY, // '#5e10bc', '#ff6f00'
    DARK: colorProfiles[appColor].TEXT_PRIMARY, // '#ffffcf', '#ffffff'
  },
  inputText: {
    LIGHT: colorProfiles[appColor].DARK_PRIMARY, // '#5e10bc', '#ff6f00'
    DARK: colorProfiles[appColor].TEXT_PRIMARY, // '#ffffcf', '#ffffff'
  },
  iconOnBgColor: {
    LIGHT: colorProfiles[appColor].TEXT_PRIMARY, // '#ffffcf', '#ffffff'
    DARK: colorProfiles[appColor].TEXT_PRIMARY, // '#ffffcf', '#ffffff'
  },
  dotZeroColor: {
    LIGHT: colorProfiles[appColor].LIGHT_SECONDARY, // '#eee1ff', '#fffce2'
    DARK: colorProfiles[appColor].DARK_SECONDARY, // '#2c0c56', '#913f00'
  },
  dotOneColor: {
    LIGHT: colorProfiles[appColor].DARK_PRIMARY, // '#5e10bc', '#ff6f00'
    DARK: colorProfiles[appColor].TEXT_PRIMARY, // '#ffffcf', '#ffffff'
  },
  danger: {
    LIGHT: colorProfiles[appColor].DANGER, // '#ff0000', '#ff0000'
    DARK: colorProfiles[appColor].DANGER, // '#ff0000', '#ff0000'
  },
  dangerBtnText: {
    LIGHT: colorProfiles[appColor].TEXT_PRIMARY, // '#ffffcf', '#ffffff'
    DARK: colorProfiles[appColor].TEXT_PRIMARY, // '#ffffcf', '#ffffff'
  },
});
