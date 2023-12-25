import {Platform, StyleSheet} from 'react-native';
import {bigSize, ifWebSmallLandscapeMode, isWeb, mdText, mdSize} from './utils';
import {FONT_INTER_BOLD} from './fontUtils';

export const authScreensStyle = (
  theme,
  screenHeight,
  screenWidth,
  isLandscapeMode,
  Colors,
) =>
  StyleSheet.create({
    mainContainer: {
      flex: isWeb ? null : 1,
      height: screenHeight,
      backgroundColor: Colors.bgColor[theme],
      flexDirection: isLandscapeMode
        ? ifWebSmallLandscapeMode()
          ? 'row'
          : 'row-reverse'
        : 'column',
    },
    subContainer: {
      minHeight: isLandscapeMode ? screenHeight : screenHeight * 0.75,
      width: isLandscapeMode ? screenWidth * 0.55 : screenWidth,
      paddingHorizontal: isLandscapeMode ? 32 : 16,
      paddingVertical: isLandscapeMode
        ? ifWebSmallLandscapeMode()
          ? 16
          : 32
        : 32,
      alignItems: 'center',
      justifyContent: isLandscapeMode ? 'center' : 'flex-start',
    },
    headerContainer: {
      minHeight: isLandscapeMode ? screenHeight : screenHeight * 0.25,
      maxHeight: isLandscapeMode ? screenHeight : screenHeight * 0.25,
      width: isLandscapeMode ? screenWidth * 0.45 : screenWidth,
      backgroundColor: Colors.main[theme],
      justifyContent: 'center',
      borderBottomWidth: isLandscapeMode ? null : 2,
      borderBottomColor: isLandscapeMode ? null : Colors.border[theme],
      borderLeftWidth: isLandscapeMode
        ? ifWebSmallLandscapeMode()
          ? null
          : 2
        : null,
      borderLeftColor: isLandscapeMode ? Colors.border[theme] : null,
      borderRightWidth: isLandscapeMode
        ? ifWebSmallLandscapeMode()
          ? 2
          : null
        : null,
      borderRightColor: isLandscapeMode ? Colors.border[theme] : null,
      paddingHorizontal: 32,
      paddingVertical: 32,
    },
    mainTitle: {
      fontSize: bigSize(),
      fontWeight: '700',
      fontFamily: FONT_INTER_BOLD,
      color: Colors.title[theme],
      paddingHorizontal: 12,
      paddingVertical: 16,
      textAlign: 'center',
    },
  });

export const formCardStyle = (
  theme,
  isLandscapeMode,
  screenWidth,
  screenHeight,
  Colors,
) =>
  StyleSheet.create({
    cardContainer: {
      width: isLandscapeMode ? screenWidth * 0.55 - 64 : screenWidth - 32,
      maxWidth: 520,
      backgroundColor: Colors.cardBg[theme],
      borderRadius: 32,
      borderWidth: 2,
      borderColor: Colors.border[theme],
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    mainTitle: {
      fontSize: mdSize(),
      fontWeight: '700',
      fontFamily: FONT_INTER_BOLD,
      color: Colors.cardText[theme],
      paddingHorizontal: 12,
      paddingVertical: 12,
      textAlign: 'center',
    },
    btnContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    dataTitle: {
      justifyContent: 'flex-start',
      alignItems: 'center',
      fontSize: mdText(),
      fontWeight: '700',
      fontFamily: FONT_INTER_BOLD,
      color: Colors.cardText[theme],
      paddingHorizontal: 0,
      paddingVertical: 8,
    },
    inputContainer: {
      flexDirection: 'row',
      backgroundColor: Colors.inputView[theme],
      paddingEnd: 4,
      paddingVertical: 4,
      borderRadius: 16,
      marginBottom: 8,
      alignItems: 'center',
    },
    inputView: {
      height: '100%',
      flex: 1,
      borderWidth: 0,
      minWidth: 0,
      borderColor: 'transparent',
      color: Colors.inputText[theme],
      fontSize: mdText(),
      fontWeight: '500',
      fontFamily: FONT_INTER_BOLD,
      borderRadius: 12,
      ...Platform.select({
        web: {
          outlineStyle: 'none',
          paddingStart: 8,
        },
      }),
    },
    linkContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      columnGap: 16,
      paddingVertical: 8,
      borderRadius: 16,
    },
    justifyLinksCenter: {
      display: 'flex',
      justifyContent: 'center',
    },
    justifyLinksBetween: {
      justifyContent: 'space-between',
    },
    linkText: {
      fontSize: mdText(),
      textDecorationLine: 'underline',
    },
    btnView: {
      width: isLandscapeMode ? null : '100%',
      paddingHorizontal: 32,
    },
  });
