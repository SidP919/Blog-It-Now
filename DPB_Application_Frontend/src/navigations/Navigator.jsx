import React, {useCallback, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getIsLoggedIn, setLoginState} from '../redux/slices/AuthSlice';
import webService, {setDispatch} from '../services/web-service';
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import {Text} from 'react-native';
import {getLocalData, saveLocalData} from '../utils/preferences';
import {logger} from '../utils/utils';
import {
  getAppColor,
  getAppTheme,
  setAppTheme,
} from '../redux/slices/ThemeSlice';
import {APP_NAME_WITH_TAGLINE, PLEASE_WAIT_TEXT} from '../utils/content';
import {
  COLOR_NAME_LOCAL,
  IS_TOKEN_VALID_API,
  THEME_NAME_LOCAL,
} from '../utils/constants';
import {setIsApiLoading} from '../redux/slices/ApiLoadingSlice';

const MainNavigator = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn);
  const theme = useSelector(getAppTheme);
  const color = useSelector(getAppColor);

  useEffect(() => {
    setDispatch(dispatch);
  }, [dispatch]);

  const setUpDefaultTheme = useCallback(async () => {
    const localTheme = await getLocalData(THEME_NAME_LOCAL);
    const localColor = await getLocalData(COLOR_NAME_LOCAL);
    logger('Logging THEME:', {localTheme, localColor});
    if (localTheme && localColor) {
      dispatch(setAppTheme({theme: localTheme, color: localColor}));
    } else {
      await saveLocalData(THEME_NAME_LOCAL, theme);
      await saveLocalData(COLOR_NAME_LOCAL, color);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, color]);

  useEffect(() => {
    setUpDefaultTheme();
  }, [setUpDefaultTheme]);

  useEffect(() => {
    dispatch(setIsApiLoading(true));
    webService
      .getData(IS_TOKEN_VALID_API)
      .then(response => {
        logger('Navigator:', response.data);
        if (response.data.success) {
          dispatch(
            setLoginState({
              isLoggedIn: true,
              authData: response.data.userData,
            }),
          );
        }
        dispatch(setIsApiLoading(false));
      })
      .catch(err => {
        dispatch(setIsApiLoading(false));
        logger(
          'Navigator:',
          IS_TOKEN_VALID_API + ' threw error:' + JSON.stringify(err),
        );
      });
  }, [dispatch]);

  return (
    <NavigationContainer
      documentTitle={{
        formatter: (options, route) =>
          `${options?.title ?? route?.name} - ${APP_NAME_WITH_TAGLINE}`,
      }}
      fallback={<Text>{PLEASE_WAIT_TEXT}</Text>}>
      {isLoggedIn ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default MainNavigator;
