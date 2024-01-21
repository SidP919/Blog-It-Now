import {
  Text,
  Pressable,
  View,
  ScrollView,
  StyleSheet,
  Platform,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import useCommonParams from '../../hooks/useCommonParams';
import {HOME_ROUTE} from '../../utils/constants';
import {DEFAULT_WELCOME_QUOTE, HOME_TITLE} from '../../utils/content';
import {postAuthScreenStyle} from '../../utils/commonStyles';
import HeroSection from './HeroSection';
import {
  ifMobileDevice,
  ifTablet,
  ifWebSmallLandscapeMode,
  isWeb,
} from '../../utils/utils';
import {fetchWelcomeQuote} from '../../utils/jsUtils';
import {
  getWelcomeQuote,
  setWelcomeQuote,
} from '../../redux/slices/OtherDataSlice';
import HeaderWrapper from '../HeaderWrapper';
import TopBlogs from './TopBlogs';

const HomeScreen = () => {
  const [isApiLoading, setIsApiLoading] = useState(false);

  const welcomeQuote = useSelector(getWelcomeQuote);
  const {
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
  } = useCommonParams();

  let styles = postAuthScreenStyle(
    screenHeight,
    screenWidth,
    theme,
    isLandscapeMode,
    Colors,
    bigSize,
    mdSize,
    smSize,
    mdText,
    smText,
  );

  const homeStyles = homeStyle(
    screenHeight,
    screenWidth,
    theme,
    isLandscapeMode,
    Colors,
    bigSize,
    mdSize,
    smSize,
    mdText,
    smText,
  );

  const dispatch = useDispatch();

  const dispatchWelcomeQuote = useCallback(() => {
    if (!welcomeQuote) {
      dispatch(setWelcomeQuote(DEFAULT_WELCOME_QUOTE));
      (async () => {
        const quote = await fetchWelcomeQuote();
        dispatch(setWelcomeQuote(quote));
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    dispatchWelcomeQuote();
  }, [dispatchWelcomeQuote]);

  return (
    <HeaderWrapper
      title={HOME_TITLE}
      currentScreen={HOME_ROUTE}
      isApiLoading={isApiLoading}>
      <ScrollView
        contentContainerStyle={[
          styles.screenContent,
          homeStyles.homeScreenContent,
        ]}
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}>
        <Pressable style={[homeStyles.heroSectionContainer]}>
          <HeroSection />
        </Pressable>
        <Pressable style={[homeStyles.belowHeroSectionView]}>
          <View
            style={[
              homeStyles.homeSectionContainer,
              homeStyles.belowHeroSectionContainer,
            ]}>
            <Text style={[styles.dataTitle, homeStyles.quoteText]}>
              {welcomeQuote}
            </Text>
          </View>
          <View style={[homeStyles.homeSectionContainer]}>
            <TopBlogs />
          </View>
        </Pressable>
      </ScrollView>
    </HeaderWrapper>
  );
};

const homeStyle = (
  screenHeight,
  screenWidth,
  theme,
  isLandscapeMode,
  Colors,
  bigSize,
  mdSize,
  smSize,
  mdText,
  smText,
) =>
  StyleSheet.create({
    homeScreenContent: {
      backgroundColor: `${Colors.main[theme]}`,
      paddingHorizontal: 0,
      paddingTop: 0,
    },
    heroSectionContainer: {
      width: screenWidth,
      marginBottom: 0,
      height:
        screenHeight - (isLandscapeMode && ifWebSmallLandscapeMode() ? 56 : 85),
    },
    belowHeroSectionView: {
      zIndex: 11,
    },
    belowHeroSectionContainer: {
      height: isLandscapeMode && ifWebSmallLandscapeMode() ? 56 : 85,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 0,
      paddingHorizontal: !isLandscapeMode && ifMobileDevice() ? 28 : null,
      borderTopStartRadius: !isLandscapeMode && ifMobileDevice() ? 72 : 64,
      borderTopEndRadius: !isLandscapeMode && ifMobileDevice() ? 72 : 64,
      borderBottomStyle: 'dashed',
      borderTopStyle: 'solid',
      borderTopWidth: 2,
      paddingVertical: 0,
      ...Platform.select({
        native: {
          borderStartWidth: 0.1,
          borderEndWidth: 0.1,
        },
      }),
    },
    quoteText: {
      width: screenWidth * 0.8,
      maxWidth: 710,
      fontStyle: 'italic',
      textAlign: 'center',
      fontSize: smText * 1.3,
      fontWeight: 500,
      paddingVertical: 4,
    },
    homeSectionContainer: {
      width: screenWidth,
      minWidth: 304,
      height: screenHeight - (ifMobileDevice() || ifTablet() ? 56 : 85),
      position: 'relative',
      backgroundColor: Colors.bgColor[theme],
      borderBottomWidth: 2,
      borderColor: Colors.border[theme],
    },
  });
export default HomeScreen;
