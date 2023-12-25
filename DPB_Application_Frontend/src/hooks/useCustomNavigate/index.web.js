import {useNavigate} from 'react-router-dom';
const useCustomNavigate = () => {
  const navigation = useNavigate();
  const navigate = (screenName, options) =>
    typeof screenName === 'number'
      ? navigation(screenName)
      : navigation(`/${screenName}`, options);

  return {navigate};
};

export default useCustomNavigate;
