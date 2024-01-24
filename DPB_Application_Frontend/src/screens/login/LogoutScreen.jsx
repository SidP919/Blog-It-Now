import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ImgButton from '../../components/ImgButton';
import {isWeb} from '../../utils/utils';
import DasboardSidePanel from '../dashboard/DasboardSidePanel';
import {logoutHandler} from '../../services/web-service';
import {LOGOUT_ICON} from '../../utils/images';
import {FONT_INTER_SEMIBOLD} from '../../utils/fontUtils';
import useCommonParams from '../../hooks/useCommonParams';
import useAnimatedSidebar from '../../hooks/useAnimatedSidebar';
import Header from '../dashboard/Header';
import {LOGOUT_ROUTE} from '../../utils/constants';
import HeaderWrapper from '../HeaderWrapper';

const LogoutScreen = () => {
  const {
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
  } = useCommonParams();

  const {showView, animatedValue, toggleSidePanel} = useAnimatedSidebar();
  let styles = style(
    theme,
    screenHeight,
    Colors,
    bigSize,
    mdSize,
    smSize,
    mdText,
    smText,
  );

  return (
    <HeaderWrapper
      title={'Want to Log Out?'}
      currentScreen={LOGOUT_ROUTE}
      isApiLoading={false}>
      <View style={[styles.screenContent]}>
        <Text style={[styles.bigTitle]}>
          Please click below button to confirm logout:
        </Text>
        <ImgButton
          source={LOGOUT_ICON}
          size={bigSize}
          color={Colors.btnText[theme]}
          onPress={logoutHandler}
        />
      </View>
    </HeaderWrapper>
  );
};

const style = (
  theme,
  screenHeight,
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
      fontSize: bigSize,
      fontWeight: '700',
      fontFamily: FONT_INTER_SEMIBOLD,
      textAlign: 'center',
      color: Colors.title[theme],
      paddingHorizontal: 12,
      paddingVertical: 16,
    },
  });

export default LogoutScreen;
