import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import useCommonParams from '../../hooks/useCommonParams';

const Img = ({
  source = null,
  size = 24,
  color = null,
  width = null,
  height = null,
  customStyle = null,
}) => {
  const {
    screenHeight,
    isLandscapeMode,
    bigSize,
    mdSize,
    smSize,
    mdText,
    smText,
  } = useCommonParams();
  const imgWidth = width === null ? size : width;
  const imgHeight = height === null ? size : height;
  const styles = style(
    screenHeight,
    isLandscapeMode,
    imgWidth,
    imgHeight,
    customStyle,
    bigSize,
    mdSize,
    smSize,
    mdText,
    smText,
  );
  return (
    <View style={[styles.mainContainer]}>
      <Image
        source={source}
        style={[styles.imgStyle]}
        tintColor={color}
        resizeMode="contain"
      />
    </View>
  );
};

export default Img;

const style = (
  screenHeight,
  isLandscapeMode,
  imgWidth,
  imgHeight,
  customStyle,
  bigSize,
  mdSize,
  smSize,
  mdText,
  smText,
) =>
  StyleSheet.create({
    mainContainer: {
      width: imgWidth + mdSize,
      height: imgHeight + smText,
      paddingHorizontal: mdSize / 2,
      paddingVertical: smText / 2,
      justifyContent: 'center',
      maxHeight: screenHeight - mdSize,
      ...customStyle,
    },
    imgStyle: {
      width: imgWidth,
      height: imgHeight,
      maxHeight: screenHeight - mdSize * 2,
    },
  });
