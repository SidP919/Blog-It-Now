import React from 'react';
import {Keyboard, Pressable, ScrollView, View} from 'react-native';
import {isWeb} from '../../utils/utils';
import useCommonParams from '../../hooks/useCommonParams';
import {BRAND_LOGO} from '../../utils/images';
import Img from '../../components/Img';
import ForgotPwdCard from './ForgotPwdCard';
import {authScreensStyle} from '../../utils/commonStyles';

const ForgotPwdScreen = () => {
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

  return (
    <Pressable
      style={[styles.mainContainer]}
      onPress={() => !isWeb && Keyboard.dismiss()}>
      <View style={[styles.subContainer, styles.headerContainer]}>
        <Img
          source={BRAND_LOGO}
          color={Colors.headerLogo[theme]}
          size={isLandscapeMode ? screenWidth * 0.35 : screenHeight * 0.23}
        />
      </View>
      <ScrollView contentContainerStyle={[styles.subContainer]}>
        <ForgotPwdCard />
      </ScrollView>
    </Pressable>
  );
};

export default ForgotPwdScreen;
