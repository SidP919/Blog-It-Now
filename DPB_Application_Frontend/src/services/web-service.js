import {Alert} from 'react-native-web';
import axios from 'axios';
import {
  CB_TYPES_WITH_CANCEL,
  GENERIC,
  INVALID_USER,
  LOG_OUT,
  isWeb,
  logger,
} from '../utils/utils';
import {setAlertData} from '../redux/slices/AlertSlice';
import {
  CANCEL_BTN_TEXT,
  CONFIRM_BTN_TEXT,
  GENERIC_ALERT_TITLE,
  GENERIC_API_RES_ERROR,
  GENERIC_ERROR_MSG,
  GENERIC_ERROR_TITLE,
  INTERNAL_SERVER_ERROR,
  UNKNOWN_ERROR_MSG,
  UNKNOWN_ERROR_TITLE,
} from '../utils/content';
import {resetLoginState} from '../redux/slices/AuthSlice';
import {deleteLocalData, getLocalData} from '../utils/preferences';
import {
  API_ID,
  AUTH_TOKEN_LOCAL,
  DEV_URL,
  LOGOUT_API,
  PROD_URL,
} from '../utils/constants';
import {setIsApiLoading} from '../redux/slices/ApiLoadingSlice';

let dispatch = null;

export function setDispatch(d) {
  dispatch = d;
}

export function getDispatch() {
  return dispatch;
}

export function showCustomAlert(
  title = GENERIC_ERROR_TITLE,
  msg = GENERIC_ERROR_MSG,
  callbackType = GENERIC,
) {
  if (dispatch) {
    dispatch(setAlertData({title, msg, callbackType}));
  } else {
    if (isWeb) {
      // eslint-disable-next-line no-alert
      const result = window.confirm([title, msg].filter(Boolean).join('\n'));
      // NOTE: <array>.filter(Boolean) ensures empty strings cannot be passed to the <array>
      if (result) {
        window.location.reload();
        return;
      } else {
        return;
      }
    } else {
      Alert.alert(title ?? GENERIC_ALERT_TITLE, msg, [
        CB_TYPES_WITH_CANCEL.includes(callbackType) && {
          text: CANCEL_BTN_TEXT,
          onPress: () => {
            return;
          },
        },
        {
          text: CONFIRM_BTN_TEXT,
          onPress: () => {
            return;
          },
        },
      ]);
    }
  }
}

export async function logoutHandler() {
  await webService
    .authenticate(LOGOUT_API)
    .then(response => {
      logger('logoutHandler: response:', response);
      if (response && response.data.success) {
        deleteLocalData(AUTH_TOKEN_LOCAL);
        if (dispatch) {
          dispatch(resetLoginState());
        } else {
          logger('logoutHandler Logging', "dispatch doesn't exist");
          showCustomAlert(GENERIC_ERROR_TITLE, GENERIC_ERROR_MSG, GENERIC);
        }
      } else {
        logger('logoutHandler: Response is empty it seems.');
      }
    })
    .catch(err => {
      logger('logoutHandler: Response Error:', err);
    });
}

export const isProduction = isWeb
  ? process.env.NODE_ENV === 'production'
    ? true
    : false
  : false; // set this true for production on native devices.

const BASE_URL = isProduction ? PROD_URL + API_ID : DEV_URL + API_ID; // localhost should be replaced with your machine

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 8000, // Adjust timeout as needed
});

export async function getAuthToken() {
  try {
    const token = await getLocalData(AUTH_TOKEN_LOCAL);
    return token;
  } catch (err) {
    logger('Error retrieving AUTH_TOKEN', err);
  }
}

