/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import MainNavigator from './src/navigations/Navigator';
import {enableFreeze} from 'react-native-screens';
import {Provider} from 'react-redux';
import {Store} from './src/redux/Store';

enableFreeze(true);

function App() {
  return (
    <>
      <Provider store={Store}>
        <MainNavigator />
      </Provider>
    </>
  );
}

export default App;
