import React from 'react';
import {Keyboard, Pressable, ScrollView, View} from 'react-native';
import {isWeb} from '../../utils/utils';
import useCommonParams from '../../hooks/useCommonParams';
import {BRAND_LOGO} from '../../utils/images';
import Img from '../../components/Img';
import {authScreensStyle} from '../../utils/commonStyles';
import VerifyEmailCard from './VerifyEmailCard';

const VerifyEmailScreen = () => {
  const {screenHeight, screenWidth, theme, isLandscapeMode, Colors} =
    useCommonParams();

  const styles = authScreensStyle(
    theme,
    screenHeight,
    screenWidth,
    isLandscapeMode,
    Colors,
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
        <VerifyEmailCard />
      </ScrollView>
    </Pressable>
  );
};

export default VerifyEmailScreen;
