import {useNavigation} from '@react-navigation/native';

const useCustomNavigate = () => {
  const navigate = useNavigation().navigate;

  return {navigate};
};

export default useCustomNavigate;
