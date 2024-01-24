import React, {useState} from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import ImgButton from '../../components/ImgButton';
import {BRAND_ICON, MENU_ICON, PROFILE_ICON} from '../../utils/images';
import {
  LOG_OUT,
  ifMobileDevice,
  ifTablet,
  isNotDesktopWeb,
} from '../../utils/utils';
import {FONT_INTER_BOLD} from '../../utils/fontUtils';
import useCommonParams from '../../hooks/useCommonParams';
import useCustomNavigate from '../../hooks/useCustomNavigate';
import {
  ABOUT_US_ROUTE,
  EXPLORE_BLOGS_ROUTE,
  CONTACT_US_ROUTE,
  DASHBOARD_ROUTE,
  DEFAULT_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  PROFILE_ROUTE,
  REGISTER_ROUTE,
  SETTINGS_ROUTE,
  LOGOUT_ROUTE,
} from '../../utils/constants';
import {
  ABOUT_US_MENU,
  EXPLORE_BLOGS_MENU,
  CONTACT_US_MENU,
  DASHBOARD_MENU,
  HOME_MENU,
  LOGIN_BTN_TEXT,
  LOG_OUT_MENU,
  LOG_OUT_MSG,
  LOG_OUT_TITLE,
  MY_PROFILE_MENU,
  REGISTER_BTN_TEXT,
  SETTINGS_MENU,
} from '../../utils/content';
import ButtonA from '../../components/ButtonA';
import {showCustomAlert} from '../../services/web-service';

