import {useCallback, useEffect, useRef, useState} from 'react';
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
  const inFlightRef = useRef(false);

  const fetchData = useCallback(async () => {
    if (inFlightRef.current) {
      return;
    }

    try {
      inFlightRef.current = true;
      setIsApiLoading(true);

      const apiRes = await webService.getData(API);
      dispatch(dispatchMethod(apiRes.data?.[keyName]));

      return apiRes.data;
    } catch (error) {
      logger(error);
    } finally {
      inFlightRef.current = false;
      setIsApiLoading(false);
    }
  }, [API, dispatch, dispatchMethod, keyName]);

  useEffect(() => {
    if (currentVal === null || currentVal === undefined) {
      fetchData();
    }

    const randomInterval =
      Math.floor(Math.random() * (delay + 5000 - delay + 1)) + delay;
    const dataFetchInterval = setInterval(fetchData, randomInterval);
    return () => clearInterval(dataFetchInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, fetchData]); //adding CurrentVal in dependency array is causing infinite loop of API calls

  return {isApiLoading, fetchData};
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
