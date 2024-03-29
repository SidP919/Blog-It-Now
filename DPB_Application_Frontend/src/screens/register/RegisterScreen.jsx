import React from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, View} from 'react-native';
import useCommonParams from '../../hooks/useCommonParams';
import {BRAND_LOGO} from '../../utils/images';
import Img from '../../components/Img';
import useCustomNavigate from '../../hooks/useCustomNavigate';
import RegisterCard from './RegisterCard';
import {authScreensStyle} from '../../utils/commonStyles';

const RegisterScreen = () => {
  const {
    screenHeight,
    screenWidth,
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

  const {navigate} = useCustomNavigate();

  return (
    <KeyboardAvoidingView
      style={[styles.mainContainer]}
      behavior={
        Platform.OS === 'ios'
          ? 'padding'
          : Platform.OS === 'web'
          ? 'position'
          : 'height'
      }>
      <View style={[styles.subContainer, styles.headerContainer]}>
        <Img
          source={BRAND_LOGO}
          color={Colors.headerLogo[theme]}
          size={isLandscapeMode ? screenWidth * 0.35 : screenHeight * 0.23}
        />
      </View>
      <ScrollView contentContainerStyle={[styles.subContainer]}>
        <RegisterCard />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
