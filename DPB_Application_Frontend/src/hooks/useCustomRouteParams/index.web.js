import {useLocation} from 'react-router-dom';

const useCustomRouteParams = (route = null) => {
  const location = useLocation();
  const params = location.state;
  return {params};
};

export default useCustomRouteParams;

// How to use this hook?
// when you are using navigate method from useCustomNavigate hook,
// and want to send some route parameters to the next screen
// then, use navigate like this-
//      navigate(SCREEN_NAME, {state: {param1: param1Value, param2: param2Value, ...}})
// and to receive this params data in next screen,
// use useCustomRouteParams like this-
//      const {params} = useCustomRouteParams(route);
//      const param1 = params.param1
// now, we can use param1 in our current component.
