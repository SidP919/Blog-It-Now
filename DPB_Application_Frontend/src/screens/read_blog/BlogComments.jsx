import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import Toast from '../../components/Toast';
import useCommonParams from '../../hooks/useCommonParams';
import {postAuthScreenStyle} from '../../utils/commonStyles';
import {ifWebSmallLandscapeMode} from '../../utils/utils';

const BlogComments = ({blogData}) => {
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
  const styles = postAuthScreenStyle(
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
  const customStyles = style(
    screenHeight,
    screenWidth,
    theme,
    isLandscapeMode,
    isLoggedIn,
    Colors,
    bigSize,
    mdSize,
    smSize,
    mdText,
    smText,
  );
  return (
    <View style={[styles.sectionContainer, customStyles.commentsContainer]}>
      <Text style={[styles.sectionTitle]}>
        {'Comments (' + blogData?.noOfComments + ')'}
      </Text>
      {/* <View style={[styles.dataContainer]}>
        <Text style={[styles.dataTitle]}>{'Add a comment'}</Text>
        <View style={styles.dataContent}>
          <TextInput
            rows={1}
            style={[styles.dataInput, {color: Colors.btnText[theme]}]}
            onChangeText={text =>
              Toast({
                type: 'info', // or 'error', 'success'
                position: 'bottom', // or top
                text1: 'Hey!',
                text2: 'Comments cannot be added at the moment.',
                visibilityTime: 3000,
              })
            }
            value={''}
            placeholder={'Comment here'}
          />
        </View>
      </View> */}
    </View>
  );
};

export default BlogComments;

const style = (
  screenHeight,
  screenWidth,
  theme,
  isLandscapeMode,
  isLoggedIn,
  Colors,
  bigSize,
  mdSize,
  smSize,
  mdText,
  smText,
) =>
  StyleSheet.create({
    commentsContainer: {
      width:
        isLandscapeMode && !ifWebSmallLandscapeMode()
          ? screenWidth * 0.64
          : screenWidth * 0.94,
      alignItems:
        isLandscapeMode && !ifWebSmallLandscapeMode() ? 'flex-start' : 'center',
      borderColor: Colors.border[theme],
      borderWidth: isLandscapeMode ? 3 : 2,
      borderRadius: 24,
      overflow: 'hidden',
    },
  });
