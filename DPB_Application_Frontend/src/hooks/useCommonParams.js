import {useEffect, useState} from 'react';
import {
  getHeight,
  getWidth,
  logger,
  bigSize as bSize,
  mdSize as mSize,
  smSize as sSize,
  mdText as mText,
  smText as sText,
} from '../utils/utils';
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
  const [bigSize, setBigSize] = useState(bSize());
  const [mdSize, setMdSize] = useState(mSize());
  const [smSize, setSmSize] = useState(sSize());
  const [mdText, setMdText] = useState(mText());
  const [smText, setSmText] = useState(sText());
  const theme = useSelector(getAppTheme);
  const appColor = useSelector(getAppColor);
  const isLandscapeMode = useSelector(getIsLandscapeMode);
  const isLoggedIn = useSelector(getIsLoggedIn);

  const [Colors, setColors] = useState(getColors(THEME_COLOR_PURPLE));

  useEffect(() => {
    Dimensions.addEventListener('change', ({window}) => {
      const {width, height} = window;
      setScreenWidth(width);
      setScreenHeight(height - 1);
      setBigSize(bSize());
      setMdSize(mSize());
      setSmSize(sSize());
      setMdText(mText());
      setSmText(sText());
      logger(`Dimensions: W: ${width}, H: ${height}`);
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
    bigSize,
    mdSize,
    smSize,
    mdText,
    smText,
  };
};

export default useCommonParams;
