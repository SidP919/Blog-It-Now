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

export const getColors = appColor => ({
  main: {
    LIGHT: colorProfiles[appColor].LIGHT_PRIMARY,
    DARK: colorProfiles[appColor].DARK_PRIMARY,
  },
  bgColor: {
    LIGHT: colorProfiles[appColor].LIGHT_SECONDARY,
    DARK: colorProfiles[appColor].DARK_SECONDARY,
  },
  headerTitle: {
    LIGHT: colorProfiles[appColor].TEXT_PRIMARY,
    DARK: colorProfiles[appColor].TEXT_PRIMARY,
  },
  headerLogo: {
    LIGHT: colorProfiles[appColor].TEXT_PRIMARY,
    DARK: colorProfiles[appColor].TEXT_PRIMARY,
  },
  sideBarHeaderLogo: {
    LIGHT: colorProfiles[appColor].LIGHT_PRIMARY,
    DARK: colorProfiles[appColor].TEXT_PRIMARY,
  },
  sideBarItemLogo: {
    LIGHT: colorProfiles[appColor].TEXT_PRIMARY,
    DARK: colorProfiles[appColor].TEXT_PRIMARY,
  },
  title: {
    LIGHT: colorProfiles[appColor].LIGHT_PRIMARY,
    DARK: colorProfiles[appColor].TEXT_PRIMARY,
  },
  mdTitle: {
    LIGHT: colorProfiles[appColor].DARK_PRIMARY,
    DARK: colorProfiles[appColor].TEXT_PRIMARY,
  },
  text: {
    LIGHT: colorProfiles[appColor].LIGHT_TEXT_PRIMARY,
    DARK: colorProfiles[appColor].TEXT_PRIMARY,
  },
  placeHolderText: {
    LIGHT: colorProfiles[appColor].LIGHT_TEXT_SECONDARY,
    DARK: colorProfiles[appColor].DARK_TEXT_SECONDARY,
  },
  btnBgColor: {
    LIGHT: colorProfiles[appColor].TEXT_PRIMARY,
    DARK: colorProfiles[appColor].DARK_SECONDARY,
  },
  btnText: {
    LIGHT: colorProfiles[appColor].DARK_PRIMARY,
    DARK: colorProfiles[appColor].TEXT_PRIMARY,
  },
  border: {
    LIGHT: colorProfiles[appColor].DARK_PRIMARY,
    DARK: colorProfiles[appColor].TEXT_PRIMARY,
  },
  activeItem: {
    LIGHT: colorProfiles[appColor].DARK_PRIMARY,
    DARK: colorProfiles[appColor].LIGHT_PRIMARY,
  },
  thumbColor: {
    LIGHT: colorProfiles[appColor].DARK_PRIMARY,
    DARK: colorProfiles[appColor].LIGHT_PRIMARY,
  },
  trackColor: {
    LIGHT: colorProfiles[appColor].LIGHT_TEXT_SECONDARY,
    DARK: colorProfiles[appColor].DARK_TEXT_SECONDARY,
  },
  alertBg: {
    LIGHT: colorProfiles[appColor].LIGHT_SECONDARY,
    DARK: colorProfiles[appColor].DARK_SECONDARY,
  },
  alertTitle: {
    LIGHT: colorProfiles[appColor].DARK_PRIMARY,
    DARK: colorProfiles[appColor].TEXT_PRIMARY,
  },
  alertMsg: {
    LIGHT: colorProfiles[appColor].DARK_PRIMARY,
    DARK: colorProfiles[appColor].TEXT_PRIMARY,
  },
  alertBtnBg: {
    LIGHT: colorProfiles[appColor].LIGHT_PRIMARY,
    DARK: colorProfiles[appColor].DARK_PRIMARY,
  },
  alertBtnText: {
    LIGHT: colorProfiles[appColor].TEXT_PRIMARY,
    DARK: colorProfiles[appColor].TEXT_PRIMARY,
  },
  alertBorder: {
    LIGHT: colorProfiles[appColor].DARK_PRIMARY,
    DARK: colorProfiles[appColor].TEXT_PRIMARY,
  },
  linkColor: {
    LIGHT: colorProfiles[appColor].LIGHT_LINK_PRIMARY,
    DARK: colorProfiles[appColor].DARK_LINK_PRIMARY,
  },
  cardBg: {
    LIGHT: colorProfiles[appColor].LIGHT_PRIMARY,
    DARK: colorProfiles[appColor].DARK_PRIMARY,
  },
  cardText: {
    LIGHT: colorProfiles[appColor].TEXT_PRIMARY,
    DARK: colorProfiles[appColor].TEXT_PRIMARY,
  },
  inputView: {
    LIGHT: colorProfiles[appColor].TEXT_PRIMARY,
    DARK: colorProfiles[appColor].DARK_SECONDARY,
  },
  inputIcon: {
    LIGHT: colorProfiles[appColor].DARK_PRIMARY,
    DARK: colorProfiles[appColor].TEXT_PRIMARY,
  },
  inputText: {
    LIGHT: colorProfiles[appColor].DARK_PRIMARY,
    DARK: colorProfiles[appColor].TEXT_PRIMARY,
  },
  iconOnBgColor: {
    LIGHT: colorProfiles[appColor].TEXT_PRIMARY,
    DARK: colorProfiles[appColor].TEXT_PRIMARY,
  },
  dotZeroColor: {
    LIGHT: colorProfiles[appColor].LIGHT_SECONDARY,
    DARK: colorProfiles[appColor].DARK_SECONDARY,
  },
  dotOneColor: {
    LIGHT: colorProfiles[appColor].DARK_PRIMARY,
    DARK: colorProfiles[appColor].TEXT_PRIMARY,
  },
  danger: {
    LIGHT: colorProfiles[appColor].DANGER,
    DARK: colorProfiles[appColor].DANGER,
  },
  dangerBtnText: {
    LIGHT: colorProfiles[appColor].TEXT_PRIMARY,
    DARK: colorProfiles[appColor].TEXT_PRIMARY,
  },
});
