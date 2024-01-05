import React, {useState} from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import ImgButton from '../../components/ImgButton';
import {BRAND_ICON, MENU_ICON, PROFILE_ICON} from '../../utils/images';
import {LOG_OUT, ifMobileDevice, isNotDesktopWeb} from '../../utils/utils';
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

  const styles = style(theme, Colors, bigSize, mdSize, smSize, mdText, smText);

  const goToScreen = screenName => {
    setShowProfileSubMenu(false);
    if (currentScreen === DEFAULT_ROUTE && screenName !== DEFAULT_ROUTE) {
      navigate(screenName);
    } else {
      navigate(screenName, {replace: true});
    }
  };

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
          <Pressable onPress={() => goToScreen(HOME_ROUTE)}>
            <Text
              style={[
                styles.headerTitle,
                currentScreen === HOME_ROUTE && styles.currentScreen,
              ]}>
              {HOME_MENU}
            </Text>
          </Pressable>
          {isLoggedIn && (
            <Pressable onPress={() => goToScreen(DASHBOARD_ROUTE)}>
              <Text
                style={[
                  styles.headerTitle,
                  currentScreen === DASHBOARD_ROUTE && styles.currentScreen,
                ]}>
                {DASHBOARD_MENU}
              </Text>
            </Pressable>
          )}
          <Pressable onPress={() => goToScreen(EXPLORE_BLOGS_ROUTE)}>
            <Text
              style={[
                styles.headerTitle,
                currentScreen === EXPLORE_BLOGS_ROUTE && styles.currentScreen,
              ]}>
              {EXPLORE_BLOGS_MENU}
            </Text>
          </Pressable>
          <Pressable onPress={() => goToScreen(ABOUT_US_ROUTE)}>
            <Text
              style={[
                styles.headerTitle,
                currentScreen === ABOUT_US_ROUTE && styles.currentScreen,
              ]}>
              {ABOUT_US_MENU}
            </Text>
          </Pressable>
          <Pressable onPress={() => goToScreen(CONTACT_US_ROUTE)}>
            <Text
              style={[
                styles.headerTitle,
                currentScreen === CONTACT_US_ROUTE && styles.currentScreen,
              ]}>
              {CONTACT_US_MENU}
            </Text>
          </Pressable>
        </View>
      )}
      <View>
        {!isLoggedIn && (
          <View style={[styles.headerMenuView]}>
            <ButtonA
              func={() => goToScreen(LOGIN_ROUTE)}
              bg={Colors.btnBgColor[theme]}
              color={Colors.btnText[theme]}
              border={Colors.border[theme]}
              title={LOGIN_BTN_TEXT}
              customStyle={styles.headerTitle}
            />
            <ButtonA
              func={() => goToScreen(REGISTER_ROUTE)}
              bg={Colors.btnBgColor[theme]}
              color={Colors.btnText[theme]}
              border={Colors.border[theme]}
              title={REGISTER_BTN_TEXT}
              customStyle={styles.headerTitle}
            />
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
                  theme={theme}
                  Colors={Colors}
                  showProfileSubMenu={showProfileSubMenu}
                  setShowProfileSubMenu={setShowProfileSubMenu}
                />
              </Pressable>
            </Modal>
          </View>
        )}
      </View>
    </Pressable>
  );
};

const ProfileMenu = ({goToScreen, theme, Colors, setShowProfileSubMenu}) => {
  const {bigSize, mdSize, smSize, mdText, smText} = useCommonParams();
  const styles = style(theme, Colors, bigSize, mdSize, smSize, mdText, smText);
  const onLogoutPress = () => {
    setShowProfileSubMenu(false);
    showCustomAlert(LOG_OUT_TITLE, LOG_OUT_MSG, LOG_OUT);
  };
  return (
    <View style={[styles.subMenuView]}>
      <Pressable
        style={[styles.subMenuItem]}
        onPress={() => goToScreen(PROFILE_ROUTE)}>
        <Text style={[styles.headerTitle, styles.subMenuTitle]}>
          {MY_PROFILE_MENU}
        </Text>
      </Pressable>
      <Pressable
        style={[styles.subMenuItem]}
        onPress={() => goToScreen(SETTINGS_ROUTE)}>
        <Text style={[styles.headerTitle, styles.subMenuTitle]}>
          {SETTINGS_MENU}
        </Text>
      </Pressable>
      <Pressable onPress={onLogoutPress}>
        <Text style={[styles.headerTitle, styles.subMenuTitle]}>
          {LOG_OUT_MENU}
        </Text>
      </Pressable>
    </View>
  );
};

export default HeaderLandscape;

const style = (theme, Colors, bigSize, mdSize, smSize, mdText, smText) =>
  StyleSheet.create({
    headerContainer: {
      height: ifMobileDevice() ? 56 : 85,
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
    },
  });
