import {useCallback, useState} from 'react';
import {logger} from '../utils/utils';
import webService from '../services/web-service';

const useFetch = () => {
  const [isApiLoading, setIsApiLoading] = useState(false);
  const fetchData = useCallback(async API => {
    setIsApiLoading(true);
    const apiRes = await webService
      .getData(API)
      .then(res => {
        setIsApiLoading(false);
        return res.data;
      })
      .catch(error => {
        setIsApiLoading(false);
        logger(error);
      });
    return apiRes;
  }, []);
  return {fetchData, isApiLoading};
};

export default useFetch;
