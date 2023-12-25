/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
const json = require('./app.json');
const appName = json.name;

AppRegistry.registerComponent(appName, () => App);
if (window?.document) {
  AppRegistry.runApplication(appName, {
    rootTag: document.getElementById('root'),
  });
}
