import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ImageBackground,
  ScrollView,
} from 'react-native';
import useCommonParams from '../../hooks/useCommonParams';
import {
  ifMobileDevice,
  ifWebSmallLandscapeMode,
  isWeb,
} from '../../utils/utils';
import {BLOG_BG} from '../../utils/images';

const TitleView = ({title}) => {
  const {
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
  } = useCommonParams();

  const styles = style(
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
    <View style={styles.container}>
      <ImageBackground style={styles.imgBgView} source={BLOG_BG}>
        <ScrollView
          contentContainerStyle={styles.thumbnail}
          showsVerticalScrollIndicator={ifMobileDevice() ? true : false}>
          {title?.split(' ').map((w, i) => {
            return (
              <Text
                numberOfLines={1}
                key={'tt_' + i}
                style={[styles.thumbnailTextContainer]}>
                <Text
                  style={[
                    styles.thumbnailText,
                    w.length === 1 && styles.customBorderRadius,
                  ]}>
                  {w.toUpperCase().charAt(0)}
                </Text>
                {w.length > 1 && (
                  <Text numberOfLines={1} style={styles.titleText}>
                    {w.slice(1).toUpperCase()}
                  </Text>
                )}
              </Text>
            );
          })}
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

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
  itemWidth,
) =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: Colors.border[theme],
      borderTopLeftRadius:
        isLandscapeMode && ifWebSmallLandscapeMode() ? 22 : 24,
      borderTopRightRadius:
        isLandscapeMode && ifWebSmallLandscapeMode() ? 0 : 24,
      borderBottomLeftRadius:
        isLandscapeMode && ifWebSmallLandscapeMode() ? 22 : 0,
      borderBottomRightRadius:
        isLandscapeMode && ifWebSmallLandscapeMode() ? 0 : 0,
      backgroundColor: Colors.linkColor[theme],
      overflow: 'hidden',
    },
    imgBgView: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
      paddingVertical: 4,
      opacity: 0.8,
      borderColor: Colors.border[theme],
      borderBottomWidth: isLandscapeMode && ifWebSmallLandscapeMode() ? 0 : 3,
    },
    thumbnail: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      paddingTop: isLandscapeMode && ifWebSmallLandscapeMode() ? 0 : 16,
      paddingLeft: 16,
      width: '100%',
      height: '100%',
      paddingHorizontal: 12,
      paddingVertical: 32,
      borderRadius: 8,
      justifyContent:
        isLandscapeMode && ifWebSmallLandscapeMode() ? 'flex-start' : 'center',
      alignItems: 'center',
      gap: isLandscapeMode && ifWebSmallLandscapeMode() ? 4 : 6,
      maxHeight: '100%',
    },
    thumbnailTextContainer: {
      flexDirection: 'row',
      color: Colors.headerTitle[theme],
      fontSize: isLandscapeMode && ifWebSmallLandscapeMode() ? smText : mdText,
      fontWeight: '700',
      verticalAlign: 'center',
    },
    thumbnailText: {
      color: Colors.mdTitle[theme],
      fontSize:
        isLandscapeMode && ifWebSmallLandscapeMode() ? mdText : smSize * 1.5,
      fontWeight: '700',
      textAlign: 'center',
      paddingBottom: isLandscapeMode && ifWebSmallLandscapeMode() ? 4 : 0,
      paddingHorizontal: 4,
      backgroundColor: Colors.btnBgColor[theme],
      borderTopLeftRadius: isLandscapeMode && ifWebSmallLandscapeMode() ? 4 : 8,
      borderTopRightRadius:
        isLandscapeMode && ifWebSmallLandscapeMode() ? 4 : 8,
      borderBottomLeftRadius:
        isLandscapeMode && ifWebSmallLandscapeMode() ? 4 : 8,
    },
    titleText: {
      flex: 1,
      fontSize: isLandscapeMode && ifWebSmallLandscapeMode() ? smText : mdText,
      color: Colors.mdTitle[theme],
      fontWeight: '500',
      textAlign: 'left',
      backgroundColor: Colors.btnBgColor[theme],
      borderTopRightRadius:
        isLandscapeMode && ifWebSmallLandscapeMode() ? 4 : 8,
      borderBottomRightRadius:
        isLandscapeMode && ifWebSmallLandscapeMode() ? 4 : 8,
      paddingEnd: 8,
      paddingBottom: isLandscapeMode && ifWebSmallLandscapeMode() ? 2 : 4,
      ...Platform.select({
        web: {
          textOverflow: 'ellipsis',
        },
      }),
    },
    customBorderRadius: {
      borderBottomRightRadius: 8,
    },
  });

export default TitleView;
