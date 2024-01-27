import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import CustomCarousel from '../../components/CustomCarousel';
import BlogCard from '../../components/BlogCard';
import {GET_TOP_BLOGS} from '../../utils/constants';
import {TOP_BLOGS_TITLE} from '../../utils/content';
import {
  getTopBlogsData,
  setTopBlogsData,
} from '../../redux/slices/BlogsDataSlice';
import TitleView from '../../components/TitleView';
import useFetch from '../../hooks/useFetch';

const TopBlogs = () => {
  const topBlogs = useSelector(getTopBlogsData);
  const dispatch = useDispatch();
  const {data} = useFetch(GET_TOP_BLOGS);

  useEffect(() => {
    if (data && data.topBlogs && Array.isArray(data.topBlogs)) {
      dispatch(setTopBlogsData(data.topBlogs));
    }
  }, [data, dispatch]);

  return (
    <>
      <TitleView title={TOP_BLOGS_TITLE} />
      <CustomCarousel data={topBlogs} RenderItem={BlogCard} />
    </>
  );
};

export default TopBlogs;
