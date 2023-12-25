import {useLocation} from 'react-router-dom';
const useQueryParams = () => {
  const location = useLocation();

  // Access the query parameters from the location object
  const queryParams = new URLSearchParams(location.search);

  return queryParams;
};

export default useQueryParams;
