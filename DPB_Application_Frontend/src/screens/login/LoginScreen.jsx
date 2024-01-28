import React, {useEffect} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, View} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {isWeb, logger} from '../../utils/utils';
import useCommonParams from '../../hooks/useCommonParams';
import {BRAND_LOGO} from '../../utils/images';
import Img from '../../components/Img';
import useCustomNavigate from '../../hooks/useCustomNavigate';
import Toast from '../../components/Toast';
import {fetchWelcomeQuote} from '../../utils/jsUtils';
import LoginCard from './LoginCard';
import {authScreensStyle} from '../../utils/commonStyles';
import {
  getWelcomeQuote,
  setWelcomeQuote,
} from '../../redux/slices/OtherDataSlice';
import {DASHBOARD_ROUTE, DEFAULT_ROUTE} from '../../utils/constants';
import {getAuthData} from '../../redux/slices/AuthSlice';

const LoginScreen = () => {
  const welcomeQuote = useSelector(getWelcomeQuote);
  const dispatch = useDispatch();
  const {role} = useSelector(getAuthData);
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

  useEffect(() => {
    if (isLoggedIn) {
      if (!welcomeQuote) {
        (async () => {
          const quote = await fetchWelcomeQuote();
          Toast({
            type: 'success', // or 'error', 'info'
            position: 'bottom', // or 'top'
            text1: quote,
            text2: '',
            visibilityTime: 6000, // number of milliseconds
          });
          dispatch(setWelcomeQuote(quote));
        })();
      } else {
        Toast({
          type: 'success', // or 'error', 'info'
          position: 'bottom', // or 'top'
          text1: welcomeQuote,
          text2: '',
          visibilityTime: 6000, // number of milliseconds
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  useEffect(() => {
    if (isWeb && isLoggedIn) {
      const isAuthor = role ? ['AUTHOR', 'ADMIN'].includes(role) : false;
      logger('Role:', {isAuthor});
      if (isAuthor) {
        navigate(DASHBOARD_ROUTE, {replace: true});
      } else {
        navigate(DEFAULT_ROUTE, {replace: true});
      }
    }
  }, [role, navigate, isLoggedIn]);

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
        <LoginCard />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
