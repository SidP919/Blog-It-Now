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
  const {bigSize, mdSize, smSize, mdText, smText} = useCommonParams();
  const imgWidth = width === null ? size : width;
  const imgHeight = height === null ? size : height;
  const styles = style(
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
      <Image source={source} style={[styles.imgStyle]} tintColor={color} />
    </View>
  );
};

export default Img;

const style = (
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
      ...customStyle,
    },
    imgStyle: {width: imgWidth, height: imgHeight, resizeMode: 'contain'},
  });
