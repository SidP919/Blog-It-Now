import {
  SafeAreaView,
  Text,
  Pressable,
  View,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {isWindows, isChrome, isEdge} from 'react-device-detect';
import DasboardSidePanel from '../dashboard/DasboardSidePanel';
import useAnimatedSidebar from '../../hooks/useAnimatedSidebar';
import Header from '../dashboard/Header';
import useCommonParams from '../../hooks/useCommonParams';
import {HOME_ROUTE} from '../../utils/constants';
import {
  DEFAULT_WELCOME_QUOTE,
  HOME_TITLE,
  PLEASE_WAIT_TEXT,
} from '../../utils/content';
import {postAuthScreenStyle} from '../../utils/commonStyles';
import ThreeDotsLoader from '../../components/ThreeDotsLoader';
import HeroSection from './HeroSection';
import {
  ifMobileDevice,
  ifTablet,
  ifWebSmallLandscapeMode,
  isWeb,
} from '../../utils/utils';
import {getWelcomeQuote} from '../../utils/jsUtils';

const HomeScreen = () => {
  const [isApiLoading, setIsApiLoading] = useState(false);
  const [welcomeQuote, setWelcomeQuote] = useState(DEFAULT_WELCOME_QUOTE);
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

  const {showView, animatedValue, toggleSidePanel, panResponder} =
    useAnimatedSidebar();

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

  useEffect(() => {
    (async () => {
      const quote = await getWelcomeQuote();
      setWelcomeQuote(quote);
    })();
  }, []);

  return (
    <SafeAreaView style={[styles.container]}>
      <DasboardSidePanel
        screenHeight={screenHeight}
        screenWidth={screenWidth}
        animatedValue={animatedValue}
        toggleSidePanel={toggleSidePanel}
        showView={showView}
        currentScreen={HOME_ROUTE}
        panResponder={panResponder}
      />
      <View style={[styles.mainContainer]} {...panResponder?.panHandlers}>
        <KeyboardAvoidingView
          style={[styles.mainContainer]}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Header
            headerTitle={HOME_TITLE}
            toggleSidePanel={toggleSidePanel}
            currentScreen={HOME_ROUTE}
          />
          {isApiLoading ? (
            <View style={styles.apiLoadingView}>
              <ThreeDotsLoader theme={theme} loaderMsg={PLEASE_WAIT_TEXT} />
            </View>
          ) : (
            <ScrollView
              contentContainerStyle={[
                styles.screenContent,
                homeStyles.homeScreenContent,
              ]}
              stickyHeaderIndices={[0]}
              showsVerticalScrollIndicator={true}>
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
                  <Text style={[styles.sectionTitle]}>{'Section 2'}</Text>
                  <View style={[styles.dataContainer]}>
                    <Text style={[styles.dataTitle]}>{'Data Title 2.1'}</Text>
                    <View style={styles.dataContent}>
                      {/* Data Content comes here */}
                    </View>
                  </View>
                  <View style={[styles.dataContainer]}>
                    <Text style={[styles.dataTitle]}>{'Data Title 2.2'}</Text>
                    <View style={styles.dataContent}>
                      {/* Data Content comes here */}
                    </View>
                  </View>
                </View>
                <View style={[homeStyles.homeSectionContainer]}>
                  <Text style={[styles.sectionTitle]}>{'Section 3'}</Text>
                  <View style={[styles.dataContainer]}>
                    <Text style={[styles.dataTitle]}>{'Data Title 3.1'}</Text>
                    <View style={styles.dataContent}>
                      {/* Data Content comes here */}
                    </View>
                  </View>
                  <View style={[styles.dataContainer]}>
                    <Text style={[styles.dataTitle]}>{'Data Title 3.2'}</Text>
                    <View style={styles.dataContent}>
                      {/* Data Content comes here */}
                    </View>
                  </View>
                </View>
              </Pressable>
            </ScrollView>
          )}
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
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
    },
    heroSectionContainer: {
      width: screenWidth,
      marginBottom: 0,
      borderTopColor: Colors.border[theme],
      borderTopWidth: 2,
      height:
        screenHeight -
        (ifMobileDevice() || ifTablet() ? 56 : 85) -
        (isLandscapeMode && ifWebSmallLandscapeMode() ? 56 : 85),
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
      borderStyle: 'dashed',
    },
    quoteText: {
      width: screenWidth * 0.8,
      maxWidth: 710,
      fontStyle: 'italic',
      textAlign: 'center',
      fontSize: smText * 1.3,
      fontWeight: 500,
    },
    homeSectionContainer: {
      width: screenWidth - (isWindows ? (isChrome ? 17 : isEdge ? 16 : 4) : 0),
      minWidth: 304,
      height: isWeb
        ? screenHeight - (ifMobileDevice() || ifTablet() ? 56 : 85)
        : screenHeight - (ifMobileDevice() || ifTablet() ? 56 : 85),
      paddingTop: 16,
      position: 'relative',
      backgroundColor: Colors.bgColor[theme],
      borderBottomWidth: 2,
      borderColor: Colors.border[theme],
    },
  });
export default HomeScreen;
