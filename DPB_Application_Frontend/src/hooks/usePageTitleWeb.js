import {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {isWeb} from '../utils/utils';
import {DEFAULT_ROUTE} from '../utils/constants';
import {APP_NAME_WITH_TAGLINE} from '../utils/content';

const usePageTitleWeb = () => {
  const location = useLocation();
  const [currentRoute, setCurrentRoute] = useState('');

  useEffect(() => {
    if (isWeb) {
      // Scroll to top when the route changes
      window.scrollTo(0, 0);
      // get pathName from location.pathname and set it as document.title
      const pathArr = location.pathname.split('/');
      const pathName = pathArr?.[pathArr.length - 1] || DEFAULT_ROUTE;
      document.title =
        pathName.charAt(0).toUpperCase() +
        pathName.slice(1) +
        ' - ' +
        APP_NAME_WITH_TAGLINE;
      setCurrentRoute(pathName);
    }
  }, [location]);

  return {currentRoute};
};

export default usePageTitleWeb;
