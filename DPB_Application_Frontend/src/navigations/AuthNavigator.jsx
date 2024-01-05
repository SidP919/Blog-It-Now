import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/login/LoginScreen';
import {Dimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  getIsNativeLandscapeMode,
  setIsLandscapeMode,
  setIsNativeLandscapeMode,
  setIsWebLargeLandscapeMode,
  setIsWebSmallLandscapeMode,
  setIsWebTabletPortraitMode,
} from '../redux/slices/DeviceOrientationSlice';
import {
  ifLandscapeMode,
  ifNativeLandscapeMode,
  ifWebLargeLandscapeMode,
  ifWebSmallLandscapeMode,
  ifWebTabletPortraitMode,
  isWeb,
  logger,
} from '../utils/utils';
import Orientation from 'react-native-orientation-locker';
import {
  ABOUT_US_ROUTE,
  CONTACT_US_ROUTE,
  DEFAULT_ROUTE,
  EXPLORE_BLOGS_ROUTE,
  FORGOT_PWD_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  PWD_RESET_ROUTE,
  REGISTER_ROUTE,
} from '../utils/constants';
import RegisterScreen from '../screens/register/RegisterScreen';
import ForgotPwdScreen from '../screens/forgot_pwd/ForgotPwdScreen';
import PwdResetScreen from '../screens/forgot_pwd/PwdResetScreen';
import {getAlertData} from '../redux/slices/AlertSlice';
import CustomAlert from '../components/CustomAlert';
import {getAppTheme} from '../redux/slices/ThemeSlice';
import {getIsApiLoading} from '../redux/slices/ApiLoadingSlice';
import ThreeDotsLoader from '../components/ThreeDotsLoader';
import Toast from 'react-native-toast-message';
import HomeScreen from '../screens/home/HomeScreen';
import ExploreBlogsScreen from '../screens/explore_blogs/ExploreBlogsScreen';
import AboutUsScreen from '../screens/about_us/AboutUsScreen';
import ContactUsScreen from '../screens/contact_us/ContactUsScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  const dispatch = useDispatch();
  const isNativeLandscapeMode = useSelector(getIsNativeLandscapeMode);
  const alertData = useSelector(getAlertData);
  const theme = useSelector(getAppTheme);
  const isApiLoading = useSelector(getIsApiLoading);
  useEffect(() => {
    const dimensionsChangeListener = Dimensions.addEventListener(
      'change',
      () => {
        const isLandscapeMode = ifLandscapeMode();
        const isWebLargeLandscapeMode = ifWebLargeLandscapeMode();
        const isWebSmallLandscapeMode = ifWebSmallLandscapeMode();
        const isWebTabletPortraitMode = ifWebTabletPortraitMode();
        const isNativeLandscapeMode2 = ifNativeLandscapeMode();
        dispatch(setIsLandscapeMode({isLandscapeMode}));
        dispatch(setIsWebLargeLandscapeMode({isWebLargeLandscapeMode}));
        dispatch(setIsWebSmallLandscapeMode({isWebSmallLandscapeMode}));
        dispatch(setIsWebTabletPortraitMode({isWebTabletPortraitMode}));
        dispatch(
          setIsNativeLandscapeMode({
            isNativeLandscapeMode: isNativeLandscapeMode2,
          }),
        );
        logger('Orientation Data', {
          isLandscapeMode,
          isWebLargeLandscapeMode,
          isWebSmallLandscapeMode,
          isWebTabletPortraitMode,
          isNativeLandscapeMode: isNativeLandscapeMode2,
        });
      },
    );
    return () => {
      dimensionsChangeListener.remove();
    };
  }, [dispatch]);

  useEffect(() => {
    // it's a native device if:
    if (!isWeb) {
      const {width, height} = Dimensions.get('window');
      //it's probably a mobile device if:
      if (Math.min(width, height) < 450) {
        Orientation.lockToPortrait(); //lock app in portrait mode on mobile devices
      } else {
        Orientation.lockToLandscape(); //lock app in landscape mode on tablet and bigger devices
      }
    }
  }, [isNativeLandscapeMode]);

  return (
    <>
      <Stack.Navigator initialRouteName={DEFAULT_ROUTE}>
        <Stack.Screen
          name={HOME_ROUTE}
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={LOGIN_ROUTE}
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={REGISTER_ROUTE}
          component={RegisterScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={FORGOT_PWD_ROUTE}
          component={ForgotPwdScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={PWD_RESET_ROUTE}
          component={PwdResetScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={EXPLORE_BLOGS_ROUTE}
          component={ExploreBlogsScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={ABOUT_US_ROUTE}
          component={AboutUsScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={CONTACT_US_ROUTE}
          component={ContactUsScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
      {alertData.showAlert && (
        <CustomAlert
          title={alertData.title}
          msg={alertData.msg}
          callbackType={alertData.callbackType}
          theme={theme}
        />
      )}
      <Toast />
      {isApiLoading && <ThreeDotsLoader theme={theme} />}
    </>
  );
};

export default AuthNavigator;
