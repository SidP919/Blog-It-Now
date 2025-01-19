import React from 'react';
import {useSelector} from 'react-redux';
import CustomCarousel from '../../components/CustomCarousel';
import BlogCard from '../../components/BlogCard';
import {DATA_REFRESH_MSG_ARR, GET_TOP_BLOGS} from '../../utils/constants';
import {TOP_BLOGS_TITLE} from '../../utils/content';
import {
  getTopBlogsData,
  setTopBlogsData,
} from '../../redux/slices/BlogsDataSlice';
import TitleView from '../../components/TitleView';
import useFetch from '../../hooks/useFetch';
import DataRefreshLoader from '../../components/DataRefreshLoader';
import NoDataView from '../../components/NoDataView';

const TopBlogs = ({handleOnBlogPress}) => {
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
      {topBlogs?.length > 0 ? (
        <CustomCarousel
          data={topBlogs}
          RenderItem={BlogCard}
          handleOnBlogPress={handleOnBlogPress}
        />
      ) : (
        <NoDataView />
      )}
    </>
  );
};

export default TopBlogs;
