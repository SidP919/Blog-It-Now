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
import {DISLIKE_ICON, LIKE_ICON} from '../../utils/images';
import {formattedDate, getPrettyNumber} from '../../utils/jsUtils';
import TitleView from '../TitleThumbnail';
import {
  BLOG_AUTHOR_TITLE,
  BLOG_CATEGORY_TITLE,
  BLOG_DATE_TITLE,
} from '../../utils/content';

const BlogCard = ({item, itemWidth}) => {
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
    itemWidth,
  );

  return (
    <Pressable
      style={[styles.container]}
      onPress={() => console.log(`${item.title} is being loaded...`)}>
      <View style={[styles.imgView]}>
        {item.blogThumbnail ? (
          <Image source={{uri: item.blogThumbnail}} style={[styles.img]} />
        ) : (
          <TitleView title={item.title} />
        )}
      </View>
      <View style={[styles.infoView]}>
        <View style={[styles.dataView]}>
          <Text
            style={[styles.dataTitle]}
            numberOfLines={2}
            ellipsizeMode="tail">
            {item.title}
          </Text>
        </View>
        <View style={[styles.dataContentView]}>
          <Text
            style={[styles.dataText]}
            numberOfLines={1}
            ellipsizeMode="tail">
            {BLOG_AUTHOR_TITLE}
            {item.authorName}
          </Text>
        </View>
        <View style={[styles.dataContentView]}>
          <Text
            style={[styles.dataText]}
            numberOfLines={1}
            ellipsizeMode="tail">
            {BLOG_CATEGORY_TITLE}
            {item.category}
          </Text>
        </View>
        <View style={[styles.dataContentView]}>
          <Text
            style={[styles.dataText]}
            numberOfLines={2}
            ellipsizeMode="tail">
            {BLOG_DATE_TITLE}
            {formattedDate(item.lastUpdated)}
          </Text>
        </View>

        <View style={[styles.likeDislikeView]}>
          <Img
            source={LIKE_ICON}
            width={16}
            height={16}
            color={Colors.iconOnBgColor[theme]}
          />
          <Text style={[styles.likeDislikeText]}>
            {getPrettyNumber(item.likesCount)}
          </Text>
          <View style={[styles.itemSeparatorView]} />
          <Img
            source={DISLIKE_ICON}
            width={16}
            height={16}
            color={Colors.iconOnBgColor[theme]}
          />
          <Text style={[styles.likeDislikeText]}>
            {getPrettyNumber(item.dislikesCount)}
          </Text>
        </View>
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
  itemWidth,
) =>
  StyleSheet.create({
    container: {
      width: isMobileNative ? itemWidth : itemWidth,
      flexDirection:
        isLandscapeMode && ifWebSmallLandscapeMode() ? 'row' : 'column',
      height:
        screenHeight -
        ((isLandscapeMode && !ifMobileDevice()) || ifTablet() ? 100 : 60) -
        (ifMobileDevice() || ifTablet() ? 56 : 85) -
        (isLandscapeMode && ifWebSmallLandscapeMode() ? 0 : 50) -
        32,
      maxHeight: 500,
      justifyContent:
        isLandscapeMode && ifWebSmallLandscapeMode() ? 'flex-start' : 'center',
      alignItems: 'center',
      borderColor: Colors.headerTitle[theme],
      borderWidth: 2,
      borderRadius: 24,
      marginHorizontal: ifMobileDevice() && !isMobileNative ? 8 : 0,
      marginRight: isMobileNative ? 32 : null,
    },
    imgView: {
      width: isLandscapeMode && ifWebSmallLandscapeMode() ? '40%' : '100%',
      height: isLandscapeMode && ifWebSmallLandscapeMode() ? '100%' : '55%',
    },
    img: {
      height: '100%',
      width: '100%',
      resizeMode: 'cover',
      borderTopLeftRadius:
        isLandscapeMode && ifWebSmallLandscapeMode() ? 24 : 24,
      borderTopRightRadius:
        isLandscapeMode && ifWebSmallLandscapeMode() ? 0 : 24,
      borderBottomLeftRadius:
        isLandscapeMode && ifWebSmallLandscapeMode() ? 24 : 0,
      borderBottomRightRadius:
        isLandscapeMode && ifWebSmallLandscapeMode() ? 0 : 0,
      justifyContent: 'flex-start',
      left: 0,
      borderColor: Colors.border[theme],
      borderBottomWidth: 2,
    },
    infoView: {
      width: isLandscapeMode && ifWebSmallLandscapeMode() ? '60%' : '100%',
      height: isLandscapeMode && ifWebSmallLandscapeMode() ? '100%' : '45%',
      justifyContent: 'flex-start',
      paddingHorizontal: 12,
      paddingBottom: 8,
    },
    dataView: {
      minHeight: 53,
      marginVertical: 12,
      overflowY: 'hidden',
    },
    dataContentView: {
      minHeight: 24,
      overflowY: 'hidden',
    },
    dataTitle: {
      fontSize: mdText,
      fontWeight: '700',
      fontFamily: FONT_INTER_MEDIUM,
      textAlign: 'left',
      color: Colors.mdTitle[theme],
    },
    dataText: {
      fontSize: smText,
      fontWeight: '500',
      fontFamily: FONT_INTER_REGULAR,
      textAlign: 'left',
      color: Colors.text[theme],
      paddingVertical: 3,
      alignItems: 'center',
    },
    likeDislikeView: {
      flexDirection: 'row',
      flexWrap:
        isLandscapeMode && ifWebSmallLandscapeMode() ? 'wrap' : 'nowrap',
      width: 104,
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingVertical: 6,
      position:
        isLandscapeMode && ifWebSmallLandscapeMode() ? 'absolute' : null,
      bottom: isLandscapeMode && ifWebSmallLandscapeMode() ? '10%' : null,
      left: isLandscapeMode && ifWebSmallLandscapeMode() ? '-64%' : null,
    },
    likeDislikeText: {
      fontSize: mdSize,
      fontWeight: '700',
      fontFamily: FONT_INTER_MEDIUM,
      textAlign: 'center',
      color: Colors.mdTitle[theme],
      minWidth: 50,
    },
    itemSeparatorView: {
      width: isMobileNative
        ? 2
        : isLandscapeMode && ifWebSmallLandscapeMode()
        ? 0
        : 2,
      height: '90%',
      marginHorizontal: mdSize / 2,
      backgroundColor: Colors.mdTitle[theme],
    },
  });
