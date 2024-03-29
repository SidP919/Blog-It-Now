import {StyleSheet, Text, Pressable, View, ScrollView} from 'react-native';
import React from 'react';
import {useDispatch} from 'react-redux';
import {colorProfiles} from '../../utils/theme';
import ToggleSwitch from '../../components/ToggleSwitch';
import {setAppTheme} from '../../redux/slices/ThemeSlice';
import {saveLocalData} from '../../utils/preferences';
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
import {postAuthScreenStyle} from '../../utils/commonStyles';
import HeaderWrapper from '../HeaderWrapper';

const SettingsScreen = () => {
  const {
    screenHeight,
    screenWidth,
    theme,
    isLandscapeMode,
    appColor,
    Colors,
    bigSize,
    mdSize,
    smSize,
    mdText,
    smText,
  } = useCommonParams();

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
  const commonStyles = postAuthScreenStyle(
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
    <HeaderWrapper
      title={SETTINGS_TITLE}
      currentScreen={SETTINGS_ROUTE}
      isApiLoading={false}>
      <ScrollView
        contentContainerStyle={[styles.screenContent]}
        showsVerticalScrollIndicator={false}>
        <Pressable>
          <View style={styles.sectionContainer}>
            <Text style={[styles.sectionTitle]}>{SETTINGS_APP_HEADING}</Text>
            <View style={[commonStyles.dataContainer]}>
              <Text style={[styles.dataTitle]}>{SETTINGS_APP_THEME_TITLE}</Text>
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
            <View style={[commonStyles.dataContainer]}>
              <Text style={[styles.dataTitle]}>{SETTINGS_APP_COLOR_TITLE}</Text>
              <View style={styles.dataContent}>
                <ImgButton
                  onPress={() => onToggleColor(THEME_COLOR_PURPLE)}
                  source={DEFAULT_ICON}
                  color={colorProfiles[THEME_COLOR_PURPLE].LIGHT_PRIMARY}
                  size={bigSize * 2}
                />
                <ToggleSwitch
                  onToggleSwitch={onToggleColor}
                  currentVal={appColor === THEME_COLOR_ORANGE ? true : false}
                />
                <ImgButton
                  onPress={() => onToggleColor(THEME_COLOR_ORANGE)}
                  source={DEFAULT_ICON}
                  color={colorProfiles[THEME_COLOR_ORANGE].LIGHT_PRIMARY}
                  size={bigSize * 2}
                />
              </View>
            </View>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={[styles.sectionTitle]}>
              {SETTINGS_ACCOUNT_HEADING}
            </Text>
            <View style={[commonStyles.dataContainer, styles.dataContainer2]}>
              <Text style={[styles.dataTitle]}>
                {SETTINGS_ACCOUNT_DANGER_ZONE_TITLE}
              </Text>
              <View style={[styles.cardContainer]}>
                <DangerZoneCard />
              </View>
            </View>
          </View>
        </Pressable>
      </ScrollView>
    </HeaderWrapper>
  );
};

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
    ...postAuthScreenStyle(
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
    ),
    toggleLeftBtn: {
      color: Colors.bgColor[LIGHT_THEME],
      backgroundColor: Colors.main[LIGHT_THEME],
      borderTopLeftRadius: 20,
      borderBottomLeftRadius: 20,
      marginHorizontal: smText,
    },
    toggleRightBtn: {
      color: Colors.bgColor[DARK_THEME],
      backgroundColor: Colors.main[DARK_THEME],
      borderTopRightRadius: 20,
      borderBottomRightRadius: 20,
      marginHorizontal: smText,
    },
    cardContainer: {
      flex: isLandscapeMode ? 1 : null,
      width: isLandscapeMode ? null : '100%',
      paddingVertical: 16,
      marginRight: 16,
      alignItems: isLandscapeMode ? 'flex-start' : 'center',
    },
    dataContainer2: {
      alignItems: 'flex-start',
    },
  });

export default SettingsScreen;
