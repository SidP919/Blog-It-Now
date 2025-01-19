import {StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  getMyBlogsData,
  setMyBlogsData,
} from '../../redux/slices/BlogsDataSlice';
import useCommonParams from '../../hooks/useCommonParams';
import {
  DATA_REFRESH_MSG_ARR,
  GET_MY_BLOGS,
  READ_BLOG_ROUTE,
} from '../../utils/constants';
import CustomCarousel from '../../components/CustomCarousel';
import BlogCard from '../../components/BlogCard';
import NoDataView from '../../components/NoDataView';
import {
  ifMobileDevice,
  ifTablet,
  ifTabletLandscapeMode,
  logger,
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
import DataRefreshLoader from '../../components/DataRefreshLoader';

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

  const myBlogs = useSelector(getMyBlogsData);
  const {isApiLoading} = useFetch(
    GET_MY_BLOGS,
    setMyBlogsData,
    'blogs',
    myBlogs,
    10 * 60 * 1000,
  );

  const handleOnBlogPress = item => {
    logger(`${item.title} is being loaded...`);
    navigate(READ_BLOG_ROUTE, {state: {item}});
  };

  if (isApiLoading) {
    return <DataRefreshLoader msgArr={DATA_REFRESH_MSG_ARR} />;
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
          handleOnBlogPress={handleOnBlogPress}
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
