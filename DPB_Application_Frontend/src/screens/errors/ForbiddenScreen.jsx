import React from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import ButtonA from '../../components/ButtonA';
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
import {CONTACT_US_ROUTE, DEFAULT_ROUTE} from '../../utils/constants';
import {authScreensStyle} from '../../utils/commonStyles';

const ForbiddenScreen = () => {
  const {
    screenHeight,
    screenWidth,
    theme,
    isLandscapeMode,
    Colors,
    bigSize,
    mdSize,
    smSize,
    mdText,
    smText,
  } = useCommonParams();
  const {navigate} = useCustomNavigate();
  const styles = authScreensStyle(
    theme,
    screenHeight,
    screenWidth,
    isLandscapeMode,
    Colors,
    bigSize,
    mdSize,
    smSize,
    mdText,
    smText,
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
      <ScrollView contentContainerStyle={[styles.subContainer]}>
        <Text style={[styles.bigTitle]}>{FORBIDDEN_TITLE}</Text>
        <Text style={[styles.mdTitle]}>{FORBIDDEN_SUB_TITLE}</Text>
        <TextWithLink
          text={FORBIDDEN_SUBTEXT}
          word={FORBIDDEN_SUBTEXT_LINK_TEXT}
          url={`/ContactUs`}
          onPressDoThis={() => goToScreen(CONTACT_US_ROUTE)}
          customStyle={styles.subText}
        />
        <View style={[styles.btnView]}>
          <ButtonA
            func={() => goToScreen(DEFAULT_ROUTE)}
            bg={Colors.btnBgColor[theme]}
            color={Colors.btnText[theme]}
            border={Colors.border[theme]}
            title={FORBIDDEN_GO_TO_BTN_TEXT}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForbiddenScreen;
