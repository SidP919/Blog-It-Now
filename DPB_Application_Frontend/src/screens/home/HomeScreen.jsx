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
  DEFAULT_CREATOR_QUOTE,
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
import {getCreatorQuote} from '../../utils/jsUtils';

const HomeScreen = () => {
  const [isApiLoading, setIsApiLoading] = useState(false);
  const [creatorQuote, setCreatorQuote] = useState(DEFAULT_CREATOR_QUOTE);
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
      const quote = await getCreatorQuote();
      setCreatorQuote(quote);
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
              ]}>
              <Pressable>
                <View style={[homeStyles.heroSectionContainer]}>
                  <HeroSection />
                </View>
                <View
                  style={[
                    homeStyles.homeSectionContainer,
                    homeStyles.belowHeroSectionContainer,
                  ]}>
                  <Text style={[styles.dataTitle, homeStyles.quoteText]}>
                    {creatorQuote}
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
      position: isWeb ? 'sticky' : 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: -1,
      marginBottom: 0,
      borderTopColor: Colors.border[theme],
      borderTopWidth: 2,
      height:
        screenHeight -
        (ifMobileDevice() || ifTablet() ? 56 : 85) -
        (isLandscapeMode && ifWebSmallLandscapeMode() ? 56 : 85),
    },
    belowHeroSectionContainer: {
      height: isLandscapeMode && ifWebSmallLandscapeMode() ? 56 : 85,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 0,
      marginTop: !isWeb
        ? screenHeight - (ifMobileDevice() || ifTablet() ? 56 : 85) - 85
        : null,
      borderTopStartRadius: !isLandscapeMode && ifMobileDevice() ? 80 : 64,
      borderTopEndRadius: !isLandscapeMode && ifMobileDevice() ? 80 : 64,
      borderStyle: 'dashed',
    },
    quoteText: {
      width: '100%',
      fontStyle: 'italic',
      textAlign: 'center',
    },
    homeSectionContainer: {
      width: screenWidth - (isWindows ? (isChrome ? 21 : isEdge ? 16 : 4) : 0),
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
