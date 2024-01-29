import {useCallback, useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {logger} from '../utils/utils';
import webService from '../services/web-service';
import {DATA_REFRESH_DELAY} from '../utils/constants';

const useFetch = (
  API,
  dispatchMethod,
  keyName,
  currentVal,
  delay = DATA_REFRESH_DELAY,
) => {
  const [isApiLoading, setIsApiLoading] = useState(false);
  const dispatch = useDispatch();
  const fetchData = useCallback(async () => {
    setIsApiLoading(true);
    const apiRes = await webService
      .getData(API)
      .then(res => {
        dispatch(dispatchMethod(res.data[keyName]));
        setIsApiLoading(false);
        return res.data;
      })
      .catch(error => {
        setIsApiLoading(false);
        logger(error);
      });
    return apiRes;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (Array.isArray(currentVal) && currentVal.length < 1) {
      fetchData();
    }
    const dataFetchInterval = setInterval(fetchData, delay);
    return () => {
      clearInterval(dataFetchInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {isApiLoading};
};

export default useFetch;
/**
 * Sample code for understanding how to use useFetch hook in other components:
 *
    const {isApiLoading} = useFetch(
      /blogs/getTopBlogs,
      setMyBlogsData, // action-name from our redux-slice to be used to update the current value in redux-state
      'blogs', // key-name of the data we are getting from response.data object in response from backend API
      myBlogs, // current value of the data in our redux-state and which is also being used in our UI component
      10 * 60 * 1000, // delay in milliseconds before fetching the data again from the backend API
    );
 *
 */
