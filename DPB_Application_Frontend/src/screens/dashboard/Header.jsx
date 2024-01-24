import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ImgButton from '../../components/ImgButton';
import {FAVICON_ICON, MENU_ICON} from '../../utils/images';
import {
  ifMobileDevice,
  ifTabletLandscapeMode,
  ifWebLargeLandscapeMode,
  isDesktopWeb,
} from '../../utils/utils';
import {FONT_INTER_BOLD} from '../../utils/fontUtils';
import useCommonParams from '../../hooks/useCommonParams';
import useCustomNavigate from '../../hooks/useCustomNavigate';
import {DEFAULT_ROUTE} from '../../utils/constants';
import HeaderLandscape from './HeaderLandscape';
import Toast from '../../components/Toast';

const Header = ({headerTitle, toggleSidePanel, currentScreen}) => {
  const {
    screenWidth,
    screenHeight,
    theme,
    isLandscapeMode,
    isLoggedIn,
    Colors,
    bigSize,
    mdSize,
    smSize,
    mdText,
    smText,
  } = useCommonParams();
  const {navigate} = useCustomNavigate();
  const styles = style(
    screenWidth,
    screenHeight,
    theme,
    isLandscapeMode,
    Colors,
    bigSize,
    mdSize,
    smSize,
    mdText,
    smText,
  );

  const onHomePress = () => {
    if (currentScreen === DEFAULT_ROUTE) {
      Toast({
        type: 'info', // or 'error', 'success'
        position: 'bottom', // or 'top'
        align: 'center',
        text1: `You are already on ${DEFAULT_ROUTE} Screen`,
        text2: '',
        visibilityTime: 600, // number of milliseconds
      });
    }
    navigate(DEFAULT_ROUTE, {replace: true});
  };

  if (isLandscapeMode && isDesktopWeb && ifWebLargeLandscapeMode()) {
    return <HeaderLandscape currentScreen={currentScreen} />;
  }
  return (
    <View style={[styles.headerContainer]}>
      <ImgButton
        source={MENU_ICON}
        size={32}
        color={Colors.headerLogo[theme]}
        onPress={() => toggleSidePanel(true)}
      />
      {isLandscapeMode && (
        <Text style={[styles.headerTitle]}>{headerTitle}</Text>
      )}
      <View>
        <ImgButton
          onPress={onHomePress}
          source={FAVICON_ICON}
          size={32}
          color={Colors.headerLogo[theme]}
        />
      </View>
    </View>
  );
};

export default Header;

const style = (
  screenWidth,
  screenHeight,
  theme,
  isLandscapeMode,
  Colors,
  bigSize,
  mdSize,
  smSize,
  mdText,
  smText,
) =>
  StyleSheet.create({
    headerContainer: {
      height:
        !isLandscapeMode || ifMobileDevice() || ifTabletLandscapeMode()
          ? 56
          : 85,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: Colors.main[theme],
      zIndex: 4,
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      paddingHorizontal: 8,
      // width: screenWidth,
      minWidth: 304,
      borderBottomWidth: 2,
      borderBottomColor: Colors.headerTitle[theme],
      borderBottomStyle: 'solid',
    },
    headerTitle: {
      width: (screenWidth - 56) * 0.6,
      fontSize: mdSize,
      fontWeight: '700',
      fontFamily: FONT_INTER_BOLD,
      textAlign: 'center',
      color: Colors.headerTitle[theme],
      paddingHorizontal: 12,
      paddingVertical:
        !isLandscapeMode || ifMobileDevice() || ifTabletLandscapeMode()
          ? 8
          : 16,
    },
  });
