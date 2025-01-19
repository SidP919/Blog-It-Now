import {Pressable, ScrollView, StyleSheet, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import useCommonParams from '../../hooks/useCommonParams';
import {READ_BLOG_TITLE} from '../../utils/content';
import {DEFAULT_ROUTE, READ_BLOG_ROUTE} from '../../utils/constants';
import {postAuthScreenStyle} from '../../utils/commonStyles';
import HeaderWrapper from '../HeaderWrapper';
import {
  ifMobileDevice,
  ifTablet,
  ifWebSmallLandscapeMode,
  isMobileNative,
  isWeb,
  logger,
} from '../../utils/utils';
import {FONT_INTER_MEDIUM, FONT_INTER_REGULAR} from '../../utils/fontUtils';
import webService from '../../services/web-service';
import BlogContent from './BlogContent';
import useCustomNavigate from '../../hooks/useCustomNavigate';
import {getTopBlogsData} from '../../redux/slices/BlogsDataSlice';
import MoreBlogs from './MoreBlogs';
import useCustomRouteParams from '../../hooks/useCustomRouteParams';

const ReadBlogScreen = ({route = null}) => {
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

  let styles = postAuthScreenStyle(
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

  const dispatch = useDispatch();
  const {params} = useCustomRouteParams(route);
  const {navigate} = useCustomNavigate();
  const topBlogs = useSelector(getTopBlogsData);
  const item = params?.item;
  const [blogData, setBlogData] = useState(null);
  const [isApiLoading, setIsApiLoading] = useState(false);

  useEffect(() => {
    if (item && (!blogData || item._id !== blogData.id)) {
      setIsApiLoading(true);
      webService
        .getData(`blogs/getBlog/${item._id}`)
        .then(response => response.data)
        .then(data => {
          setBlogData(data?.blog);
          logger('blog: data:', data);
          setIsApiLoading(false);
        })
        .catch(err => {
          logger(`ReadBlogScreen: blogs/getBlog/${item._id} threw error:`, err);
          setIsApiLoading(false);
        });
    }
  }, [blogData, item]);

  useEffect(() => {
    if (isWeb && !item) {
      navigate(DEFAULT_ROUTE, {replace: true});
    }
  }, [item, navigate]);

  return (
    <HeaderWrapper
      title={READ_BLOG_TITLE}
      currentScreen={READ_BLOG_ROUTE}
      isApiLoading={isApiLoading}>
      <ScrollView
        contentContainerStyle={[styles.screenContent]}
        showsVerticalScrollIndicator={false}>
        <Pressable style={[customStyles.blogScreenContent]}>
          {blogData && <BlogContent blogData={blogData} />}
          {topBlogs && blogData && (
            <MoreBlogs
              moreBlogs={topBlogs?.filter(b => b._id !== blogData.id)}
            />
          )}
        </Pressable>
      </ScrollView>
    </HeaderWrapper>
  );
};

export default ReadBlogScreen;

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
      width: screenWidth,
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
      marginHorizontal: ifMobileDevice() && !isMobileNative ? 8 : 0,
      marginRight: isMobileNative && ifMobileDevice() ? 32 : null,
    },
    blogScreenContent: {
      width: screenWidth,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      flexWrap: 'wrap',
      marginTop: 8,
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
