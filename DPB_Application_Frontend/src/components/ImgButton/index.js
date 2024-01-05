import {Image, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import useCommonParams from '../../hooks/useCommonParams';

const ImgButton = ({
  onPress = null,
  source = null,
  size = 24,
  color = null,
  width = null,
  height = null,
  customStyle = null,
}) => {
  const {bigSize, smText} = useCommonParams();
  const imgWidth = width === null ? size : width;
  const imgHeight = height === null ? size : height;
  const styles = style(imgWidth, imgHeight, customStyle, bigSize, smText);
  return (
    <Pressable onPress={onPress} style={[styles.mainContainer]}>
      <Image source={source} style={[styles.imgStyle]} tintColor={color} />
    </Pressable>
  );
};

export default ImgButton;

const style = (imgWidth, imgHeight, customStyle, bigSize, smText) =>
  StyleSheet.create({
    mainContainer: {
      width: imgWidth + bigSize,
      height: imgHeight + smText,
      paddingHorizontal: bigSize / 2,
      paddingVertical: smText / 2,
      ...customStyle,
    },
    imgStyle: {width: imgWidth, height: imgHeight},
  });
