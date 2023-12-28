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
  bigSize,
  ifMobileDevice,
  ifWebSmallLandscapeMode,
  isWeb,
  logger,
  mdText,
  openLink,
  smSize,
} from '../../utils/utils';
import {useSelector, useDispatch} from 'react-redux';
import {getAuthData} from '../../redux/slices/AuthSlice';
import webService, {showCustomAlert} from '../../services/web-service';
import {
  ANDROID_DOWNLOAD_TEXT,
  EXIT_APP_MSG,
  EXIT_APP_TITLE,
  IOS_DOWNLOAD_TEXT,
  LOG_OUT_MSG,
  LOG_OUT_TITLE,
  SIDE_PANEL_DASHBOARD_OPTION,
  SIDE_PANEL_EXIT_OPTION,
  SIDE_PANEL_LOGOUT_OPTION,
  SIDE_PANEL_PROFILE_OPTION,
  SIDE_PANEL_SETTINGS_OPTION,
} from '../../utils/content';
import {EXIT_APP, LOG_OUT} from '../../utils/utils';
import {
  ANDROID_ICON,
  BRAND_ICON,
  CROSS_ICON,
  DASHBOARD_ICON,
  EXIT_ICON,
  IOS_ICON,
  LOGOUT_ICON,
  PROFILE_ICON,
  RIGHT_ARROW_ICON,
  SETTINGS_ICON,
} from '../../utils/images';
import {FONT_INTER_BOLD} from '../../utils/fontUtils';
import useCustomNavigate from '../../hooks/useCustomNavigate';
import {
  DASHBOARD_ROUTE,
  GET_ANDROID_LINK,
  GET_IOS_LINK,
  LOGOUT_ROUTE,
  PROFILE_ROUTE,
  SETTINGS_ROUTE,
} from '../../utils/constants';
import useCommonParams from '../../hooks/useCommonParams';
import {
  getAndroidDownloadLink,
  getIosDownloadLink,
  setAndroidDownloadLink,
  setIosDownloadLink,
} from '../../redux/slices/OtherDataSlice';

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
  const {theme, isLandscapeMode, Colors} = useCommonParams();
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
  );

  const goToScreen = screenName => {
    toggleSidePanel(false);
    navigate(screenName, {replace: true});
  };

  function getDownloadLink(API) {
    if (isWeb) {
      const link = webService
        .getData(API)
        .then(response => response.data.downloadLink)
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

  return (
    <Animated.View
      style={[styles.sideContainer]}
      {...panResponder?.panHandlers}>
      <ScrollView contentContainerStyle={[styles.sideContainerScrollView]}>
        <View style={[styles.sideSection, styles.logoSection]}>
          <Img
            source={BRAND_ICON}
            color={Colors.sideBarHeaderLogo[theme]}
            size={bigSize() * 5}
          />
          <ImgButton
            source={CROSS_ICON}
            size={32}
            color={Colors.sideBarHeaderLogo[theme]}
            onPress={() => toggleSidePanel(false)}
          />
        </View>
        <View
          style={[
            styles.sectionItem,
            currentScreen === PROFILE_ROUTE && styles.currentScreen,
          ]}>
          <Img
            source={PROFILE_ICON}
            size={bigSize()}
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
            size={smSize()}
            color={Colors.sideBarItemLogo[theme]}
            onPress={() => goToScreen(PROFILE_ROUTE)}
          />
        </View>
        <Pressable
          onPress={() => goToScreen(DASHBOARD_ROUTE)}
          style={[
            styles.sectionItem,
            currentScreen === DASHBOARD_ROUTE && styles.currentScreen,
          ]}>
          <Img
            source={DASHBOARD_ICON}
            size={bigSize()}
            color={Colors.sideBarItemLogo[theme]}
          />
          <Text numberOfLines={1} style={[styles.sideItemTitle]}>
            {SIDE_PANEL_DASHBOARD_OPTION}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => goToScreen(SETTINGS_ROUTE)}
          style={[
            styles.sectionItem,
            currentScreen === SETTINGS_ROUTE && styles.currentScreen,
          ]}>
          <Img
            source={SETTINGS_ICON}
            size={bigSize()}
            color={Colors.sideBarItemLogo[theme]}
          />
          <Text numberOfLines={1} style={[styles.sideItemTitle]}>
            {SIDE_PANEL_SETTINGS_OPTION}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            showCustomAlert(LOG_OUT_TITLE, LOG_OUT_MSG, LOG_OUT);
            // goToScreen(LOGOUT_ROUTE);
          }}
          style={[
            styles.sectionItem,
            currentScreen === LOGOUT_ROUTE && styles.currentScreen,
          ]}>
          <Img
            source={LOGOUT_ICON}
            size={bigSize()}
            color={Colors.sideBarItemLogo[theme]}
          />
          <Text numberOfLines={1} style={[styles.sideItemTitle]}>
            {SIDE_PANEL_LOGOUT_OPTION}
          </Text>
        </Pressable>
        {!isWeb && (
          <Pressable
            onPress={() =>
              showCustomAlert(EXIT_APP_TITLE, EXIT_APP_MSG, EXIT_APP)
            }
            style={[styles.sectionItem]}>
            <Img
              source={EXIT_ICON}
              size={bigSize()}
              color={Colors.sideBarItemLogo[theme]}
            />
            <Text numberOfLines={1} style={[styles.sideItemTitle]}>
              {SIDE_PANEL_EXIT_OPTION}
            </Text>
          </Pressable>
        )}
        {isWeb && (
          <View style={[styles.nativeLinksContainer]}>
            {androidLink ? (
              <Pressable
                style={[styles.nativeLinkBtn]}
                onPress={() => openLink(androidLink)}>
                <Img
                  source={ANDROID_ICON}
                  color={Colors.sideBarHeaderLogo[theme]}
                  size={bigSize() * 1.5}
                />
                <Text style={[styles.nativeLinkText]}>
                  {ANDROID_DOWNLOAD_TEXT}
                </Text>
              </Pressable>
            ) : (
              <></>
            )}
            {iosLink ? (
              <Pressable
                style={[styles.nativeLinkBtn]}
                onPress={() => openLink(iosLink)}>
                <Img
                  source={IOS_ICON}
                  color={Colors.sideBarHeaderLogo[theme]}
                  size={bigSize() * 1.5}
                />
                <Text style={[styles.nativeLinkText]}>{IOS_DOWNLOAD_TEXT}</Text>
              </Pressable>
            ) : (
              <></>
            )}
          </View>
        )}
      </ScrollView>
      <View style={{backgroundColor: 'transparent'}} />
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
) =>
  StyleSheet.create({
    sideContainer: {
      position: 'absolute',
      zIndex: showView ? 2 : 0,
      width: screenWidth,
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
          ? 260 - (bigSize() + 32)
          : 330 - (bigSize() + 32)
        : 260 - (bigSize() + 32),
      fontSize: mdText(),
      fontWeight: '700',
      fontFamily: FONT_INTER_BOLD,
      textAlign: 'left',
      color: Colors.headerTitle[theme],
      paddingVertical: 16,
    },
    nativeLinksContainer: {
      flex: 1,
      height: '100%',
      flexWrap: 'wrap',
      paddingTop: 32,
      paddingHorizontal: 16,
      gap: smSize(),
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    nativeLinkBtn: {
      maxWidth: isLandscapeMode && !ifMobileDevice() ? 240 : 180,
      flexDirection: 'row',
      borderColor: Colors.border[theme],
      borderWidth: 2,
      borderRadius: 32,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    nativeLinkText: {
      fontSize: mdText(),
      fontWeight: '700',
      fontFamily: FONT_INTER_BOLD,
      textAlign: 'left',
      color: Colors.btnText[theme],
      paddingVertical: 8,
      paddingRight: 20,
    },
    profileTitle: {flex: 1},
  });
