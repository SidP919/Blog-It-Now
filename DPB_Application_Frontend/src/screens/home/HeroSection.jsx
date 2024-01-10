import React from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import useCommonParams from '../../hooks/useCommonParams';
import {ANDROID_ICON, BRAND_LOGO, IOS_ICON} from '../../utils/images';
import Img from '../../components/Img';
import useCustomNavigate from '../../hooks/useCustomNavigate';
import TextWithLink from '../../components/TextWithLink';
import {
  ANDROID_DOWNLOAD_TEXT,
  APP_NAME,
  DEVELOPED_BY,
  DEVELOPED_FOR,
  DEVELOPER_NAME,
  EXPLORE_BLOGS_TITLE,
  IOS_DOWNLOAD_TEXT,
  THOSE_TEXT,
  YOU_TEXT,
} from '../../utils/content';
import {ABOUT_US_ROUTE, EXPLORE_BLOGS_ROUTE} from '../../utils/constants';
import {authScreensStyle, nativeAppLinksStyle} from '../../utils/commonStyles';
import {
  ifMobileDevice,
  ifTablet,
  ifWebLargeLandscapeMode,
  ifWebSmallLandscapeMode,
  isWeb,
  openLink,
} from '../../utils/utils';
import {
  getAndroidDownloadLink,
  getIosDownloadLink,
} from '../../redux/slices/OtherDataSlice';
import ButtonA from '../../components/ButtonA';