// Request interceptor to include the authorization token in the headers
axiosInstance.interceptors.request.use(
  async config => {
    const authToken = await getAuthToken();
    if (authToken) {
      config.headers.Authorization = `${authToken}`;
      config.headers['Content-Type'] = 'application/json';
      config.headers.Accept = 'application/json';
    }
    return config;
  },
  error => {
    logger('Invalid Req Error', error);
    // showCustomAlert(
    //   GENERIC_ERROR_TITLE,
    //   error?.message || GENERIC_API_REQ_ERROR,
    //   GENERIC,
    // );
    return Promise.reject(error);
  },
);

// Interceptor for handling production-ready errors
axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    logger('Response Error', JSON.stringify(error));
    const errorMessage = error.response?.data?.message || GENERIC_API_RES_ERROR;
    const unknownErrMsg = error.response?.data?.message || error.message;

    // Handle specific error cases if needed
    if (error.response?.status === 500) {
      // Redirect to login
      showCustomAlert(GENERIC_ERROR_TITLE, INTERNAL_SERVER_ERROR, LOG_OUT);
      logger('Server error:', errorMessage);
    } else if (
      error.response?.status === 400 ||
      error.response?.status === 401
    ) {
      showCustomAlert(GENERIC_ERROR_TITLE, errorMessage, INVALID_USER);
      logger('Authentication error:', errorMessage);
    } else if (error.response?.status === 403) {
      deleteLocalData(AUTH_TOKEN_LOCAL);
      logger('Forbidden Access error:', errorMessage);
    } else if (error.response?.status === 404) {
      showCustomAlert(GENERIC_ERROR_TITLE, errorMessage, GENERIC);
      // Handle not found error
      logger('Resource not found:', errorMessage);
    } else if (error.response?.status === 405) {
      showCustomAlert(GENERIC_ALERT_TITLE, GENERIC_ERROR_MSG, GENERIC);
      logger('API error:', JSON.stringify(error));
    } else {
      // Handle generic error
      showCustomAlert(
        UNKNOWN_ERROR_TITLE,
        UNKNOWN_ERROR_MSG + unknownErrMsg,
        GENERIC,
      );
      logger('Unknown Error:', JSON.stringify(error));
    }
    return Promise.reject(errorMessage);
  },
);

// Functions for different types of API calls
const webService = {
  authenticate: async (API, credentials) => {
    try {
      dispatch && dispatch(setIsApiLoading(true));
      const response = await axiosInstance.post(API, credentials).then(res => {
        dispatch && dispatch(setIsApiLoading(false));
        return res;
      });
      return response;
    } catch (error) {
      dispatch && dispatch(setIsApiLoading(false));
      throw error;
    }
  },

  getData: async API => {
    try {
      dispatch && dispatch(setIsApiLoading(true));
      const response = await axiosInstance.get(API).then(res => {
        dispatch && dispatch(setIsApiLoading(false));
        return res;
      });
      return response;
    } catch (error) {
      dispatch(setIsApiLoading(false));
      throw error;
    }
  },

  postData: async (API, data) => {
    try {
      dispatch && dispatch(setIsApiLoading(true));
      const response = await axiosInstance.post(API, data).then(res => {
        dispatch && dispatch(setIsApiLoading(false));
        return res;
      });
      return response;
    } catch (error) {
      dispatch(setIsApiLoading(false));
      throw error;
    }
  },

  updateData: async (API, id, data) => {
    try {
      dispatch && dispatch(setIsApiLoading(true));
      const response = await axiosInstance
        .put(`${API}${id}`, data)
        .then(res => {
          dispatch && dispatch(setIsApiLoading(false));
          return res;
        });
      return response;
    } catch (error) {
      dispatch(setIsApiLoading(false));
      throw error;
    }
  },

  deleteData: async (API, id) => {
    try {
      dispatch && dispatch(setIsApiLoading(true));
      const response = await axiosInstance.delete(`${API}${id}`).then(res => {
        dispatch && dispatch(setIsApiLoading(false));
        return res;
      });
      return response;
    } catch (error) {
      dispatch(setIsApiLoading(false));
      throw error;
    }
  },
};

export default webService;
