import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import RenderHTML from 'react-native-render-html';
import useCommonParams from '../../hooks/useCommonParams';

const HtmlRenderer = ({htmlContent, contentWidth}) => {
  const {
    screenHeight,
    screenWidth,
    theme,
    appColor,
    isLandscapeMode,
    isLoggedIn,
    Colors,
    bigSize,
    mdSize,
    smSize,
    mdText,
    smText,
  } = useCommonParams();

  const styles = style(Colors, theme);

  const tagsStyles = {
    h1: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    p: {
      fontSize: 16,
      lineHeight: 24,
      marginBottom: 0,
      marginTop: 0,
    },
    strong: {
      fontWeight: 'bold',
    },
    a: {
      textDecorationLine: 'underline',
    },
  };

  const classesStyles = {
    highlight: {
      padding: 5,
    },
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <RenderHTML
        source={{html: htmlContent}}
        contentWidth={contentWidth}
        tagsStyles={tagsStyles}
        classesStyles={classesStyles}
        baseStyle={styles.container}
      />
    </ScrollView>
  );
};

const style = (Colors, theme) =>
  StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: Colors.bgColor[theme],
      color: Colors.text[theme],
    },
  });

export default HtmlRenderer;
