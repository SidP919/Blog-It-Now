import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setDispatch} from '../services/web-service';
import AppNavigator from './AppNavigator';
import {getLocalData, saveLocalData} from '../utils/preferences';
import {logger} from '../utils/utils';
import {
  getAppColor,
  getAppTheme,
  setAppTheme,
} from '../redux/slices/ThemeSlice';
import {BrowserRouter} from 'react-router-dom';
import {COLOR_NAME_LOCAL, THEME_NAME_LOCAL} from '../utils/constants';

const MainNavigator = () => {
  const dispatch = useDispatch();
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

  return (
    <BrowserRouter>
      <AppNavigator />
    </BrowserRouter>
  );
};

export default MainNavigator;
