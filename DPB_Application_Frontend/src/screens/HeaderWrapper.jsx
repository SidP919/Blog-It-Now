import {KeyboardAvoidingView, Platform, SafeAreaView, View} from 'react-native';
import React, {memo} from 'react';
import DasboardSidePanel from './dashboard/DasboardSidePanel';
import useCommonParams from '../hooks/useCommonParams';
import useAnimatedSidebar from '../hooks/useAnimatedSidebar';
import {postAuthScreenStyle} from '../utils/commonStyles';
import Header from './dashboard/Header';
import ThreeDotsLoader from '../components/ThreeDotsLoader';
import {PLEASE_WAIT_TEXT} from '../utils/content';

const HeaderWrapper = ({
  title,
  currentScreen,
  isApiLoading = false,
  children,
}) => {
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
  return (
    <SafeAreaView style={[styles.container]}>
      <DasboardSidePanel
        screenHeight={screenHeight}
        screenWidth={screenWidth}
        animatedValue={animatedValue}
        toggleSidePanel={toggleSidePanel}
        showView={showView}
        currentScreen={currentScreen}
        panResponder={panResponder}
      />
      <View style={[styles.mainContainer]} {...panResponder?.panHandlers}>
        <KeyboardAvoidingView
          style={[styles.mainContainer]}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Header
            headerTitle={title}
            toggleSidePanel={toggleSidePanel}
            currentScreen={currentScreen}
          />
          {isApiLoading ? (
            <View style={styles.apiLoadingView}>
              <ThreeDotsLoader theme={theme} loaderMsg={PLEASE_WAIT_TEXT} />
            </View>
          ) : (
            children
          )}
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default memo(HeaderWrapper);
