import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import useCommonParams from '../../hooks/useCommonParams';
import {ifMobileDevice, ifTablet, isMobileNative} from '../../utils/utils';
import {FONT_INTER_SEMIBOLD} from '../../utils/fontUtils';

const TitleView = ({title, textAlign = 'center', count = null}) => {
  const [alignPosition] = useState(
    ['left', 'center', 'right'].includes(textAlign) ? textAlign : 'center',
  );
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
    alignPosition,
  );

  return (
    <View style={[styles.sectionTitleView]}>
      <Text style={[styles.sectionTitle]}>
        {title}
        {count !== null && ` (${count})`}
      </Text>
    </View>
  );
};

export default TitleView;

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
  alignPosition,
) =>
  StyleSheet.create({
    sectionTitleView: {
      height:
        (isLandscapeMode && !ifMobileDevice()) || ifTablet() || isMobileNative
          ? 80
          : !isLandscapeMode
          ? 60
          : 48,
      justifyContent: 'center',
      alignItems: 'center',
    },
    sectionTitle: {
      fontSize: bigSize,
      fontWeight: '700',
      fontFamily: FONT_INTER_SEMIBOLD,
      textAlign: alignPosition,
      color: Colors.title[theme],
      paddingHorizontal: 12,
      paddingVertical: 16,
      textDecorationLine: 'none',
    },
  });
