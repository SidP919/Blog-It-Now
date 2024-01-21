import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import useCommonParams from '../../hooks/useCommonParams';
import {FONT_INTER_MEDIUM, FONT_INTER_REGULAR} from '../../utils/fontUtils';
import {
  ifMobileDevice,
  ifTablet,
  ifWebSmallLandscapeMode,
  isMobileNative,
} from '../../utils/utils';
import Img from '../Img';

const BlogCard = ({item}) => {
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

  // function to map time zone abbreviations
  const mapTimeZone = abbr => {
    const timeZoneMap = {
      '+5:30 GMT': 'IST',
    };

    return timeZoneMap[abbr] || abbr;
  };

  const imgUrl = item?.blogThumbnail
    ? item.blogThumbnail
    : 'https://lh3.googleusercontent.com/pw/ABLVV84ExcIuPaIOcyhoKxLL6k8JWeckN_ur1rYkm9rpjlih2ybDdnCICJsBH0HIhR4gaIIJ20WkCE5qms4oFpsj5p8wMdClFiYfSkUwWjlhp_FBxmPCPvPy22QErkAFj9LCf_VfbKdRS2zGHqgM6137qZA=w1460-h913-s-no-gm?authuser=0';
  const formattedDate = new Date(item.lastUpdated).toLocaleDateString(
    ['en-GB', 'en-US'],
    {
      day: 'numeric',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'shortGeneric',
    },
  );
  return (
    <Pressable
      style={[styles.container]}
      onPress={() => console.log(`${item.title} is being loaded...`)}>
      <View style={[styles.imgView]}>
        <Image source={{uri: imgUrl}} style={[styles.img]} />
      </View>
      <View style={[styles.infoView]}>
        <Text style={[styles.dataTitle]}>{item.title}</Text>
        <Text style={[styles.dataText]}>By {item.authorName}</Text>
        <Text style={[styles.dataText]}>Category: {item.category}</Text>
        <Text style={[styles.dataText]}>Last Updated: {formattedDate}</Text>
      </View>
    </Pressable>
  );
};

export default BlogCard;

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
    container: {
      width: isMobileNative
        ? screenWidth - 64
        : ifMobileDevice()
        ? screenWidth - 32
        : 332,
      flexDirection:
        isLandscapeMode && ifWebSmallLandscapeMode() ? 'row' : 'column',
      height:
        screenHeight -
        ((isLandscapeMode && !ifMobileDevice()) || ifTablet() ? 100 : 60) -
        (ifMobileDevice() || ifTablet() ? 56 : 85) -
        (isLandscapeMode && ifWebSmallLandscapeMode() ? 22 : 60) -
        32,
      maxHeight: 422,
      justifyContent:
        isLandscapeMode && ifWebSmallLandscapeMode() ? 'flex-start' : 'center',
      alignItems: 'center',
      borderColor: Colors.headerTitle[theme],
      borderWidth: 2,
      borderRadius: 24,
    },
    imgView: {
      width: isLandscapeMode && ifWebSmallLandscapeMode() ? '40%' : '100%',
      height: isLandscapeMode && ifWebSmallLandscapeMode() ? '100%' : '60%',
    },
    img: {
      height: '100%',
      width: '100%',
      resizeMode: 'center',
      borderRadius: 24,
      justifyContent: 'flex-start',
      left: 0,
    },
    infoView: {
      width: isLandscapeMode && ifWebSmallLandscapeMode() ? '60%' : '100%',
      height: isLandscapeMode && ifWebSmallLandscapeMode() ? '100%' : '40%',
      justifyContent: 'flex-start',
    },
    dataTitle: {
      fontSize: mdText,
      fontWeight: '700',
      fontFamily: FONT_INTER_MEDIUM,
      textAlign: 'left',
      color: Colors.mdTitle[theme],
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    dataText: {
      fontSize: smText,
      fontWeight: '500',
      fontFamily: FONT_INTER_REGULAR,
      textAlign: 'left',
      color: Colors.text[theme],
      paddingHorizontal: 12,
      paddingVertical: 8,
      alignItems: 'center',
    },
  });
