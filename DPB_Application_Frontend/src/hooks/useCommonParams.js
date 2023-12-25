import {useEffect, useState} from 'react';
import {getHeight, getWidth} from '../utils/utils';
import {useSelector} from 'react-redux';
import {getAppColor, getAppTheme} from '../redux/slices/ThemeSlice';
import {getIsLandscapeMode} from '../redux/slices/DeviceOrientationSlice';
import {Dimensions} from 'react-native';
import {getIsLoggedIn} from '../redux/slices/AuthSlice';
import {THEME_COLOR_PURPLE} from '../utils/constants';
import {getColors} from '../utils/theme';

const useCommonParams = () => {
  const [screenHeight, setScreenHeight] = useState(getHeight());
  const [screenWidth, setScreenWidth] = useState(getWidth());
  const theme = useSelector(getAppTheme);
  const appColor = useSelector(getAppColor);
  const isLandscapeMode = useSelector(getIsLandscapeMode);
  const isLoggedIn = useSelector(getIsLoggedIn);

  const [Colors, setColors] = useState(getColors(THEME_COLOR_PURPLE));

  useEffect(() => {
    Dimensions.addEventListener('change', ({window, screen}) => {
      setScreenHeight(getHeight());
      setScreenWidth(getWidth());
    });
  }, []);

  useEffect(() => {
    setColors(getColors(appColor));
  }, [appColor]);

  return {
    screenHeight,
    screenWidth,
    theme,
    appColor,
    isLandscapeMode,
    isLoggedIn,
    Colors,
  };
};

export default useCommonParams;
