import {Text, StyleSheet, Pressable, Platform, View} from 'react-native';
import React, {useState} from 'react';
import {FONT_INTER_BOLD} from '../../utils/fontUtils';
import {DEFAULT_BTN_TEXT} from '../../utils/content';
import useCommonParams from '../../hooks/useCommonParams';
import {postAuthScreenStyle} from '../../utils/commonStyles';
import Img from '../Img';

const IconTextBtn = ({
  func = () => {},
  bg = null,
  color = null,
  title = DEFAULT_BTN_TEXT,
  border = null,
  customStyle = null,
  icon = null,
}) => {
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

  const commonStyles = postAuthScreenStyle(
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

  const styles = style(
    bg,
    color,
    border,
    customStyle,
    bigSize,
    mdSize,
    smSize,
    mdText,
    smText,
  );
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  return (
    <Pressable
      onPress={func}
      style={[styles.buttonView, isPressed && styles.btnHover]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}>
      <View style={[commonStyles.likeDislikeView, styles.likeDislikeView]}>
        {icon && (
          <Img
            source={icon}
            width={16}
            height={16}
            color={Colors.sideBarHeaderLogo[theme]}
          />
        )}
        <Text style={[commonStyles.likeDislikeText, styles.buttonText]}>
          {title}
        </Text>
      </View>
    </Pressable>
  );
};

const style = (
  bg,
  color,
  border,
  customStyle,
  bigSize,
  mdSize,
  smSize,
  mdText,
  smText,
) =>
  StyleSheet.create({
    buttonView: {
      paddingHorizontal: 0,
      paddingEnd: 8,
      paddingVertical: 8,
      marginVertical: 8,
      marginHorizontal: 8,
      borderRadius: 14,
      backgroundColor: bg,
      borderColor: border,
      borderWidth: border ? 2 : null,
      justifyContent: 'center',
      alignItems: 'center',
      ...customStyle,
    },
    likeDislikeView: {
      paddingVertical: 0,
      paddingHorizontal: 0,
      maxWidth: '100%',
    },
    buttonText: {
      fontSize: mdText,
      fontWeight: '700',
      fontFamily: FONT_INTER_BOLD,
      color: color,
      textAlign: 'center',
    },
    btnHover: {
      ...Platform.select({
        native: {
          shadowColor: border,
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.3,
          shadowRadius: 4,
          borderBottomWidth: 4,
          paddingVertical: 11,
          elevation: 8,
        },
        web: {
          boxShadow: `0px 2px 4px ${border}`,
        },
      }),
    },
  });

export default IconTextBtn;
