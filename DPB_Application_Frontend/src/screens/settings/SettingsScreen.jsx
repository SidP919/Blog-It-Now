import {
  SafeAreaView,
  StyleSheet,
  Text,
  Pressable,
  View,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import React from 'react';
import {useDispatch} from 'react-redux';
import {
  bigSize,
  isWeb,
  mdText,
  mdSize,
  smText,
  smSize,
} from '../../utils/utils';
import {colorProfiles} from '../../utils/theme';
import DasboardSidePanel from '../dashboard/DasboardSidePanel';
import {
  FONT_INTER_MEDIUM,
  FONT_INTER_REGULAR,
  FONT_INTER_SEMIBOLD,
} from '../../utils/fontUtils';
import ToggleSwitch from '../../components/ToggleSwitch';
import {setAppTheme} from '../../redux/slices/ThemeSlice';
import {saveLocalData} from '../../utils/preferences';
import useAnimatedSidebar from '../../hooks/useAnimatedSidebar';
import Header from '../dashboard/Header';
import useCommonParams from '../../hooks/useCommonParams';
import {
  COLOR_NAME_LOCAL,
  DARK_THEME,
  LIGHT_THEME,
  SETTINGS_ROUTE,
  THEME_COLOR_ORANGE,
  THEME_COLOR_PURPLE,
  THEME_NAME_LOCAL,
} from '../../utils/constants';
import {
  SETTINGS_ACCOUNT_DANGER_ZONE_TITLE,
  SETTINGS_ACCOUNT_HEADING,
  SETTINGS_APP_COLOR_TITLE,
  SETTINGS_APP_HEADING,
  SETTINGS_APP_THEME_DARK_TEXT,
  SETTINGS_APP_THEME_LIGHT_TEXT,
  SETTINGS_APP_THEME_TITLE,
  SETTINGS_TITLE,
} from '../../utils/content';
import DangerZoneCard from './DangerZoneCard';
import ImgButton from '../../components/ImgButton';
import {DEFAULT_ICON} from '../../utils/images';

const SettingsScreen = () => {
  const {screenHeight, screenWidth, theme, isLandscapeMode, appColor, Colors} =
    useCommonParams();

  const {showView, animatedValue, toggleSidePanel, panResponder} =
    useAnimatedSidebar();

  let styles = style(screenHeight, screenWidth, theme, isLandscapeMode, Colors);

  const dispatch = useDispatch();

  const onToggleTheme = async changeTheme => {
    if (changeTheme && [LIGHT_THEME, DARK_THEME].includes(changeTheme)) {
      dispatch(setAppTheme({theme: changeTheme, color: appColor}));
      await saveLocalData(THEME_NAME_LOCAL, changeTheme);
    } else {
      if (theme === LIGHT_THEME) {
        dispatch(setAppTheme({theme: DARK_THEME, color: appColor}));
        await saveLocalData(THEME_NAME_LOCAL, DARK_THEME);
      } else if (theme === DARK_THEME) {
        dispatch(setAppTheme({theme: LIGHT_THEME, color: appColor}));
        await saveLocalData(THEME_NAME_LOCAL, LIGHT_THEME);
      }
    }
  };

  const onToggleColor = async changeColor => {
    if (
      changeColor &&
      [THEME_COLOR_PURPLE, THEME_COLOR_ORANGE].includes(changeColor)
    ) {
      dispatch(setAppTheme({theme: theme, color: changeColor}));
      await saveLocalData(COLOR_NAME_LOCAL, changeColor);
    } else {
      if (appColor === THEME_COLOR_PURPLE) {
        dispatch(setAppTheme({theme: theme, color: THEME_COLOR_ORANGE}));
        await saveLocalData(COLOR_NAME_LOCAL, THEME_COLOR_ORANGE);
      } else if (appColor === THEME_COLOR_ORANGE) {
        dispatch(setAppTheme({theme: theme, color: THEME_COLOR_PURPLE}));
        await saveLocalData(COLOR_NAME_LOCAL, THEME_COLOR_PURPLE);
      }
    }
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <DasboardSidePanel
        screenHeight={screenHeight}
        screenWidth={screenWidth}
        animatedValue={animatedValue}
        toggleSidePanel={toggleSidePanel}
        showView={showView}
        currentScreen={SETTINGS_ROUTE}
        panResponder={panResponder}
      />
      <View style={[styles.mainContainer]} {...panResponder?.panHandlers}>
        <Header
          headerTitle={SETTINGS_TITLE}
          toggleSidePanel={toggleSidePanel}
        />
        <ScrollView>
          <KeyboardAvoidingView
            style={[styles.screenContent]}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.sectionContainer}>
              <Text style={[styles.sectionTitle]}>{SETTINGS_APP_HEADING}</Text>
              <View style={[styles.dataContainer]}>
                <Text style={[styles.dataTitle]}>
                  {SETTINGS_APP_THEME_TITLE}
                </Text>
                <View style={styles.dataContent}>
                  <Pressable onPress={() => onToggleTheme(LIGHT_THEME)}>
                    <Text style={[styles.dataText, styles.toggleLeftBtn]}>
                      {SETTINGS_APP_THEME_LIGHT_TEXT}
                    </Text>
                  </Pressable>
                  <ToggleSwitch
                    onToggleSwitch={onToggleTheme}
                    currentVal={theme === DARK_THEME ? true : false}
                  />
                  <Pressable onPress={() => onToggleTheme(DARK_THEME)}>
                    <Text style={[styles.dataText, styles.toggleRightBtn]}>
                      {SETTINGS_APP_THEME_DARK_TEXT}
                    </Text>
                  </Pressable>
                </View>
              </View>
              <View style={[styles.dataContainer]}>
                <Text style={[styles.dataTitle]}>
                  {SETTINGS_APP_COLOR_TITLE}
                </Text>
                <View style={styles.dataContent}>
                  <ImgButton
                    onPress={() => onToggleColor(THEME_COLOR_PURPLE)}
                    source={DEFAULT_ICON}
                    color={colorProfiles[THEME_COLOR_PURPLE].LIGHT_PRIMARY}
                    size={bigSize() * 2}
                  />
                  <ToggleSwitch
                    onToggleSwitch={onToggleColor}
                    currentVal={appColor === THEME_COLOR_ORANGE ? true : false}
                  />
                  <ImgButton
                    onPress={() => onToggleColor(THEME_COLOR_ORANGE)}
                    source={DEFAULT_ICON}
                    color={colorProfiles[THEME_COLOR_ORANGE].LIGHT_PRIMARY}
                    size={bigSize() * 2}
                  />
                </View>
              </View>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={[styles.sectionTitle]}>
                {SETTINGS_ACCOUNT_HEADING}
              </Text>
              <View style={[styles.dataContainer, styles.dataContainer2]}>
                <Text style={[styles.dataTitle]}>
                  {SETTINGS_ACCOUNT_DANGER_ZONE_TITLE}
                </Text>
                <View style={[styles.cardContainer]}>
                  <DangerZoneCard />
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const style = (screenHeight, screenWidth, theme, isLandscapeMode, Colors) =>
  StyleSheet.create({
    container: {
      flex: isWeb ? null : 1,
      height: screenHeight,
      backgroundColor: Colors.bgColor[theme],
    },
    mainContainer: {
      height: screenHeight,
    },
    screenContent: {
      justifyContent: 'center',
      alignItems: 'flex-start',
      paddingLeft: isLandscapeMode ? 24 : 0,
      ...Platform.select({
        native: {
          paddingBottom: 48,
        },
      }),
    },
    sectionContainer: {
      marginBottom: smSize(),
    },
    sectionTitle: {
      fontSize: bigSize(),
      fontWeight: '700',
      fontFamily: FONT_INTER_SEMIBOLD,
      textAlign: 'left',
      color: Colors.title[theme],
      paddingHorizontal: 12,
      paddingVertical: 16,
      textDecorationLine: 'underline',
      textDecorationStyle: 'dotted',
    },
    dataContainer: {
      width: screenWidth - (isLandscapeMode ? 48 : 0),
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexWrap: isLandscapeMode ? 'nowrap' : 'wrap',
      marginBottom: smText(),
    },
    dataTitle: {
      fontSize: mdSize(),
      fontWeight: '700',
      fontFamily: FONT_INTER_MEDIUM,
      textAlign: 'center',
      color: Colors.mdTitle[theme],
      paddingHorizontal: 12,
      paddingVertical: 16,
    },
    dataContent: {
      flexDirection: 'row',
      width: isLandscapeMode ? null : '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    dataText: {
      fontSize: mdText(),
      fontWeight: '700',
      fontFamily: FONT_INTER_REGULAR,
      textAlign: 'center',
      color: Colors.text[theme],
      paddingHorizontal: 12,
      paddingVertical: 16,
      alignSelf: 'center',
      alignItems: 'center',
    },
    toggleLeftBtn: {
      color: Colors.bgColor[LIGHT_THEME],
      backgroundColor: Colors.main[LIGHT_THEME],
      borderTopLeftRadius: 20,
      borderBottomLeftRadius: 20,
      marginRight: smText(),
    },
    toggleRightBtn: {
      color: Colors.bgColor[DARK_THEME],
      backgroundColor: Colors.main[DARK_THEME],
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,
      marginLeft: smText(),
    },
    cardContainer: {
      flex: isLandscapeMode ? 1 : '100%',
      paddingHorizontal: 12,
      paddingVertical: 16,
      alignItems: isLandscapeMode ? 'flex-start' : 'center',
    },
    dataContainer2: {
      alignItems: 'flex-start',
    },
  });

export default SettingsScreen;
