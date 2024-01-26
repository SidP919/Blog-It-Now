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
          contentContainerStyle={[styles.titleScrollView]}
          showsVerticalScrollIndicator={ifMobileDevice() ? true : false}>
          <View style={[styles.thumbnail]}>
            {title?.split(' ').map((w, i) => {
              return (
                <View
                  numberOfLines={1}
                  key={'tt_' + i}
                  style={[styles.thumbnailTextContainer]}>
                  <View
                    style={[
                      styles.thumbnailMainCharView,
                      w.length === 1 && styles.customBorderRadius,
                    ]}>
                    <Text style={[styles.thumbnailMainChar]}>
                      {w.toUpperCase().charAt(0)}
                    </Text>
                  </View>
                  {w.length > 1 && (
                    <View style={[styles.thumbnailTextView]}>
                      <Text numberOfLines={1} style={styles.titleText}>
                        {w.slice(1).toUpperCase()}
                      </Text>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
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
      opacity: 0.8,
    },
    titleScrollView: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
    },
    thumbnail: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      // paddingTop: isLandscapeMode && ifWebSmallLandscapeMode() ? 0 : 16,
      paddingLeft: 16,
      paddingHorizontal: 12,
      paddingVertical: isLandscapeMode && ifWebSmallLandscapeMode() ? 16 : 32,
      borderRadius: 8,
      justifyContent:
        isLandscapeMode && ifWebSmallLandscapeMode() ? 'flex-start' : 'center',
      alignItems: 'center',
      gap: isLandscapeMode && ifWebSmallLandscapeMode() ? 4 : 6,
      maxHeight: '100%',
    },
    thumbnailTextContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    thumbnailMainCharView: {
      height:
        isLandscapeMode && ifWebSmallLandscapeMode() ? bigSize : bigSize * 1.3,
      justifyContent: 'flex-end',
      paddingBottom: isLandscapeMode && ifWebSmallLandscapeMode() ? 1 : 0,
      paddingLeft: 4,
      paddingRight: 4,
      backgroundColor: Colors.btnBgColor[theme],
      borderTopLeftRadius: isLandscapeMode && ifWebSmallLandscapeMode() ? 4 : 8,
      borderTopRightRadius:
        isLandscapeMode && ifWebSmallLandscapeMode() ? 4 : 8,
      borderBottomLeftRadius:
        isLandscapeMode && ifWebSmallLandscapeMode() ? 4 : 8,
    },
    thumbnailMainChar: {
      color: Colors.mdTitle[theme],
      fontSize:
        isLandscapeMode && ifWebSmallLandscapeMode() ? mdText : smSize * 1.5,
      fontWeight: '700',
      textAlign: 'center',
    },
    thumbnailTextView: {
      height:
        isLandscapeMode && ifWebSmallLandscapeMode()
          ? bigSize * 0.75
          : bigSize * 0.9,
      justifyContent: 'flex-end',
      backgroundColor: Colors.btnBgColor[theme],
      borderTopRightRadius:
        isLandscapeMode && ifWebSmallLandscapeMode() ? 4 : 8,
      borderBottomRightRadius:
        isLandscapeMode && ifWebSmallLandscapeMode() ? 4 : 8,
      paddingEnd: 8,
      paddingBottom: isLandscapeMode && ifWebSmallLandscapeMode() ? 2 : 3,
    },
    titleText: {
      fontSize: isLandscapeMode && ifWebSmallLandscapeMode() ? smText : mdText,
      color: Colors.mdTitle[theme],
      fontWeight: '500',
      textAlign: 'left',
    },
    customBorderRadius: {
      borderBottomRightRadius:
        isLandscapeMode && ifWebSmallLandscapeMode() ? 4 : 8,
    },
  });

export default TitleView;
