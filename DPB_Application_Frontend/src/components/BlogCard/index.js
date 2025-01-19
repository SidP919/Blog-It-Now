import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';
import useCommonParams from '../../hooks/useCommonParams';
import {FONT_INTER_MEDIUM, FONT_INTER_REGULAR} from '../../utils/fontUtils';
import {
  ifMobileDevice,
  ifTablet,
  ifWebSmallLandscapeMode,
  isMobileNative,
} from '../../utils/utils';
import Img from '../Img';
import {DISLIKE_SOLID_ICON, LIKE_SOLID_ICON} from '../../utils/images';
import {formattedDate, getPrettyNumber} from '../../utils/jsUtils';
import TitleThumbnail from '../TitleThumbnail';
import {
  BLOG_AUTHOR_TITLE,
  BLOG_CATEGORY_TITLE,
  BLOG_DATE_TITLE,
} from '../../utils/content';

const BlogCard = ({
  item,
  itemWidth,
  setContinueAutoScroll,
  handleOnBlogPress,
}) => {
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
      onPress={() => handleOnBlogPress(item)}
      onHoverIn={() => setContinueAutoScroll && setContinueAutoScroll(false)}
      onHoverOut={() => setContinueAutoScroll && setContinueAutoScroll(true)}
      onPressIn={() => setContinueAutoScroll && setContinueAutoScroll(false)}
      onPressOut={() => setContinueAutoScroll && setContinueAutoScroll(true)}
      onLongPress={() => setContinueAutoScroll && setContinueAutoScroll(false)}>
      <View style={[styles.imgView]}>
        {item?.blogThumbnail ? (
          <Image
            source={{uri: item.blogThumbnail}}
            style={[styles.img]}
            resizeMode={'cover'}
          />
        ) : (
          <TitleThumbnail title={item.title} />
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
            {item?.category?.toUpperCase()}
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
            source={LIKE_SOLID_ICON}
            width={16}
            height={16}
            color={Colors.sideBarHeaderLogo[theme]}
          />
          <Text style={[styles.likeDislikeText]}>
            {getPrettyNumber(item.likesCount)}
          </Text>
          <Img
            source={DISLIKE_SOLID_ICON}
            width={16}
            height={16}
            color={Colors.sideBarHeaderLogo[theme]}
          />
          <Text style={[styles.likeDislikeText]}>
            {getPrettyNumber(item.dislikesCount)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};
//rerender BlogCard only when _id or itemWidth changes
export default memo(BlogCard, (prevProps, nextProps) => {
  return (
    prevProps.item._id === nextProps.item._id &&
    prevProps.itemWidth === nextProps.itemWidth
  );
});

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
      width: itemWidth,
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
      borderColor: Colors.border[theme],
      borderWidth: 3,
      borderRadius: 25.5,
      marginHorizontal:
        ifMobileDevice() && !isMobileNative ? 8 : isMobileNative ? 16 : 0,
    },
    imgView: {
      flex: isLandscapeMode && ifWebSmallLandscapeMode() ? null : 1,
      height: isLandscapeMode && ifWebSmallLandscapeMode() ? '100%' : null,
      width: isLandscapeMode && ifWebSmallLandscapeMode() ? '40%' : '100%',
      maxHeight: isLandscapeMode && ifWebSmallLandscapeMode() ? '100%' : '55%',
      borderColor: Colors.border[theme],
      borderBottomWidth: isLandscapeMode && ifWebSmallLandscapeMode() ? 0 : 3,
      borderRightWidth: isLandscapeMode && ifWebSmallLandscapeMode() ? 3 : 0,
    },
    img: {
      height: '100%',
      width: '100%',
      borderTopLeftRadius:
        isLandscapeMode && ifWebSmallLandscapeMode() ? 22 : 22,
      borderTopRightRadius:
        isLandscapeMode && ifWebSmallLandscapeMode() ? 0 : 22,
      borderBottomLeftRadius:
        isLandscapeMode && ifWebSmallLandscapeMode() ? 22 : 0,
      borderBottomRightRadius:
        isLandscapeMode && ifWebSmallLandscapeMode() ? 0 : 0,
      justifyContent: 'flex-start',
      left: 0,
    },
    infoView: {
      width: isLandscapeMode && ifWebSmallLandscapeMode() ? '60%' : '100%',
      minHeight: isLandscapeMode && ifWebSmallLandscapeMode() ? '100%' : '45%',
      justifyContent: 'flex-start',
      paddingHorizontal: 12,
      paddingBottom: 8,
    },
    dataView: {
      minHeight: isLandscapeMode && ifWebSmallLandscapeMode() ? 36 : 53,
      marginTop: isLandscapeMode && ifWebSmallLandscapeMode() ? 4 : 12,
      marginBottom: isLandscapeMode && ifWebSmallLandscapeMode() ? 2 : 4,
      overflowY: 'hidden',
      justifyContent: 'center',
    },
    dataContentView: {
      minHeight: isLandscapeMode && ifWebSmallLandscapeMode() ? 14 : 24,
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
      color: Colors.mdTitle[theme],
      paddingVertical: 3,
      alignItems: 'center',
    },
    likeDislikeView: {
      flexDirection: 'row',
      flexWrap:
        isLandscapeMode && ifWebSmallLandscapeMode() ? 'wrap' : 'nowrap',
      maxWidth: 82,
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingVertical: 6,
      position:
        isLandscapeMode && ifWebSmallLandscapeMode() ? 'absolute' : null,
      bottom: isLandscapeMode && ifWebSmallLandscapeMode() ? '10%' : null,
      left: isLandscapeMode && ifWebSmallLandscapeMode() ? '-64%' : null,
      backgroundColor:
        isLandscapeMode && ifWebSmallLandscapeMode()
          ? Colors.bgColor[theme]
          : null,
      opacity: isLandscapeMode && ifWebSmallLandscapeMode() ? 0.5 : 1,
      borderRadius: 8,
    },
    likeDislikeText: {
      fontSize: mdSize,
      fontWeight: '700',
      fontFamily: FONT_INTER_MEDIUM,
      textAlign: 'left',
      color: Colors.title[theme],
      minWidth: 41,
    },
  });
