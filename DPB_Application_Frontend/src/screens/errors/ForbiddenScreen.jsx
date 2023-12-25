import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import ButtonA from '../../components/ButtonA';
import {bigSize, isMobileWeb, isWeb, mdText, mdSize} from '../../utils/utils';
import {FONT_INTER_BOLD, FONT_INTER_REGULAR} from '../../utils/fontUtils';
import useCommonParams from '../../hooks/useCommonParams';
import {BRAND_LOGO} from '../../utils/images';
import Img from '../../components/Img';
import useCustomNavigate from '../../hooks/useCustomNavigate';
import TextWithLink from '../../components/TextWithLink';
import {
  FORBIDDEN_GO_TO_BTN_TEXT,
  FORBIDDEN_SUBTEXT,
  FORBIDDEN_SUBTEXT_LINK_TEXT,
  FORBIDDEN_SUB_TITLE,
  FORBIDDEN_TITLE,
} from '../../utils/content';
import {APP_EMAIL, DEFAULT_ROUTE} from '../../utils/constants';

const ForbiddenScreen = () => {
  const {screenHeight, screenWidth, theme, isLandscapeMode, Colors} =
    useCommonParams();
  const {navigate} = useCustomNavigate();
  const styles = style(
    theme,
    screenHeight,
    screenWidth,
    isLandscapeMode,
    Colors,
  );

  const goToScreen = screenName => {
    navigate(screenName, {replace: true});
  };

  return (
    <SafeAreaView style={[styles.mainContainer]}>
      <View style={[styles.subContainer, styles.headerContainer]}>
        <Img
          source={BRAND_LOGO}
          color={Colors.headerLogo[theme]}
          size={isLandscapeMode ? screenWidth * 0.35 : screenHeight * 0.23}
        />
      </View>
      <View style={[styles.subContainer]}>
        <Text style={[styles.bigTitle]}>{FORBIDDEN_TITLE}</Text>
        <Text style={[styles.mdTitle]}>{FORBIDDEN_SUB_TITLE}</Text>
        <TextWithLink
          text={FORBIDDEN_SUBTEXT}
          word={FORBIDDEN_SUBTEXT_LINK_TEXT}
          url={`mailto:${APP_EMAIL}`}
          customStyle={styles.subText}
        />
        <View style={[styles.loginBtnView]}>
          <ButtonA
            func={() => goToScreen(DEFAULT_ROUTE)}
            bg={Colors.btnBgColor[theme]}
            color={Colors.btnText[theme]}
            border={Colors.border[theme]}
            title={FORBIDDEN_GO_TO_BTN_TEXT}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const style = (theme, screenHeight, screenWidth, isLandscapeMode, Colors) =>
  StyleSheet.create({
    mainContainer: {
      flex: isWeb ? null : 1,
      height: screenHeight,
      backgroundColor: Colors.bgColor[theme],
      flexDirection: isLandscapeMode ? 'row-reverse' : 'column',
    },
    subContainer: {
      width: isLandscapeMode ? screenWidth * 0.55 : screenWidth,
      padding: 32,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerContainer: {
      height: isLandscapeMode ? screenHeight : screenHeight * 0.25,
      width: isLandscapeMode ? screenWidth * 0.45 : screenWidth,
      backgroundColor: Colors.main[theme],
    },
    bigTitle: {
      fontSize: isMobileWeb ? bigSize() * 3 : bigSize() * 4,
      fontWeight: '700',
      fontFamily: FONT_INTER_BOLD,
      color: Colors.title[theme],
      paddingHorizontal: 12,
      paddingVertical: 16,
      textAlign: 'center',
    },
    mdTitle: {
      fontSize: mdSize(),
      fontWeight: '700',
      fontFamily: FONT_INTER_BOLD,
      color: Colors.title[theme],
      paddingHorizontal: 12,
      paddingVertical: 16,
      textAlign: 'center',
    },
    subText: {
      fontSize: mdText(),
      fontWeight: '500',
      fontFamily: FONT_INTER_REGULAR,
      color: Colors.title[theme],
      paddingHorizontal: 12,
      paddingVertical: isMobileWeb ? 10 : 16,
      textAlign: 'center',
      maxWidth: 500,
    },
    loginBtnView: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default ForbiddenScreen;
