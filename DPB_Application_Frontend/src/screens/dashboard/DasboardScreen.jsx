import {SafeAreaView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {ifMobileDevice, isWeb} from '../../utils/utils';
import DasboardSidePanel from './DasboardSidePanel';
import ThreeDotsLoader from '../../components/ThreeDotsLoader';
import useAnimatedSidebar from '../../hooks/useAnimatedSidebar';
import Header from './Header';
import useCommonParams from '../../hooks/useCommonParams';
import {DASHBOARD_ROUTE} from '../../utils/constants';
import {DASHBOARD_TITLE, PLEASE_WAIT_TEXT} from '../../utils/content';

const DasboardScreen = () => {
  const {screenHeight, screenWidth, theme, isLandscapeMode, Colors} =
    useCommonParams();

  const {showView, animatedValue, toggleSidePanel, panResponder} =
    useAnimatedSidebar();

  let styles = style(theme, screenHeight, screenWidth, Colors);

  const [isApiLoading, setIsApiLoading] = useState(true);

  return (
    <SafeAreaView style={[styles.container]}>
      <DasboardSidePanel
        animatedValue={animatedValue}
        screenHeight={screenHeight}
        screenWidth={screenWidth}
        toggleSidePanel={toggleSidePanel}
        showView={showView}
        currentScreen={DASHBOARD_ROUTE}
        panResponder={panResponder}
      />
      <View style={[styles.mainContainer]} {...panResponder?.panHandlers}>
        <Header
          headerTitle={DASHBOARD_TITLE}
          toggleSidePanel={toggleSidePanel}
        />
        {isApiLoading ? (
          <View style={styles.apiLoadingView}>
            <ThreeDotsLoader theme={theme} loaderMsg={PLEASE_WAIT_TEXT} />
          </View>
        ) : (
          <View>{/* Dashboard Content */}</View>
        )}
      </View>
    </SafeAreaView>
  );
};

const style = (theme, screenHeight, screenWidth, Colors) =>
  StyleSheet.create({
    container: {
      flex: isWeb ? null : 1,
      height: screenHeight,
      backgroundColor: Colors.bgColor[theme],
    },
    mainContainer: {
      height: screenHeight,
    },
    apiLoadingView: {
      height: screenHeight - (ifMobileDevice() ? 64 : 75),
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default DasboardScreen;