const HeaderLandscape = ({currentScreen = 'Home'}) => {
  const {
    screenHeight,
    screenWidth,
    theme,
    isLandscapeMode,
    isLoggedIn,
    Colors,
    bigSize,
    mdSize,
    smSize,
    mdText,
    smText,
  } = useCommonParams();
  const [showProfileSubMenu, setShowProfileSubMenu] = useState(false);
  const {navigate} = useCustomNavigate();

  const styles = style(
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

  const goToScreen = screenName => {
    setShowProfileSubMenu(false);
    if (currentScreen === DEFAULT_ROUTE && screenName !== DEFAULT_ROUTE) {
      navigate(screenName);
    } else {
      navigate(screenName, {replace: true});
    }
  };

  const CENTER_MENUS_ARRAY = [
    {
      route: HOME_ROUTE,
      title: HOME_MENU,
      isLoggedIn: 0, // 0 signifies isLoggedIn not required
    },
    {
      route: DASHBOARD_ROUTE,
      title: DASHBOARD_MENU,
      isLoggedIn: 1, // 1 signifies isLoggedIn needs to be true
    },
    {
      route: EXPLORE_BLOGS_ROUTE,
      title: EXPLORE_BLOGS_MENU,
      isLoggedIn: 0,
    },
    {
      route: ABOUT_US_ROUTE,
      title: ABOUT_US_MENU,
      isLoggedIn: 0,
    },
    {
      route: CONTACT_US_ROUTE,
      title: CONTACT_US_MENU,
      isLoggedIn: 0,
    },
  ];

  const AUTH_BUTTONS_ARRAY = [
    {route: LOGIN_ROUTE, title: LOGIN_BTN_TEXT},
    {route: REGISTER_ROUTE, title: REGISTER_BTN_TEXT},
  ];
  return (
    <Pressable
      style={[styles.headerContainer]}
      onPress={() => setShowProfileSubMenu(false)}>
      <ImgButton
        source={isNotDesktopWeb ? MENU_ICON : BRAND_ICON}
        width={bigSize * 2.952}
        height={bigSize * 2}
        color={Colors.headerLogo[theme]}
        onPress={() => goToScreen(DEFAULT_ROUTE)}
      />
      {isLandscapeMode && (
        <View style={[styles.headerMenuView]}>
          {CENTER_MENUS_ARRAY.map((menu, i) => {
            return menu.isLoggedIn === 0 || isLoggedIn ? (
              <CenterMenu
                key={`${menu.title}${i}`}
                goToScreen={goToScreen}
                route={menu.route}
                headerTitle={menu.title}
                headerTitleStyle={styles.headerTitle}
                currentScreen={currentScreen}
                currentScreenStyle={styles.currentScreen}
              />
            ) : null;
          })}
        </View>
      )}
      <View>
        {!isLoggedIn && (
          <View style={[styles.headerMenuView]}>
            {AUTH_BUTTONS_ARRAY.map((button, i) => (
              <ButtonA
                key={`${button.title}${i}`}
                func={() => goToScreen(button.route)}
                bg={Colors.btnBgColor[theme]}
                color={Colors.btnText[theme]}
                border={Colors.border[theme]}
                title={button.title}
                customStyle={styles.headerTitle}
              />
            ))}
          </View>
        )}
        {isLoggedIn && (
          <View style={[styles.subMenuContainer]}>
            <ImgButton
              onPress={() => setShowProfileSubMenu(!showProfileSubMenu)}
              source={PROFILE_ICON}
              size={bigSize * 1.5}
              color={Colors.headerLogo[theme]}
            />
            <Modal
              transparent={true}
              visible={showProfileSubMenu}
              onRequestClose={() => setShowProfileSubMenu(false)}
              animationType="slide">
              <Pressable onPress={() => setShowProfileSubMenu(false)}>
                <ProfileMenu
                  goToScreen={goToScreen}
                  showProfileSubMenu={showProfileSubMenu}
                  setShowProfileSubMenu={setShowProfileSubMenu}
                  currentScreen={currentScreen}
                  styles={styles}
                />
              </Pressable>
            </Modal>
          </View>
        )}
      </View>
    </Pressable>
  );
};

const CenterMenu = ({
  goToScreen,
  route,
  headerTitle,
  headerTitleStyle,
  currentScreen,
  currentScreenStyle,
}) => {
  const [hoverOn, setHoverOn] = useState('');
  return (
    <Pressable
      onPress={() => goToScreen(route)}
      onHoverIn={() => setHoverOn(route)}
      onHoverOut={() => setHoverOn('')}>
      <Text
        style={[
          headerTitleStyle,
          [currentScreen, hoverOn].includes(route) && currentScreenStyle,
        ]}>
        {headerTitle}
      </Text>
    </Pressable>
  );
};

const ProfileMenu = ({
  goToScreen,
  setShowProfileSubMenu,
  currentScreen,
  styles,
}) => {
  const [hoverOn, setHoverOn] = useState('');
  const PROFILE_MENUS_ARRAY = [
    {route: PROFILE_ROUTE, title: MY_PROFILE_MENU},
    {route: SETTINGS_ROUTE, title: SETTINGS_MENU},
    {route: LOGOUT_ROUTE, title: LOG_OUT_MENU},
  ];
  const onLogoutPress = () => {
    setShowProfileSubMenu(false);
    showCustomAlert(LOG_OUT_TITLE, LOG_OUT_MSG, LOG_OUT);
  };

  return (
    <View style={[styles.subMenuView]}>
      {PROFILE_MENUS_ARRAY.map((menu, i) => {
        return (
          <Pressable
            key={`${menu.title}${i}`}
            style={[styles.subMenuItem]}
            onPress={() =>
              menu.route !== LOGOUT_ROUTE
                ? goToScreen(menu.route)
                : onLogoutPress()
            }
            onHoverIn={() => setHoverOn(menu.route)}
            onHoverOut={() => setHoverOn('')}>
            <Text
              style={[
                styles.headerTitle,
                styles.subMenuTitle,
                [currentScreen, hoverOn].includes(menu.route) &&
                  styles.currentScreen,
              ]}>
              {menu.title}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default HeaderLandscape;

const style = (
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
    headerContainer: {
      height: !isLandscapeMode || ifMobileDevice() || ifTablet() ? 56 : 85,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: `${Colors.main[theme]}`,
      zIndex: 4,
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      paddingHorizontal: 16,
      // width: screenWidth,
      minWidth: 304,
      borderBottomWidth: 2,
      borderBottomColor: Colors.headerTitle[theme],
      borderBottomStyle: 'solid',
    },
    headerTitle: {
      fontSize: mdText,
      fontWeight: '700',
      fontFamily: FONT_INTER_BOLD,
      textAlign: 'center',
      color: Colors.headerTitle[theme],
      paddingVertical: 8,
    },
    subMenuContainer: {
      position: 'relative',
    },
    subMenuView: {
      position: 'absolute',
      width: 200,
      right: 0,
      backgroundColor: Colors.main[theme],
      borderColor: Colors.headerTitle[theme],
      borderWidth: 2,
      flexDirection: 'column',
      borderRadius: 8,
      padding: 12,
      marginRight: bigSize,
      marginTop: bigSize * 2.1,
    },
    subMenuItem: {
      borderBottomColor: Colors.headerTitle[theme],
      borderBottomWidth: 2,
    },
    subMenuTitle: {
      textAlign: 'left',
    },
    headerMenuView: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      columnGap: smSize,
      justifyContent: 'center',
    },
    currentScreen: {
      textDecorationLine: 'underline',
      textDecorationStyle: 'dotted',
    },
  });
