import {useCallback, useEffect, useState} from 'react';
import {logger} from '../utils/utils';
import webService from '../services/web-service';
import {DATA_REFRESH_DELAY} from '../utils/constants';

const useFetch = (API, delay) => {
  const [data, setData] = useState();
  const [isApiLoading, setIsApiLoading] = useState(false);
  const fetchData = useCallback(async () => {
    setIsApiLoading(true);
    await webService
      .getData(API)
      .then(res => {
        setData(res.data);
        setIsApiLoading(false);
      })
      .catch(error => logger(error));
  }, [API]);

  useEffect(() => {
    fetchData();
    const fetchDataInterval = setInterval(
      fetchData,
      delay ? delay : DATA_REFRESH_DELAY,
    );
    return () => {
      clearInterval(fetchDataInterval);
    };
  }, [delay, fetchData]);
  return {data, isApiLoading};
};

export default useFetch;
