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
import {isWeb, isDesktopWeb} from '../../utils/utils';
import DasboardSidePanel from '../dashboard/DasboardSidePanel';
import {
  FONT_INTER_MEDIUM,
  FONT_INTER_REGULAR,
  FONT_INTER_SEMIBOLD,
} from '../../utils/fontUtils';
import useAnimatedSidebar from '../../hooks/useAnimatedSidebar';
import Header from '../dashboard/Header';
import useCommonParams from '../../hooks/useCommonParams';
import {APP_NAME} from '../../utils/content';
import {DEFAULT_ROUTE} from '../utils/constants';

const DummyScreen = () => {
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

  let styles = style(
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

  return (
    <SafeAreaView style={[styles.container]}>
      <DasboardSidePanel
        screenHeight={screenHeight}
        screenWidth={screenWidth}
        animatedValue={animatedValue}
        toggleSidePanel={toggleSidePanel}
        showView={showView}
        currentScreen={DEFAULT_ROUTE}
        panResponder={panResponder}
      />
      <View style={[styles.mainContainer]} {...panResponder?.panHandlers}>
        <KeyboardAvoidingView
          style={[styles.mainContainer]}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Header
            headerTitle={APP_NAME}
            toggleSidePanel={toggleSidePanel}
            currentScreen={DEFAULT_ROUTE}
          />
          <ScrollView contentContainerStyle={[styles.screenContent]}>
            <Pressable>
              <View style={styles.sectionContainer}>
                <Text style={[styles.sectionTitle]}>{'Section 1'}</Text>
                <View style={[styles.dataContainer]}>
                  <Text style={[styles.dataTitle]}>{'Data Title 1'}</Text>
                  <View style={styles.dataContent}>
                    {/* Data Content comes here */}
                  </View>
                </View>
                <View style={[styles.dataContainer]}>
                  <Text style={[styles.dataTitle]}>{'Data Title 2'}</Text>
                  <View style={styles.dataContent}>
                    {/* Data Content comes here */}
                  </View>
                </View>
              </View>
              <View style={styles.sectionContainer}>
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
            </Pressable>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
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
    container: {
      flex: isWeb ? null : 1,
      height: isWeb ? screenHeight : null,
      backgroundColor: Colors.bgColor[theme],
    },
    mainContainer: {
      flex: isWeb ? null : 1,
      height: isWeb ? screenHeight : null,
    },
    screenContent: {
      justifyContent: 'center',
      alignItems: 'flex-start',
      paddingLeft: isLandscapeMode ? 12 : 0,
      paddingTop: isLandscapeMode && isDesktopWeb ? 85 : 56,
      ...Platform.select({
        native: {
          marginBottom: 56,
        },
      }),
    },
    sectionContainer: {
      marginBottom: smSize,
    },
    sectionTitle: {
      fontSize: bigSize,
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
      marginBottom: smText,
    },
    dataTitle: {
      fontSize: mdSize,
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
      fontSize: mdText,
      fontWeight: '700',
      fontFamily: FONT_INTER_REGULAR,
      textAlign: 'center',
      color: Colors.text[theme],
      paddingHorizontal: 12,
      paddingVertical: 16,
      alignSelf: 'center',
      alignItems: 'center',
    },
  });

export default DummyScreen;
