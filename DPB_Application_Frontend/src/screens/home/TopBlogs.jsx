import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import CustomCarousel from '../../components/CustomCarousel';
import BlogCard from '../../components/BlogCard';
import {DATA_REFRESH_DELAY, GET_TOP_BLOGS} from '../../utils/constants';
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
  const {fetchData} = useFetch();

  useEffect(() => {
    const fetchTopBlogs = async () => {
      await fetchData(GET_TOP_BLOGS).then(apiRes => {
        dispatch(setTopBlogsData(apiRes.topBlogs));
      });
    };
    if (Array.isArray(topBlogs) && topBlogs.length < 1) {
      fetchTopBlogs();
    }
    const topBlogsInterval = setInterval(fetchTopBlogs, DATA_REFRESH_DELAY);
    return () => {
      clearInterval(topBlogsInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <TitleView title={TOP_BLOGS_TITLE} />
      <CustomCarousel data={topBlogs} RenderItem={BlogCard} />
    </>
  );
};

export default TopBlogs;
