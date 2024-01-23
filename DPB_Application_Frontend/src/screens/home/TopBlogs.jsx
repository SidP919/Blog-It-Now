import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import {GET_TOP_BLOGS} from '../../utils/constants';
import {NO_DATA_MSG, TOP_BLOGS_TITLE} from '../../utils/content';

const TopBlogs = () => {
  const [topBlogData, setTopBlogData] = useState([]);

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

  useEffect(() => {
    (async () => {
      const topBlogArr = await webService
        .getData(GET_TOP_BLOGS)
        .then(res => {
          logger('topBlogData:', res);
          return res.data.topBlogs;
        })
        .catch(error => logger(error));
      setTopBlogData(topBlogArr);
    })();
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
        {topBlogData?.length > 0 ? (
          <CustomCarousel data={topBlogData} RenderItem={BlogCard} />
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
        (isLandscapeMode && !ifMobileDevice()) || ifTablet()
          ? 100
          : isMobileNative
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
        ((isLandscapeMode && !ifMobileDevice()) || ifTablet()
          ? 100
          : isMobileNative
          ? 80
          : !isLandscapeMode
          ? 60
          : 48) -
        (ifMobileDevice() || ifTablet() ? 56 : 85),
      maxHeight: 556,
      justifyContent: 'flex-start',
      paddingTop: isLandscapeMode && ifWebSmallLandscapeMode() ? 0 : 0,
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
