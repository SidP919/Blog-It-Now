import {Text, StyleSheet, Pressable, Platform} from 'react-native';
import React, {useState} from 'react';
import {FONT_INTER_BOLD} from '../../utils/fontUtils';
import {DEFAULT_BTN_TEXT} from '../../utils/content';
import useCommonParams from '../../hooks/useCommonParams';

const ButtonA = ({
  func = () => {},
  bg = null,
  color = null,
  title = DEFAULT_BTN_TEXT,
  border = null,
  customStyle = null,
}) => {
  const {bigSize, mdSize, smSize, mdText, smText} = useCommonParams();
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
      <Text style={[styles.buttonText]}>{title}</Text>
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
      paddingHorizontal: 16,
      paddingVertical: 12,
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

export default ButtonA;
