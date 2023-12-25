import React from 'react';
import {Text, Pressable, StyleSheet} from 'react-native';
import {openLink} from '../../utils/utils';
import useCommonParams from '../../hooks/useCommonParams';

const TextWithLink = ({text, word, url, customStyle}) => {
  const {theme, Colors} = useCommonParams();
  const styles = style(theme, customStyle, Colors);
  const textArr = text.split(' ');
  return (
    <Text style={[styles.container, styles.customStyle]}>
      {textArr.map((item, index) => {
        const currWord = item.replace(/[^\w]/, '');
        if (currWord === word.trim()) {
          return (
            <Pressable
              key={index}
              onPress={() => openLink(url)}
              activeOpacity={0.5}
              style={[styles.linkButton]}>
              <Text style={[styles.linkText]}>{currWord}</Text>
              {index !== textArr.length - 1 ? <Text> </Text> : <Text>.</Text>}
            </Pressable>
          );
        } else {
          return (
            <Text key={index}>
              {item}
              {index !== textArr.length - 1 && ' '}
            </Text>
          );
        }
      })}
    </Text>
  );
};

const style = (theme, customStyle, Colors) =>
  StyleSheet.create({
    container: {
      margin: 10,
    },
    linkButton: {
      flexDirection: 'row',
    },
    linkText: {
      textDecorationLine: 'underline',
      color: Colors.linkColor[theme],
    },
    customStyle: {
      ...customStyle,
    },
  });

export default TextWithLink;
