import {StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';
import {FONT_INTER_MEDIUM} from '../../utils/fontUtils';
import useCommonParams from '../../hooks/useCommonParams';
import {NO_DATA_MSG} from '../../utils/content';

const NoDataView = ({msg = NO_DATA_MSG}) => {
  const {screenWidth, theme, isLandscapeMode, Colors, mdText} =
    useCommonParams();
  const styles = style(screenWidth, theme, isLandscapeMode, Colors, mdText);
  return (
    <View style={[styles.noDataView]}>
      <Text style={[styles.noDataText]}>{msg}</Text>
    </View>
  );
};

export default memo(NoDataView);

const style = (screenWidth, theme, isLandscapeMode, Colors, mdText) =>
  StyleSheet.create({
    noDataView: {
      height: '80%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    noDataText: {
      width: isLandscapeMode ? screenWidth * 0.45 : screenWidth * 0.75,
      maxWidth: isLandscapeMode ? 400 : 300,
      fontSize: mdText,
      fontWeight: '700',
      fontFamily: FONT_INTER_MEDIUM,
      textAlign: 'center',
      color: Colors.mdTitle[theme],
      paddingHorizontal: 12,
      paddingVertical: 16,
    },
  });
