import {Image, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import {bigSize, smText} from '../../utils/utils';

const ImgButton = ({
  onPress = null,
  source = null,
  size = 24,
  color = null,
  customStyle = null,
}) => {
  const styles = style(size, customStyle);
  return (
    <Pressable onPress={onPress} style={[styles.mainContainer]}>
      <Image source={source} style={[styles.imgStyle]} tintColor={color} />
    </Pressable>
  );
};

export default ImgButton;

const style = (size, customStyle) =>
  StyleSheet.create({
    mainContainer: {
      width: size + bigSize(),
      height: size + smText(),
      paddingHorizontal: bigSize() / 2,
      paddingVertical: smText() / 2,
      ...customStyle,
    },
    imgStyle: {width: size, height: size},
  });
