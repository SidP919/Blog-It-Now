/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import MainNavigator from './navigations/Navigator';
import {Provider} from 'react-redux';
import {Store} from './redux/Store';
import {AppState} from 'react-native';
import {deleteLocalData} from './utils/preferences';
import {AUTH_TOKEN_LOCAL} from './utils/constants';

function App() {
  useEffect(() => {
    const handleAppStateChange = async (nextAppState: string) => {
      if (nextAppState === 'inactive') {
        // App is going into the background, clear token
        await deleteLocalData(AUTH_TOKEN_LOCAL);
      }
    };

    // Add the event listener when the component mounts
    const clearTokenListener = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    // Remove the event listener when the component unmounts
    return () => {
      clearTokenListener.remove();
    };
  }, []);

  return (
    <>
      <Provider store={Store}>
        <MainNavigator />
      </Provider>
    </>
  );
}

export default App;
