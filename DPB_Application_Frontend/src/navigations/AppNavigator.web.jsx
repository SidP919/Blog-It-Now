import React, {useEffect} from 'react';
import DasboardScreen from '../screens/dashboard/DasboardScreen';
import {Dimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Routes, Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
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
  logger,
} from '../utils/utils';
import ProfileScreen from '../screens/profile/ProfileScreen';
import LogoutScreen from '../screens/login/LogoutScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';
import {getAlertData} from '../redux/slices/AlertSlice';
import CustomAlert from '../components/CustomAlert';
import {getAppTheme} from '../redux/slices/ThemeSlice';
import {getIsLoggedIn, setLoginState} from '../redux/slices/AuthSlice';
import LoginScreen from '../screens/login/LoginScreen';
import usePageTitleWeb from '../hooks/usePageTitleWeb';
import ForbiddenScreen from '../screens/errors/ForbiddenScreen';
import NotFoundScreen from '../screens/errors/NotFoundScreen';
import {
  ABOUT_US_ROUTE,
  EXPLORE_BLOGS_ROUTE,
  CONTACT_US_ROUTE,
  DASHBOARD_ROUTE,
  FORGOT_PWD_ROUTE,
  HOME_ROUTE,
  IS_TOKEN_VALID_API,
  LOGIN_ROUTE,
  LOGOUT_ROUTE,
  PROFILE_ROUTE,
  PWD_RESET_ROUTE,
  REGISTER_ROUTE,
  SETTINGS_ROUTE,
  VERIFY_EMAIL_ROUTE,
} from '../utils/constants';
import webService from '../services/web-service';
import RegisterScreen from '../screens/register/RegisterScreen';
import ForgotPwdScreen from '../screens/forgot_pwd/ForgotPwdScreen';
import PwdResetScreen from '../screens/forgot_pwd/PwdResetScreen';
import {
  getIsApiLoading,
  setIsApiLoading,
} from '../redux/slices/ApiLoadingSlice';
import ThreeDotsLoader from '../components/ThreeDotsLoader';
import VerifyEmailScreen from '../screens/verify_email/VerifyEmailScreen';
import HomeScreen from '../screens/home/HomeScreen';
import ExploreBlogsScreen from '../screens/explore_blogs/ExploreBlogsScreen';
import AboutUsScreen from '../screens/about_us/AboutUsScreen';
import ContactUsScreen from '../screens/contact_us/ContactUsScreen';
import useCommonParams from '../hooks/useCommonParams';

const AppNavigator = () => {
  const dispatch = useDispatch();
  const alertData = useSelector(getAlertData);
  const theme = useSelector(getAppTheme);
  const isLoggedIn = useSelector(getIsLoggedIn);
  const isApiLoading = useSelector(getIsApiLoading);
  const {screenWidth, screenHeight, isAuthor} = useCommonParams();
  usePageTitleWeb();
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
        // logger('OrientationData', {
        //   isLandscapeMode,
        //   isWebLargeLandscapeMode,
        //   isWebSmallLandscapeMode,
        //   isWebTabletPortraitMode,
        //   isNativeLandscapeMode: isNativeLandscapeMode2,
        // });
      },
    );
    return () => {
      dimensionsChangeListener.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenWidth, screenHeight]);

  useEffect(() => {
    dispatch(setIsApiLoading(true));
    webService
      .getData(IS_TOKEN_VALID_API)
      .then(response => {
        dispatch(setIsApiLoading(false));
        if (response.data.success) {
          dispatch(
            setLoginState({
              isLoggedIn: true,
              authData: response.data.userData,
            }),
          );
        }
      })
      .catch(err => {
        dispatch(setIsApiLoading(false));
        logger(
          'Navigator:',
          IS_TOKEN_VALID_API + ' threw error:' + JSON.stringify(err),
        );
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" end element={<HomeScreen />} />
        <Route path={`/${HOME_ROUTE}`} end element={<HomeScreen />} />
        <Route path={`/${LOGIN_ROUTE}`} end element={<LoginScreen />} />
        <Route path={`/${REGISTER_ROUTE}`} end element={<RegisterScreen />} />
        <Route
          path={`/${FORGOT_PWD_ROUTE}`}
          end
          element={<ForgotPwdScreen />}
        />
        <Route path={`/${PWD_RESET_ROUTE}`} end element={<PwdResetScreen />} />
        <Route
          path={`/${VERIFY_EMAIL_ROUTE}`}
          end
          element={<VerifyEmailScreen />}
        />
        <Route
          path={`/${EXPLORE_BLOGS_ROUTE}`}
          end
          element={<ExploreBlogsScreen />}
        />
        <Route path={`/${ABOUT_US_ROUTE}`} end element={<AboutUsScreen />} />
        <Route
          path={`/${CONTACT_US_ROUTE}`}
          end
          element={<ContactUsScreen />}
        />
        {isAuthor ? (
          <Route path={`/${DASHBOARD_ROUTE}`} element={<DasboardScreen />} />
        ) : (
          <Route path={`/${DASHBOARD_ROUTE}`} element={<ForbiddenScreen />} />
        )}
        {isLoggedIn ? (
          <Route path={`/${PROFILE_ROUTE}`} element={<ProfileScreen />} />
        ) : (
          <Route path={`/${PROFILE_ROUTE}`} element={<ForbiddenScreen />} />
        )}
        {isLoggedIn ? (
          <Route path={`/${SETTINGS_ROUTE}`} element={<SettingsScreen />} />
        ) : (
          <Route path={`/${SETTINGS_ROUTE}`} element={<ForbiddenScreen />} />
        )}
        {isLoggedIn ? (
          <Route path={`/${LOGOUT_ROUTE}`} element={<LogoutScreen />} />
        ) : (
          <Route path={`/${LOGOUT_ROUTE}`} element={<ForbiddenScreen />} />
        )}
        <Route path="/*" element={<NotFoundScreen />} />
      </Routes>
      {alertData.showAlert && (
        <CustomAlert
          title={alertData.title}
          msg={alertData.msg}
          callbackType={alertData.callbackType}
          theme={theme}
        />
      )}
      <ToastContainer />
      {isApiLoading && <ThreeDotsLoader theme={theme} />}
    </>
  );
};

export default AppNavigator;
