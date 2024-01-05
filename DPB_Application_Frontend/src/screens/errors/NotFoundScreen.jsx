import React from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import ButtonA from '../../components/ButtonA';
import useCommonParams from '../../hooks/useCommonParams';
import {BRAND_LOGO} from '../../utils/images';
import Img from '../../components/Img';
import useCustomNavigate from '../../hooks/useCustomNavigate';
import {
  NOT_FOUND_GO_TO_BTN_TEXT,
  NOT_FOUND_SUBTEXT,
  NOT_FOUND_SUB_TITLE,
  NOT_FOUND_TITLE,
} from '../../utils/content';
import {DEFAULT_ROUTE} from '../../utils/constants';
import {authScreensStyle} from '../../utils/commonStyles';

const NotFoundScreen = () => {
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
        <Text style={[styles.bigTitle]}>{NOT_FOUND_TITLE}</Text>
        <Text style={[styles.mdTitle]}>{NOT_FOUND_SUB_TITLE}</Text>
        <Text style={[styles.subText]}>{NOT_FOUND_SUBTEXT}</Text>
        <View style={[styles.loginBtnView]}>
          <ButtonA
            func={() => goToScreen(DEFAULT_ROUTE)}
            bg={Colors.btnBgColor[theme]}
            color={Colors.btnText[theme]}
            border={Colors.border[theme]}
            title={NOT_FOUND_GO_TO_BTN_TEXT}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotFoundScreen;
