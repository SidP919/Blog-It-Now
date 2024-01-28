import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  getMyBlogsData,
  setMyBlogsData,
} from '../../redux/slices/BlogsDataSlice';
import useCommonParams from '../../hooks/useCommonParams';
import {GET_MY_BLOGS} from '../../utils/constants';
import CustomCarousel from '../../components/CustomCarousel';
import BlogCard from '../../components/BlogCard';
import NoDataView from '../../components/NoDataView';
import {
  ifMobileDevice,
  ifTablet,
  ifTabletLandscapeMode,
} from '../../utils/utils';
import TitleView from '../../components/TitleView';
import {
  CREATE_BLOG_BTN_TEXT,
  MY_BLOGS_HEADING,
  PLEASE_WAIT_TEXT,
} from '../../utils/content';
import useCustomNavigate from '../../hooks/useCustomNavigate';
import TextWithLink from '../../components/TextWithLink';
import useFetch from '../../hooks/useFetch';
import ThreeDotsLoader from '../../components/ThreeDotsLoader';

const MyBlogs = () => {
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

  const {navigate} = useCustomNavigate();
  const styles = style(
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

  const dispatch = useDispatch();
  const myBlogs = useSelector(getMyBlogsData);
  const {fetchData, isApiLoading} = useFetch();

  useEffect(() => {
    const fetchMyBlogs = async () => {
      await fetchData(GET_MY_BLOGS).then(apiRes => {
        dispatch(setMyBlogsData(apiRes.blogs));
      });
    };
    if (Array.isArray(myBlogs) && myBlogs.length < 1) {
      fetchMyBlogs();
    }
    const myBlogsInterval = setInterval(fetchMyBlogs, 10 * 60 * 1000);
    return () => {
      clearInterval(myBlogsInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isApiLoading) {
    return (
      <View style={[styles.isApiLoadingView]}>
        <ThreeDotsLoader theme={theme} loaderMsg={PLEASE_WAIT_TEXT} />
      </View>
    );
  }

  return (
    <View style={styles.myBlogsSectionContainer}>
      <View style={[styles.customHeadingView]}>
        <TitleView
          title={MY_BLOGS_HEADING}
          textAlign={'left'}
          count={myBlogs.length}
        />
        <TextWithLink
          text={CREATE_BLOG_BTN_TEXT}
          word={CREATE_BLOG_BTN_TEXT}
          onPressDoThis={() => navigate('Home')}
        />
      </View>
      {myBlogs?.length > 0 ? (
        <CustomCarousel
          data={myBlogs}
          RenderItem={BlogCard}
          autoScroll={true}
          showPaginationDots={false}
        />
      ) : (
        <NoDataView />
      )}
    </View>
  );
};

export default MyBlogs;

const style = (
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
) =>
  StyleSheet.create({
    isApiLoadingView: {
      width: screenWidth,
      height:
        screenHeight - (ifMobileDevice() || ifTabletLandscapeMode() ? 56 : 85),
    },
    myBlogsSectionContainer: {
      width: screenWidth,
      minWidth: 304,
      height: screenHeight - (ifMobileDevice() || ifTablet() ? 56 : 85),
      position: 'relative',
      backgroundColor: Colors.bgColor[theme],
      borderBottomWidth: 2,
      borderColor: Colors.border[theme],
    },
    customHeadingView: {
      paddingRight: 12,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });
