import React from 'react';
import {useSelector} from 'react-redux';
import CustomCarousel from '../../components/CustomCarousel';
import BlogCard from '../../components/BlogCard';
import {DATA_REFRESH_MSG_ARR, GET_TOP_BLOGS} from '../../utils/constants';
import {PLEASE_WAIT_TEXT, TOP_BLOGS_TITLE} from '../../utils/content';
import {
  getTopBlogsData,
  setTopBlogsData,
} from '../../redux/slices/BlogsDataSlice';
import TitleView from '../../components/TitleView';
import useFetch from '../../hooks/useFetch';
import ThreeDotsLoader from '../../components/ThreeDotsLoader';
import {StyleSheet, View} from 'react-native';
import useCommonParams from '../../hooks/useCommonParams';
import {ifMobileDevice, ifTabletLandscapeMode} from '../../utils/utils';
import DataRefreshLoader from '../../components/DataRefreshLoader';

const TopBlogs = () => {
  const topBlogs = useSelector(getTopBlogsData);
  const {isApiLoading} = useFetch(
    GET_TOP_BLOGS,
    setTopBlogsData,
    'topBlogs',
    topBlogs,
    5 * 60 * 1000,
  );

  if (isApiLoading) {
    return <DataRefreshLoader msgArr={DATA_REFRESH_MSG_ARR} />;
  }

  return (
    <>
      <TitleView title={TOP_BLOGS_TITLE} />
      <CustomCarousel data={topBlogs} RenderItem={BlogCard} />
    </>
  );
};

export default TopBlogs;
