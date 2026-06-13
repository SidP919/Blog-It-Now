import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import useCommonParams from '../../hooks/useCommonParams';
import {
  COMMENTS_TITLE,
  PLEASE_WAIT_TEXT,
  READ_BLOG_TITLE,
  READ_MORE_BLOGS,
  SECTION,
} from '../../utils/content';
import {
  DEFAULT_ROUTE,
  GET_BLOG_BY_ID,
  GET_BLOG_FOR_USER,
  READ_BLOG_ROUTE,
} from '../../utils/constants';
import {postAuthScreenStyle} from '../../utils/commonStyles';
import HeaderWrapper from '../HeaderWrapper';
import {
  ifMobileDevice,
  ifTablet,
  ifWebLargeLandscapeMode,
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
import {debounce} from '../../utils/apiUtils';
import ThreeDotsLoader from '../../components/ThreeDotsLoader';
import BlogComments from './BlogComments';
import Img from '../../components/Img';
import {DOWN_ARROW, UP_ARROW} from '../../utils/images';

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
  const blog = params?.blog;
  const [blogData, setBlogData] = useState(null);
  const [isApiLoading, setIsApiLoading] = useState(false);

  const commentsRef = useRef(null);
  const isCollapsible =
    ((ifMobileDevice() || isMobileNative) && !isLandscapeMode) ||
    ifWebSmallLandscapeMode();
  const [showMoreBlogs, setShowMoreBlogs] = useState(!isCollapsible);
  const [showComments, setShowComments] = useState(!isCollapsible);

  const fetchBlogData = useCallback(async () => {
    if (!blog?._id) {
      if (isWeb) {
        navigate(DEFAULT_ROUTE, {replace: true});
      }
      return;
    }
    setIsApiLoading(true);
    try {
      const endpoint = `${isLoggedIn ? GET_BLOG_FOR_USER : GET_BLOG_BY_ID}/${
        blog._id
      }`;
      const response = await webService.getData(endpoint);
      setBlogData(response?.data?.blog);
      logger('ReadBlogScreen: fetched blog data', response?.data);
    } catch (err) {
      logger(`ReadBlogScreen: blogs/getBlog/${blog?._id} threw error:`, err);
    } finally {
      setIsApiLoading(false);
    }
  }, [blog, navigate, isLoggedIn]);

  const debouncedFetchBlogData = useMemo(
    () => debounce(fetchBlogData, 1000),
    [fetchBlogData],
  );

  useEffect(() => {
    if (blog && (!blogData || blog._id !== blogData.id)) {
      logger(
        'ReadBlogScreen: blog or blogData changed, fetching blog data...',
        {
          blog,
          blogData,
        },
      );
      debouncedFetchBlogData();
    }
    return () => {
      debouncedFetchBlogData.cancel?.();
    };
  }, [blogData, blog, debouncedFetchBlogData]);

  return (
    <HeaderWrapper
      title={READ_BLOG_TITLE}
      currentScreen={READ_BLOG_ROUTE}
      isApiLoading={isApiLoading}>
      <ScrollView
        contentContainerStyle={[styles.screenContent]}
        showsVerticalScrollIndicator={true}
        scrollEventThrottle={200}
        onScroll={e => {
          const {layoutMeasurement, contentOffset, contentSize} = e.nativeEvent;
          const paddingToBottom = 60; // tweak as needed
          if (
            layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom
          ) {
            commentsRef.current?.loadMoreComments?.();
          }
        }}>
        {!blogData ? (
          <View style={styles.apiLoadingView}>
            <ThreeDotsLoader
              theme={theme}
              size={smText}
              loaderMsg={PLEASE_WAIT_TEXT}
            />
          </View>
        ) : (
          <Pressable style={[customStyles.blogScreenContent]}>
            <BlogContent
              blogData={blogData}
              refreshBlog={debouncedFetchBlogData}
              commentsRef={commentsRef}
            />
            {(!isLandscapeMode && !ifWebLargeLandscapeMode()) ||
            ifWebSmallLandscapeMode() ? (
              <>
                <Pressable
                  onPress={() => setShowMoreBlogs(s => !s)}
                  style={[customStyles.sectionContainer]}>
                  <Text
                    style={[styles.sectionTitle, customStyles.sectionTitle]}>
                    {READ_MORE_BLOGS}
                  </Text>
                  {showMoreBlogs ? (
                    <Img
                      source={DOWN_ARROW}
                      size={20}
                      color={Colors.title[theme]}
                    />
                  ) : (
                    <Img
                      source={UP_ARROW}
                      size={20}
                      color={Colors.title[theme]}
                    />
                  )}
                </Pressable>
                {showMoreBlogs && (
                  <MoreBlogs
                    moreBlogs={topBlogs?.filter(b => b._id !== blogData?.id)}
                  />
                )}
              </>
            ) : (
              <MoreBlogs
                moreBlogs={topBlogs?.filter(b => b._id !== blogData?.id)}
              />
            )}
            {((!isLandscapeMode && !ifWebLargeLandscapeMode()) ||
              ifWebSmallLandscapeMode()) && (
              <>
                <Pressable
                  onPress={() => setShowComments(s => !s)}
                  style={[
                    customStyles.sectionContainer,
                    !showComments ? customStyles.commentsHidden : null,
                  ]}>
                  <Text
                    style={[styles.sectionTitle, customStyles.sectionTitle]}>
                    {COMMENTS_TITLE} {SECTION}
                  </Text>
                  {showComments ? (
                    <Img
                      source={DOWN_ARROW}
                      size={20}
                      color={Colors.title[theme]}
                    />
                  ) : (
                    <Img
                      source={UP_ARROW}
                      size={20}
                      color={Colors.title[theme]}
                    />
                  )}
                </Pressable>
                {showComments && (
                  <BlogComments
                    blogId={blogData?.id}
                    refreshBlog={debouncedFetchBlogData}
                    ref={commentsRef}
                  />
                )}
              </>
            )}
          </Pressable>
        )}
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
      width:
        isLandscapeMode && !ifWebSmallLandscapeMode()
          ? screenWidth - 48
          : screenWidth,
      flexDirection: 'row',
      justifyContent:
        isLandscapeMode && !ifWebSmallLandscapeMode()
          ? 'space-between'
          : 'center',
      flexWrap: 'wrap',
      marginTop: 8,
      marginHorizontal: isLandscapeMode && !ifWebSmallLandscapeMode() ? 24 : 0,
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
    sectionContainer: {
      width: screenWidth * 0.94,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 14,
      color: Colors.btnText[theme],
      backgroundColor: Colors.btnBgColor[theme],
      borderColor: Colors.border[theme],
      borderWidth: 2,
      marginBottom: 24,
    },
    commentsHidden: {
      marginBottom: 32,
    },
    sectionTitle: {
      textDecorationLine: 'none',
    },
  });