const HeroSection = () => {
  const androidDownloadLink = useSelector(getAndroidDownloadLink);
  const iosDownloadLink = useSelector(getIosDownloadLink);

  const {
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
  } = useCommonParams();
  const {navigate} = useCustomNavigate();
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

  const heroStyles = heroStyle(
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

  const nativeLinkStyles = nativeAppLinksStyle(
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

  const goToScreen = screenName => {
    navigate(screenName, {replace: true});
  };

  return (
    <SafeAreaView style={[styles.mainContainer, heroStyles.heroMainContainer]}>
      <View
        style={[
          styles.subContainer,
          styles.headerContainer,
          heroStyles.heroHeaderContainer,
        ]}>
        <Img
          source={BRAND_LOGO}
          color={Colors.headerLogo[theme]}
          size={isLandscapeMode ? screenWidth * 0.35 : screenHeight * 0.23}
        />
      </View>
      <ScrollView
        contentContainerStyle={[
          styles.subContainer,
          heroStyles.heroContentSubContainer,
        ]}>
        <Text style={[styles.bigTitle, heroStyles.heroBigTitle]}>
          {APP_NAME}
        </Text>
        <TextWithLink
          text={DEVELOPED_BY}
          word={DEVELOPER_NAME}
          url={`/${ABOUT_US_ROUTE}`}
          onPressDoThis={() => goToScreen(ABOUT_US_ROUTE)}
          customStyle={{...styles.mdTitle, ...heroStyles.heroMdTitle}}
          linkColor={Colors.headerTitle[theme]}
        />
        {isWeb ? (
          <TextWithLink
            text={DEVELOPED_FOR}
            word={THOSE_TEXT}
            onPressDoThis={e => {
              e.target.innerHTML = YOU_TEXT;
              e.target?.attributes[0]?.ownerElement?.classList?.remove(
                'r-textDecorationLine-1ddef8g',
              );
            }}
            customStyle={{...styles.mdTitle, ...heroStyles.heroMdTitle}}
            linkColor={Colors.headerTitle[theme]}
          />
        ) : (
          <Text style={[styles.mdTitle, heroStyles.heroMdTitle]}>
            {DEVELOPED_FOR}
          </Text>
        )}
        {isWeb ? (
          <View
            style={[
              nativeLinkStyles.nativeLinksContainer,
              heroStyles.nativeLinksContainer,
            ]}>
            {androidDownloadLink ? (
              <Pressable
                style={[
                  nativeLinkStyles.nativeLinkBtn,
                  heroStyles.nativeLinkBtn,
                ]}
                onPress={() => openLink(androidDownloadLink)}>
                <Img
                  source={ANDROID_ICON}
                  color={Colors.headerLogo[theme]}
                  size={bigSize * 1.5}
                />
                <Text
                  style={[
                    nativeLinkStyles.nativeLinkText,
                    heroStyles.nativeLinkText,
                  ]}>
                  {ANDROID_DOWNLOAD_TEXT}
                </Text>
              </Pressable>
            ) : (
              <></>
            )}
            {iosDownloadLink ? (
              <Pressable
                style={[
                  nativeLinkStyles.nativeLinkBtn,
                  heroStyles.nativeLinksContainer,
                ]}
                onPress={() => openLink(iosDownloadLink)}>
                <Img
                  source={IOS_ICON}
                  color={Colors.headerLogo[theme]}
                  size={bigSize * 1.5}
                />
                <Text
                  style={[
                    nativeLinkStyles.nativeLinkText,
                    heroStyles.nativeLinkText,
                  ]}>
                  {IOS_DOWNLOAD_TEXT}
                </Text>
              </Pressable>
            ) : (
              <></>
            )}
          </View>
        ) : (
          <View style={[styles.btnView]}>
            <ButtonA
              func={() => goToScreen(EXPLORE_BLOGS_ROUTE)}
              bg={Colors.btnBgColor[theme]}
              color={Colors.btnText[theme]}
              border={Colors.border[theme]}
              title={EXPLORE_BLOGS_TITLE}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const heroStyle = (
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
) =>
  StyleSheet.create({
    heroMainContainer: {
      height:
        screenHeight -
        (ifMobileDevice() || ifTablet() ? 56 : 85) -
        (isLandscapeMode && ifWebSmallLandscapeMode() ? 56 : 85),
      backgroundColor: 'transparent',
    },
    heroHeaderContainer: {
      backgroundColor: 'transparent',
      width: isLandscapeMode ? screenWidth * 0.5 : null,
      minHeight: isLandscapeMode
        ? screenHeight -
          (ifMobileDevice() || ifTablet() ? 56 : 85) -
          (isLandscapeMode && ifWebSmallLandscapeMode() ? 56 : 85)
        : (screenHeight - 56 - 85) * 0.25,
      maxHeight: isLandscapeMode
        ? screenHeight -
          (ifMobileDevice() || ifTablet() ? 56 : 85) -
          (isLandscapeMode && ifWebSmallLandscapeMode() ? 56 : 85)
        : (screenHeight - 56 - 85) * 0.25,
    },
    heroContentSubContainer: {
      width: isLandscapeMode ? screenWidth * 0.5 : null,
      justifyContent: isLandscapeMode ? 'center' : 'center',
      paddingVertical: isLandscapeMode
        ? ifWebLargeLandscapeMode()
          ? 0
          : ifWebSmallLandscapeMode()
          ? 0
          : 20
        : 16,
      minHeight: isLandscapeMode
        ? screenHeight -
          (ifMobileDevice() || ifTablet() ? 56 : 85) -
          (isLandscapeMode && ifWebSmallLandscapeMode() ? 56 : 85)
        : (screenHeight - 56 - 85) * 0.75,
      perspective: 1000,
    },
    heroBigTitle: {
      transform: [{rotateX: '-45deg'}],
      fontSize:
        isLandscapeMode && !ifMobileDevice() && !ifTablet()
          ? bigSize * 2
          : ifTablet()
          ? bigSize * 2
          : bigSize * 1.7,
      color: Colors.headerTitle[theme],
      textDecorationLine: 'underline',
    },
    heroMdTitle: {
      color: Colors.headerTitle[theme],
      fontSize: smSize,
      maxWidth: 500,
      transform: [{rotateX: '35deg'}],
    },
    nativeLinksContainer: {
      justifyContent: 'flex-start',
      paddingTop: 16,
      paddingBottom: 16,
    },
    nativeLinkBtn: {
      borderColor: Colors.headerLogo[theme],
    },
    nativeLinkText: {
      color: Colors.headerLogo[theme],
    },
  });
export default HeroSection;
