import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ImgButton from '../../components/ImgButton';
import {bigSize, isWeb} from '../../utils/utils';
import DasboardSidePanel from '../dashboard/DasboardSidePanel';
import {logoutHandler} from '../../services/web-service';
import {LOGOUT_ICON} from '../../utils/images';
import {FONT_INTER_SEMIBOLD} from '../../utils/fontUtils';
import useCommonParams from '../../hooks/useCommonParams';
import useAnimatedSidebar from '../../hooks/useAnimatedSidebar';
import Header from '../dashboard/Header';
import {LOGOUT_ROUTE} from '../../utils/constants';

const LogoutScreen = () => {
  const {screenHeight, screenWidth, theme, isLandscapeMode, Colors} =
    useCommonParams();

  const {showView, animatedValue, toggleSidePanel} = useAnimatedSidebar();
  let styles = style(theme, screenHeight, Colors);

  return (
    <SafeAreaView style={[styles.container]}>
      <DasboardSidePanel
        screenHeight={screenHeight}
        screenWidth={screenWidth}
        animatedValue={animatedValue}
        toggleSidePanel={toggleSidePanel}
        showView={showView}
        currentScreen={LOGOUT_ROUTE}
      />
      <View style={[styles.mainContainer]}>
        <Header
          headerTitle={'Want to Log Out?'}
          toggleSidePanel={toggleSidePanel}
        />
        <View style={[styles.screenContent]}>
          <Text style={[styles.bigTitle]}>
            Please click below button to confirm logout:
          </Text>
          <ImgButton
            source={LOGOUT_ICON}
            size={bigSize()}
            color={Colors.btnText[theme]}
            onPress={logoutHandler}
          />
        </View>
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
      alignItems: 'center',
    },
    bigTitle: {
      fontSize: bigSize(),
      fontWeight: '700',
      fontFamily: FONT_INTER_SEMIBOLD,
      textAlign: 'center',
      color: Colors.title[theme],
      paddingHorizontal: 12,
      paddingVertical: 16,
    },
  });

export default LogoutScreen;
