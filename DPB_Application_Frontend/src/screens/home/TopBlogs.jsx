import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import useCommonParams from '../../hooks/useCommonParams';
import {postAuthScreenStyle} from '../../utils/commonStyles';
import CustomCarousel from '../../components/CustomCarousel';
import BlogCard from '../../components/BlogCard';
import {
  ifMobileDevice,
  ifTablet,
  ifWebSmallLandscapeMode,
  isMobileNative,
  logger,
} from '../../utils/utils';
import webService from '../../services/web-service';
import {DATA_REFRESH_DELAY, GET_TOP_BLOGS} from '../../utils/constants';
import {NO_DATA_MSG, TOP_BLOGS_TITLE} from '../../utils/content';
import {
  getTopBlogsData,
  setTopBlogsData,
} from '../../redux/slices/BlogsDataSlice';

const TopBlogs = () => {
  const topBlogs = useSelector(getTopBlogsData);
  const dispatch = useDispatch();
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

  const commonStyles = postAuthScreenStyle(
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

  const fetchTopBlogs = useCallback(async () => {
    const topBlogRes = await webService
      .getData(GET_TOP_BLOGS)
      .then(res => {
        return res.data.topBlogs;
      })
      .catch(error => logger(error));
    if (Array.isArray(topBlogRes)) {
      dispatch(setTopBlogsData(topBlogRes));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (Array.isArray(topBlogs) && topBlogs.length < 1) {
      fetchTopBlogs();
    }
    const topBlogsInterval = setInterval(fetchTopBlogs, DATA_REFRESH_DELAY);
    return () => {
      clearInterval(topBlogsInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  return (
    <>
      <View style={[styles.sectionTitleView]}>
        <Text style={[commonStyles.sectionTitle, styles.sectionTitle]}>
          {TOP_BLOGS_TITLE}
        </Text>
      </View>
      <View style={[styles.carouselView]} accessible={false}>
        {topBlogs?.length > 0 ? (
          <CustomCarousel data={topBlogs} RenderItem={BlogCard} />
        ) : (
          <View style={[styles.noDataView]}>
            <Text style={[commonStyles.dataTitle, styles.noDataText]}>
              {NO_DATA_MSG}
            </Text>
          </View>
        )}
      </View>
    </>
  );
};

export default TopBlogs;

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
    sectionTitleView: {
      height:
        (isLandscapeMode && !ifMobileDevice()) || ifTablet() || isMobileNative
          ? 80
          : !isLandscapeMode
          ? 60
          : 48,
      justifyContent: 'center',
      alignItems: 'center',
    },
    sectionTitle: {
      textAlign: 'center',
      textDecorationLine: 'none',
    },
    carouselView: {
      height:
        screenHeight -
        ((isLandscapeMode && !ifMobileDevice()) || ifTablet() || isMobileNative
          ? 80
          : !isLandscapeMode
          ? 60
          : 48) -
        (ifMobileDevice() || ifTablet() ? 56 : 85),
      maxHeight: 556,
      justifyContent: 'flex-start',
      paddingTop: 0,
      alignItems: 'center',
    },
    noDataView: {
      height: '80%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    noDataText: {
      textAlign: 'center',
    },
  });
