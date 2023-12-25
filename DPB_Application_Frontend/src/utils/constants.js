// ======================================= App constants =======================================
export const PROD_URL = '';
// // If your backend is running in dev env at http://localhost:4000
// // Then, android emulator will throw error when calling backend API
// // To resolve this error, in command-prompt terminal, please run: ipconfig
// // Copy the IPv4 address, and replace it with "localhost" in DEV_URL
export const DEV_URL = 'http://localhost:4000';
export const APP_EMAIL = 'blog.it.now.app@gmail.com';
export const APP_ID = 'BIN95';

// ======================================= Auth constants =======================================
export const AUTH_TOKEN_LOCAL = `${APP_ID}_AUTH_TOKEN`;

// ======================================= API Constants =======================================
export const API_ID = '/api/v1';
// AUTH APIs:
export const REGISTER_API = '/auth/register';
export const LOGIN_API = '/auth/login';
export const IS_TOKEN_VALID_API = '/auth/protected';
export const LOGOUT_API = '/auth/logout';
export const PWD_RESET_REQ_API = '/auth/passwordResetRequest';
export const RESET_PWD_API = '/auth/resetPassword';
export const DELETE_AC_API = '/auth/deleteAccount';
export const VERIFY_EMAIL_API = '/auth/verifyEmail';
// OTHER DATA APIs & constants:
export const GET_OTHER_DATA = '/otherData/getData';
export const ANDROID_DOWNLOAD_LINK = 'ANDROID_DOWNLOAD_LINK';
export const IOS_DOWNLOAD_LINK = 'IOS_DOWNLOAD_LINK';
export const GET_ANDROID_LINK = `/otherData/getData?key=${ANDROID_DOWNLOAD_LINK}`;
export const GET_IOS_LINK = `/otherData/getData?key=${IOS_DOWNLOAD_LINK}`;

// ======================================= Navigation-Route constants =======================================
export const DEFAULT_ROUTE = 'Login';
export const LOGIN_ROUTE = 'Login';
export const DASHBOARD_ROUTE = 'Dashboard';
export const PROFILE_ROUTE = 'Profile';
export const SETTINGS_ROUTE = 'Settings';
export const LOGOUT_ROUTE = 'Logout';
export const REGISTER_ROUTE = 'Register';
export const FORGOT_PWD_ROUTE = 'ForgotPwd';
export const PWD_RESET_ROUTE = 'resetPassword';
export const VERIFY_EMAIL_ROUTE = 'verifyEmail';

// ======================================= Theme constants ================================
export const THEME_NAME_LOCAL = `${APP_ID}_APPv1_THEME`;
export const COLOR_NAME_LOCAL = `${APP_ID}_APPv1_COLOR`;
export const LIGHT_THEME = 'LIGHT';
export const DARK_THEME = 'DARK';
export const THEME_COLOR_PURPLE = 'PURPLE';
export const THEME_COLOR_ORANGE = 'ORANGE';

// ======================================= Screen constants ===============================
// ProfileScreen:
export const MAX_LEN_OF_NAME = 26;
