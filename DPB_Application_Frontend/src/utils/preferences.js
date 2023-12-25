import AsyncStorage from '@react-native-async-storage/async-storage';
import {isWeb, logger} from './utils';
import {AUTH_TOKEN_LOCAL} from './constants';

export async function saveLocalData(key, value) {
  try {
    if (isWeb && key === AUTH_TOKEN_LOCAL) {
      const authToken = sessionStorage.setItem(AUTH_TOKEN_LOCAL, value);
      return authToken;
    }
    const data = await AsyncStorage.setItem(key, value);
    return data;
  } catch (err) {
    logger(`saveLocalData() :: Error-Log for key - ${key} ::`, err);
    return null;
  }
}

export async function getLocalData(key) {
  try {
    if (isWeb && key === AUTH_TOKEN_LOCAL) {
      const authToken = sessionStorage.getItem(AUTH_TOKEN_LOCAL);
      if (authToken) {
        return authToken;
      } else {
        return '';
      }
    }
    const data = await AsyncStorage.getItem(key);
    if (data) {
      return data;
    } else {
      return '';
    }
  } catch (err) {
    logger(`getLocalData() :: Error-Log for key - ${key} ::`, err);
    return null;
  }
}

export async function deleteLocalData(key) {
  try {
    if (isWeb && key === AUTH_TOKEN_LOCAL) {
      const authToken = sessionStorage.removeItem(AUTH_TOKEN_LOCAL);
      if (authToken) {
        return authToken;
      } else {
        return '';
      }
    }
    const data = await AsyncStorage.removeItem(key);
    if (data) {
      return data;
    } else {
      return '';
    }
  } catch (err) {
    logger(`deleteLocalData() :: Error-Log for key - ${key} ::`, err);
    return null;
  }
}
