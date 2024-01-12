import {
  Animated,
  StyleSheet,
  Text,
  Pressable,
  View,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ImgButton from '../../components/ImgButton';
import Img from '../../components/Img';
import {
  ifMobileDevice,
  ifWebLargeLandscapeMode,
  ifWebSmallLandscapeMode,
  isDesktopWeb,
  isWeb,
  logger,
  openLink,
} from '../../utils/utils';
import {useSelector, useDispatch} from 'react-redux';
import {getAuthData} from '../../redux/slices/AuthSlice';
import webService, {showCustomAlert} from '../../services/web-service';
import {
  ABOUT_US_MENU,
  ANDROID_DOWNLOAD_TEXT,
  EXPLORE_BLOGS_MENU,
  CONTACT_US_MENU,
  EXIT_APP_MSG,
  EXIT_APP_TITLE,
  HOME_MENU,
  IOS_DOWNLOAD_TEXT,
  LOG_OUT_MSG,
  LOG_OUT_TITLE,
  SIDE_PANEL_DASHBOARD_OPTION,
  SIDE_PANEL_EXIT_OPTION,
  SIDE_PANEL_LOGIN_OPTION,
  SIDE_PANEL_LOGOUT_OPTION,
  SIDE_PANEL_PROFILE_OPTION,
  SIDE_PANEL_REGISTER_OPTION,
  SIDE_PANEL_SETTINGS_OPTION,
  SIDE_PANEL_HOME_OPTION,
  SIDE_PANEL_EXPLORE_BLOGS_OPTION,
  SIDE_PANEL_ABOUT_US_OPTION,
  SIDE_PANEL_CONTACT_US_OPTION,
} from '../../utils/content';
import {EXIT_APP, LOG_OUT} from '../../utils/utils';
import {
  ABOUT_US_ICON,
  ANDROID_ICON,
  BRAND_ICON,
  CONTACT_US_ICON,
  CROSS_ICON,
  DASHBOARD_ICON,
  EMAIL_ICON,
  EXIT_ICON,
  FAV_CONTENT_ICON,
  HOME_ICON,
  IOS_ICON,
  LOGOUT_ICON,
  PROFILE_ICON,
  RIGHT_ARROW_ICON,
  SETTINGS_ICON,
} from '../../utils/images';
import {FONT_INTER_BOLD} from '../../utils/fontUtils';
import useCustomNavigate from '../../hooks/useCustomNavigate';
import {
  ABOUT_US_ROUTE,
  CONTACT_US_ROUTE,
  DASHBOARD_ROUTE,
  DEFAULT_ROUTE,
  EXPLORE_BLOGS_ROUTE,
  GET_ANDROID_LINK,
  GET_IOS_LINK,
  HOME_ROUTE,
  LOGIN_ROUTE,
  LOGOUT_ROUTE,
  PROFILE_ROUTE,
  REGISTER_ROUTE,
  SETTINGS_ROUTE,
} from '../../utils/constants';
import useCommonParams from '../../hooks/useCommonParams';
import {
  getAndroidDownloadLink,
  getIosDownloadLink,
  setAndroidDownloadLink,
  setIosDownloadLink,
} from '../../redux/slices/OtherDataSlice';
import {nativeAppLinksStyle} from '../../utils/commonStyles';

const DasboardSidePanel = ({
  animatedValue,
  screenHeight,
  screenWidth,
  toggleSidePanel,
  showView,
  currentScreen,
  panResponder,
}) => {
  const dispatch = useDispatch();
  const {navigate} = useCustomNavigate();
  const {
    theme,
    isLandscapeMode,
    Colors,
    isLoggedIn,
    bigSize,
    mdSize,
    smSize,
    mdText,
    smText,
  } = useCommonParams();
  const [androidLink, setAndroidLink] = useState('');
  const [iosLink, setIosLink] = useState('');
  const androidDownloadLink = useSelector(getAndroidDownloadLink);
  const iosDownloadLink = useSelector(getIosDownloadLink);
  const {username} = useSelector(getAuthData);

  const styles = style(
    theme,
    animatedValue,
    screenWidth,
    screenHeight,
    showView,
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
    toggleSidePanel(false);
    if (currentScreen === DEFAULT_ROUTE && screenName !== DEFAULT_ROUTE) {
      navigate(screenName);
    } else {
      navigate(screenName, {replace: true});
    }
  };

  function getDownloadLink(API) {
    if (isWeb) {
      const link = webService
        .getData(API)
        .then(response => response.data.value)
        .then(data => {
          return data;
        })
        .catch(err => {
          logger(`DashboardSidePanel: ${API} threw error:`, err);
        });
      return link;
    }
    return '';
  }

  useEffect(() => {
    isWeb &&
      (async () => {
        // its required that we test it against null explicity so that we can allow a empty "" link
        if (androidDownloadLink === null) {
          const tempAndroidLink = await getDownloadLink(GET_ANDROID_LINK);
          dispatch(setAndroidDownloadLink(tempAndroidLink));
          setAndroidLink(tempAndroidLink);
        } else {
          setAndroidLink(androidDownloadLink);
        }
        // its required that we test it against null explicity so that we can allow a empty "" link
        if (iosDownloadLink === null) {
          const tempIosLink = await getDownloadLink(GET_IOS_LINK);
          dispatch(setIosDownloadLink(tempIosLink));
          setIosLink(tempIosLink);
        } else {
          setIosLink(iosDownloadLink);
        }
      })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLandscapeMode && isDesktopWeb && ifWebLargeLandscapeMode()) {
    return null;
  }
  return (
    <Animated.View
      style={[styles.sideContainer]}
      {...panResponder?.panHandlers}>
      <ScrollView
        contentContainerStyle={[styles.sideContainerScrollView]}
        showsVerticalScrollIndicator={true}>
        <View style={[styles.sideSection, styles.logoSection]}>
          <Img
            source={BRAND_ICON}
            color={Colors.sideBarHeaderLogo[theme]}
            size={bigSize * 5}
          />
          <ImgButton
            source={CROSS_ICON}
            size={32}
            color={Colors.sideBarHeaderLogo[theme]}
            onPress={() => toggleSidePanel(false)}
          />
        </View>
        {isLoggedIn && (
          <View
            style={[
              styles.sectionItem,
              currentScreen === PROFILE_ROUTE && styles.currentScreen,
            ]}>
            <Img
              source={PROFILE_ICON}
              size={bigSize}
              color={Colors.sideBarItemLogo[theme]}
            />
            <Text
              numberOfLines={1}
              style={[styles.sideItemTitle, styles.profileTitle]}>
              {SIDE_PANEL_PROFILE_OPTION}
              {username}
            </Text>
            <ImgButton
              source={RIGHT_ARROW_ICON}
              size={smSize}
              color={Colors.sideBarItemLogo[theme]}
              onPress={() => goToScreen(PROFILE_ROUTE)}
            />
          </View>
        )}
        <Pressable
          onPress={() => goToScreen(HOME_ROUTE)}
          style={[
            styles.sectionItem,
            currentScreen === HOME_ROUTE && styles.currentScreen,
          ]}>
          <Img
            source={HOME_ICON}
            size={bigSize}
            color={Colors.sideBarItemLogo[theme]}
          />
          <Text numberOfLines={1} style={[styles.sideItemTitle]}>
            {SIDE_PANEL_HOME_OPTION}
          </Text>
        </Pressable>

        {isLoggedIn && (
          <Pressable
            onPress={() => goToScreen(DASHBOARD_ROUTE)}
            style={[
              styles.sectionItem,
              currentScreen === DASHBOARD_ROUTE && styles.currentScreen,
            ]}>
            <Img
              source={DASHBOARD_ICON}
              size={bigSize}
              color={Colors.sideBarItemLogo[theme]}
            />
            <Text numberOfLines={1} style={[styles.sideItemTitle]}>
              {SIDE_PANEL_DASHBOARD_OPTION}
            </Text>
          </Pressable>
        )}
        <Pressable
          onPress={() => goToScreen(EXPLORE_BLOGS_ROUTE)}
          style={[
            styles.sectionItem,
            currentScreen === EXPLORE_BLOGS_ROUTE && styles.currentScreen,
          ]}>
          <Img
            source={FAV_CONTENT_ICON}
            size={bigSize}
            color={Colors.sideBarItemLogo[theme]}
          />
          <Text numberOfLines={1} style={[styles.sideItemTitle]}>
            {SIDE_PANEL_EXPLORE_BLOGS_OPTION}
          </Text>
        </Pressable>
        {isLoggedIn && (
          <Pressable
            onPress={() => goToScreen(SETTINGS_ROUTE)}
            style={[
              styles.sectionItem,
              currentScreen === SETTINGS_ROUTE && styles.currentScreen,
            ]}>
            <Img
              source={SETTINGS_ICON}
              size={bigSize}
              color={Colors.sideBarItemLogo[theme]}
            />
            <Text numberOfLines={1} style={[styles.sideItemTitle]}>
              {SIDE_PANEL_SETTINGS_OPTION}
            </Text>
          </Pressable>
        )}
        <Pressable
          onPress={() => goToScreen(ABOUT_US_ROUTE)}
          style={[
            styles.sectionItem,
            currentScreen === ABOUT_US_ROUTE && styles.currentScreen,
          ]}>
          <Img
            source={ABOUT_US_ICON}
            size={bigSize}
            color={Colors.sideBarItemLogo[theme]}
          />
          <Text numberOfLines={1} style={[styles.sideItemTitle]}>
            {SIDE_PANEL_ABOUT_US_OPTION}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => goToScreen(CONTACT_US_ROUTE)}
          style={[
            styles.sectionItem,
            currentScreen === CONTACT_US_ROUTE && styles.currentScreen,
          ]}>
          <Img
            source={CONTACT_US_ICON}
            size={bigSize}
            color={Colors.sideBarItemLogo[theme]}
          />
          <Text numberOfLines={1} style={[styles.sideItemTitle]}>
            {SIDE_PANEL_CONTACT_US_OPTION}
          </Text>
        </Pressable>
        {!isLoggedIn && (
          <Pressable
            onPress={() => goToScreen(LOGIN_ROUTE)}
            style={[
              styles.sectionItem,
              currentScreen === LOGIN_ROUTE && styles.currentScreen,
            ]}>
            <Img
              source={EMAIL_ICON}
              size={bigSize}
              color={Colors.sideBarItemLogo[theme]}
            />
            <Text numberOfLines={1} style={[styles.sideItemTitle]}>
              {SIDE_PANEL_LOGIN_OPTION}
            </Text>
          </Pressable>
        )}
        {!isLoggedIn && (
          <Pressable
            onPress={() => goToScreen(REGISTER_ROUTE)}
            style={[
              styles.sectionItem,
              currentScreen === REGISTER_ROUTE && styles.currentScreen,
            ]}>
            <Img
              source={PROFILE_ICON}
              size={bigSize}
              color={Colors.sideBarItemLogo[theme]}
            />
            <Text numberOfLines={1} style={[styles.sideItemTitle]}>
              {SIDE_PANEL_REGISTER_OPTION}
            </Text>
          </Pressable>
        )}
        {isLoggedIn && (
          <Pressable
            onPress={() => {
              showCustomAlert(LOG_OUT_TITLE, LOG_OUT_MSG, LOG_OUT);
            }}
            style={[
              styles.sectionItem,
              currentScreen === LOGOUT_ROUTE && styles.currentScreen,
            ]}>
            <Img
              source={LOGOUT_ICON}
              size={bigSize}
              color={Colors.sideBarItemLogo[theme]}
            />
            <Text numberOfLines={1} style={[styles.sideItemTitle]}>
              {SIDE_PANEL_LOGOUT_OPTION}
            </Text>
          </Pressable>
        )}
        {!isWeb && (
          <Pressable
            onPress={() =>
              showCustomAlert(EXIT_APP_TITLE, EXIT_APP_MSG, EXIT_APP)
            }
            style={[styles.sectionItem]}>
            <Img
              source={EXIT_ICON}
              size={bigSize}
              color={Colors.sideBarItemLogo[theme]}
            />
            <Text numberOfLines={1} style={[styles.sideItemTitle]}>
              {SIDE_PANEL_EXIT_OPTION}
            </Text>
          </Pressable>
        )}
        {isWeb && (
          <View
            style={[
              nativeLinkStyles.nativeLinksContainer,
              styles.nativeLinksContainer,
            ]}>
            {androidLink ? (
              <Pressable
                style={[nativeLinkStyles.nativeLinkBtn]}
                onPress={() => openLink(androidLink)}>
                <Img
                  source={ANDROID_ICON}
                  color={Colors.sideBarHeaderLogo[theme]}
                  size={bigSize * 1.5}
                />
                <Text style={[nativeLinkStyles.nativeLinkText]}>
                  {ANDROID_DOWNLOAD_TEXT}
                </Text>
              </Pressable>
            ) : (
              <></>
            )}
            {iosLink ? (
              <Pressable
                style={[nativeLinkStyles.nativeLinkBtn]}
                onPress={() => openLink(iosLink)}>
                <Img
                  source={IOS_ICON}
                  color={Colors.sideBarHeaderLogo[theme]}
                  size={bigSize * 1.5}
                />
                <Text style={[nativeLinkStyles.nativeLinkText]}>
                  {IOS_DOWNLOAD_TEXT}
                </Text>
              </Pressable>
            ) : (
              <></>
            )}
          </View>
        )}
      </ScrollView>
      <View style={[styles.sideContainerRightView]} />
    </Animated.View>
  );
};

export default DasboardSidePanel;

const style = (
  theme,
  animatedValue,
  screenWidth,
  screenHeight,
  showView,
  isLandscapeMode,
  Colors,
  bigSize,
  mdSize,
  smSize,
  mdText,
  smText,
) =>
  StyleSheet.create({
    sideContainer: {
      position: 'absolute',
      zIndex: showView ? 2 : 0,
      width: '100%',
      height: screenHeight,
      left: animatedValue,
      overflowY: 'auto',
      overflowX: 'hidden',
    },
    sideContainerScrollView: {
      backgroundColor: Colors.bgColor[theme],
      width: isLandscapeMode
        ? ifWebSmallLandscapeMode()
          ? screenWidth * 0.4
          : screenWidth * 0.32
        : screenWidth * 0.72,
      minWidth: isLandscapeMode ? (ifWebSmallLandscapeMode() ? 256 : 272) : 256,
      maxWidth: isLandscapeMode ? (ifWebSmallLandscapeMode() ? 280 : 350) : 280,
      minHeight: screenHeight,
      paddingTop: 8,
      paddingBottom: 40,
      borderRightColor: Colors.border[theme],
      borderRightWidth: 1,
    },
    sideContainerRightView: {
      backgroundColor: 'transparent',
    },
    sideSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      paddingBottom: 8,
    },
    logoSection: {
      borderBottomWidth: 1,
      borderBottomColor: Colors.main[theme],
    },
    sectionItem: {
      backgroundColor: Colors.main[theme],
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      borderRightColor: Colors.headerTitle[theme],
      borderTopColor: Colors.headerTitle[theme],
      borderBottomColor: Colors.headerTitle[theme],
      borderBottomWidth: 1,
      borderTopWidth: 1,
    },
    currentScreen: {
      borderRightWidth: 8,
      borderRightColor: Colors.main[theme],
      borderLeftWidth: 8,
      borderLeftColor: Colors.main[theme],
      borderTopWidth: 6,
      borderTopColor: Colors.headerTitle[theme],
      borderBottomWidth: 6,
      borderBottomColor: Colors.headerTitle[theme],
      backgroundColor: Colors.activeItem[theme],
    },
    sideItemTitle: {
      maxWidth: isLandscapeMode
        ? ifWebSmallLandscapeMode()
          ? 260 - (bigSize + 32)
          : 330 - (bigSize + 32)
        : 260 - (bigSize + 32),
      fontSize: mdText,
      fontWeight: '700',
      fontFamily: FONT_INTER_BOLD,
      textAlign: 'left',
      color: Colors.headerTitle[theme],
      paddingVertical: 16,
    },
    nativeLinksContainer: {
      flex: 1,
    },
    profileTitle: {flex: 1},
  });
