import {
  SafeAreaView,
  StyleSheet,
  Text,
  Pressable,
  View,
  ScrollView,
} from 'react-native';
import React from 'react';
import {useDispatch} from 'react-redux';
import {bigSize, isWeb, mdText, mdSize} from '../utils/utils';
import DasboardSidePanel from './dashboard/DasboardSidePanel';
import {
  FONT_INTER_MEDIUM,
  FONT_INTER_REGULAR,
  FONT_INTER_SEMIBOLD,
} from '../utils/fontUtils';
import useAnimatedSidebar from '../hooks/useAnimatedSidebar';
import Header from './dashboard/Header';
import useCommonParams from '../hooks/useCommonParams';
import {SETTINGS_ROUTE} from '../utils/constants';
import {SETTINGS_TITLE} from '../utils/content';

const DummyScreen = () => {
  const {
    screenHeight,
    screenWidth,
    theme,
    isLandscapeMode,
    isLoggedIn,
    Colors,
  } = useCommonParams();

  const {
    showView,
    animatedValue,
    toggleSidePanel,
    hideSidePanelOnOutsideClick,
    panResponder,
  } = useAnimatedSidebar();

  let styles = style(theme, screenHeight, Colors);

  const dispatch = useDispatch();

  const onSubmit = async () => {};

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
        {/* panResponder is used to trigger toggleSidePanel function on swipe right & left on screen */}
        <Header
          headerTitle={SETTINGS_TITLE}
          toggleSidePanel={toggleSidePanel}
        />
        <ScrollView contentContainerStyle={[styles.screenContent]}>
          {/**
           * Replace code inside this ScrollView to create content for any screen
           */}
          <Text style={[styles.sectionTitle]}>{'HEADING'}</Text>
          <View style={[styles.dataContainer]}>
            <Text style={[styles.dataTitle]}>{'DATA_TITLE'}</Text>
            <Text style={[styles.dataText]}>{'DATA_TEXT'}</Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const style = (theme, screenHeight, Colors) =>
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
    },
    sectionTitle: {
      fontSize: bigSize(),
      fontWeight: '700',
      fontFamily: FONT_INTER_SEMIBOLD,
      textAlign: 'center',
      color: Colors.title[theme],
      paddingHorizontal: 12,
      paddingVertical: 16,
      textDecorationLine: 'underline',
      textDecorationStyle: 'dotted',
    },
    dataContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
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
    dataText: {
      fontSize: mdText(),
      fontWeight: '700',
      fontFamily: FONT_INTER_REGULAR,
      textAlign: 'center',
      color: Colors.text[theme],
      paddingHorizontal: 12,
      paddingVertical: 16,
    },
  });

export default DummyScreen;
