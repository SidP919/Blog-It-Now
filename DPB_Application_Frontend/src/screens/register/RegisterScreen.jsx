import React, {useEffect} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, View} from 'react-native';
import {isWeb} from '../../utils/utils';
import useCommonParams from '../../hooks/useCommonParams';
import {BRAND_LOGO} from '../../utils/images';
import Img from '../../components/Img';
import useCustomNavigate from '../../hooks/useCustomNavigate';
import Toast from '../../components/Toast';
import {getWelcomeQuote} from '../../utils/jsUtils';
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
  } = useCommonParams();

  const styles = authScreensStyle(
    theme,
    screenHeight,
    screenWidth,
    isLandscapeMode,
    Colors,
  );

  const {navigate} = useCustomNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      (async () => {
        const quote = await getWelcomeQuote();
        Toast({
          type: 'success', // or 'error', 'info'
          position: 'bottom', // or 'top'
          text1: quote[0],
          text2: quote[1],
          visibilityTime: 6000, // number of milliseconds
        });
      })();
      isWeb && navigate('Dashboard', {replace: true});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

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
