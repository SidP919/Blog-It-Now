import React from 'react';
import {Text, Pressable, StyleSheet, View} from 'react-native';
import {openLink} from '../../utils/utils';
import useCommonParams from '../../hooks/useCommonParams';

const TextWithLink = ({
  text,
  word,
  url = '/',
  onPressDoThis = null,
  customStyle,
  linkColor,
}) => {
  const {theme, Colors} = useCommonParams();
  const styles = style(theme, customStyle, Colors, linkColor);
  const textArr = text.split(' ');
  return (
    <Text style={[styles.customStyle, styles.container]}>
      {textArr.map((item, index) => {
        const currWord = item.replace(/[^\w-.]/, '');
        if (word.trim().includes(currWord)) {
          return (
            <Pressable
              key={index}
              onPress={e => (onPressDoThis ? onPressDoThis(e) : openLink(url))}
              activeOpacity={0.5}
              style={[styles.textContainer]}>
              <Text style={[styles.linkText, styles.otherText]}>
                {currWord}
                {index !== textArr.length - 1 && ' '}
              </Text>
            </Pressable>
          );
        } else {
          return (
            <View key={index} style={[styles.textContainer]}>
              <Text style={[styles.otherText]}>
                {item}
                {index !== textArr.length - 1 && ' '}
              </Text>
            </View>
          );
        }
      })}
    </Text>
  );
};

const style = (theme, customStyle, Colors, linkColor) =>
  StyleSheet.create({
    container: {
      margin: 4,
    },
    textContainer: {
      display: 'inline',
    },
    linkText: {
      textDecorationLine: 'underline',
      color: linkColor ? linkColor : Colors.linkColor[theme],
    },
    otherText: {
      paddingHorizontal: 0,
      fontSize: customStyle.fontSize,
      fontWeight: customStyle.fontWeight,
      fontFamily: customStyle.fontFamily,
      color: customStyle.color,
    },
    customStyle: {
      ...customStyle,
    },
  });

export default TextWithLink;
