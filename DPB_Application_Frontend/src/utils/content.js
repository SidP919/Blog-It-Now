// Search for keywords: APP, COMPONENTS, TEXTS, ALERTS, SCREENS to jump to content of specific section

import {APP_EMAIL} from './constants';

// ============================APP===========================================================
export const APP_NAME = 'Blog It Now';
export const APP_TAGLINE = 'Blog It Before You Forget It';
export const APP_NAME_WITH_TAGLINE = APP_NAME + ' - ' + APP_TAGLINE;

// ============================COMPONENTS====================================================
// Components:
export const DEFAULT_BTN_TEXT = 'Click Me';
export const DEFAULT_BLOG_TITLE = 'Blog for your read';

// ============================TEXTS=========================================================
// Common texts
export const PLEASE_WAIT_TEXT = 'Please wait';
export const EXIT_TEXT = 'Exit';
export const CANCEL_BTN_TEXT = 'Cancel';
export const CONFIRM_BTN_TEXT = 'OK';
export const NO_DATA_MSG =
  'No Data Available!\nIf you beleive this is a mistake,\nthen please check your internet connection before refreshing again or try again later after sometime.';

// ============================ALERTS========================================================
// Content for Alerts in the app:
export const GENERIC_ALERT_TITLE = 'Alert!';
export const UNKNOWN_ERROR_TITLE = 'Something Went Wrong!';
export const UNKNOWN_ERROR_MSG =
  'This issue occured while connecting to the server: ';
export const GENERIC_ERROR_TITLE = 'Alert!';
export const GENERIC_ERROR_MSG =
  'Oops! something went wrong. Please refresh and try again.';
export const EXIT_APP_TITLE = 'Want to Exit?';
export const EXIT_APP_MSG =
  'Please click below OK button to exit from the application.';
export const LOG_OUT_TITLE = 'Want to Logout?';
export const LOG_OUT_MSG =
  'Please click below OK button to logout from the application.';
export const GENERIC_API_RES_ERROR =
  'Sorry! We are facing server issues at the moment. Please try again later.';
export const GENERIC_API_REQ_ERROR =
  'Oops! something went wrong at your end. Please check your network and/or try again.';
export const INVALID_TOKEN_TITLE = 'Session Expired!';
export const INVALID_TOKEN_MSG =
  'It seems your session has expired. Please Login again.';
export const INTERNAL_SERVER_ERROR =
  'Internal Server Error Occurred with Error Code: 500';
export const UNSUPPORTED_LINK_MSG =
  'Sorry! But we cannot find an app on your device to open this Link';
export const MANDATORY_FIELDS_MSG =
  'Mandatory fields cannot be empty! Please fill them and try again.';
export const CONFIRM_EMAIL_ERROR_MSG =
  'New Password and confirm password do not match with each other! Please ensure they match and try again.';

// ============================SCREENS=========================================================
// Search for below keywords to jump to the content of specific screen:
// Header,
// RegisterScreen
// LoginScreen,
// ForgotPwdScreen,
// PwdResetScreen,
// VerifyEmailScreen,
// HomeScreen,
// DashboardScreen,
// ExploreBlogsScreen,
// DashboardSidePanel,
// ProfileScreen,
// SettingsScreen,
// AboutUsScreen,
// ContactUsScreen,
// LogoutScreen,
// ForbiddenScreen,
// NotFoundScreen

// Header content
export const HOME_MENU = 'HOME';
export const DASHBOARD_MENU = 'DASHBOARD';
export const EXPLORE_BLOGS_MENU = 'EXPLORE BLOGS';
export const ABOUT_US_MENU = 'ABOUT US';
export const CONTACT_US_MENU = 'CONTACT US';
export const MY_PROFILE_MENU = 'MY PROFILE';
export const SETTINGS_MENU = 'SETTINGS';
export const LOG_OUT_MENU = 'LOG OUT';

// RegisterScreen content
export const REGISTER_TITLE = 'Create an Account';
export const REGISTER_BTN_TEXT = 'Sign Up';
export const REGISTER_LOGIN_LINK_TEXT = 'Already Have an Account ?';
export const REGISTER_LOGIN_LINK_BTN_TEXT = 'Login Here';
export const REGISTER_FULLNAME_TITLE = 'Your Full Name( Minimum 4 characters)';
export const REGISTER_EMAIL_TITLE = 'Your Email Address';
export const REGISTER_USERNAME_TITLE =
  'Create a Username(Optional or Minimum 8 characters)';
export const REGISTER_PWD_TITLE = 'Create a Password( Minimum 8 characters)';
export const REGISTER_FAV_CONTENT_TITLE =
  'Your Favorite Film/Show/Manga/Book/Genre\n(Mention Content_Type: Content_Name)';
export const REGISTER_FULLNAME_PLACEHOLDER = 'Ex. John Doe';
export const REGISTER_EMAIL_PLACEHOLDER = 'Ex. john.doe@gmail.com';
export const REGISTER_USERNAME_PLACEHOLDER = 'Ex. John_007';
export const REGISTER_PWD_PLACEHOLDER = 'Ex. john.d@4-digit-Combination';
export const REGISTER_FAV_CONTENT_PLACEHOLDER = 'Ex. Film: Avengers Endgame';
export const REGISTER_VERIFICATION_TOAST_TITLE = 'Please check your email !';
export const REGISTER_VERIFICATION_TOAST_MSG =
  'We have sent you a verification email.';
export const REGISTER_SUCCESS_TOAST_TITLE = 'Welcome !';
export const REGISTER_SUCCESS_TOAST_MSG =
  'Registration Completed Successfully.';

// LoginScreen content
export const LOGIN_TITLE = 'Have an Account ?';
export const LOGIN_BTN_TEXT = 'Log In';
export const LOGIN_EMAIL_TITLE = 'Your Email or Username';
export const LOGIN_PWD_TITLE = 'Your Password';
export const LOGIN_EMAIL_PLACEHOLDER = 'Enter Email or Username';
export const LOGIN_PWD_PLACEHOLDER = 'Enter Password';
export const LOGIN_REGISTER_LINK_TEXT = "Don't have an account ?";
export const LOGIN_FORGOT_PWD_LINK_TEXT = 'Forgot Password ?';

// ForgotPwdScreen content
export const FORGOT_PWD_TITLE = 'Forgot Password ?';
export const FORGOT_PWD_BTN_TEXT = 'Send Password Reset Link';
export const FORGOT_PWD_EMAIL_TITLE = 'Your Email';
export const FORGOT_PWD_EMAIL_PLACEHOLDER = 'Enter Email';
export const FORGOT_PWD_TOAST_SUCCESS_TITLE = 'Check your Email !';
export const FORGOT_PWD_TOAST_SUCCESS_MSG =
  'We have sent you a link to reset your password.';
export const FORGOT_PWD_TOAST_FAILURE_TITLE = 'Oops!';
export const FORGOT_PWD_TOAST_FAILURE_MSG =
  'We hit some road block on the way to your email box :(';
export const FORGOT_PWD_REGISTER_LINK_TEXT = 'Create a new account';
export const FORGOT_PWD_LOGIN_LINK_TEXT = 'Try Login again';

// ResetPwdScreen content
export const RESET_PWD_TITLE = 'Reset Your Password';
export const RESET_PWD_BTN_TEXT = 'Confirm Reset Password';
export const RESET_PWD_NEW_PWD_TITLE = 'New Password';
export const RESET_PWD_NEW_PWD_PLACEHOLDER = 'Enter New Password';
export const RESET_PWD_CONFIRM_PWD_TITLE = 'Confirm Password';
export const RESET_PWD_CONFIRM_PWD_PLACEHOLDER = 'Enter Confirm Password';
export const RESET_PWD_TOAST_SUCCESS_TITLE = 'Password Changed Successfully!';
export const RESET_PWD_TOAST_SUCCESS_MSG =
  'You can login with your new password.';
export const RESET_PWD_TOAST_FAILURE_TITLE = 'Oops!';
export const RESET_PWD_TOAST_FAILURE_MSG =
  'We hit some road block on the way to reset your email :(';

// VerifyEmailScreen content
export const VERIFY_EMAIL_TITLE = 'Verify Your Email';
export const VERIFY_EMAIL_MSG =
  'Please click below button to verify your email.';
export const VERIFY_EMAIL_BTN_TEXT = 'Verify My Email';
export const VERIFY_EMAIL_TOAST_SUCCESS_TITLE =
  'Email has been verified successfully!';
export const VERIFY_EMAIL_TOAST_SUCCESS_MSG = 'You can proceed to Login';
export const VERIFY_EMAIL_TOAST_FAILURE_TITLE = 'Email Verification failed!';
export const VERIFY_EMAIL_TOAST_FAILURE_TITLE2 = 'Invalid Verification Link!';
export const VERIFY_EMAIL_TOAST_FAILURE_MSG =
  'Please check the link & try again!';

// HomeScreen content
export const HOME_TITLE = APP_NAME;
export const DEVELOPER_NAME = 'Sidharth Pandey';
export const DEVELOPED_BY = `Developed By ${DEVELOPER_NAME}`;
export const DEVELOPED_FOR =
  'Developed For Those Who\nExplore, Learn, Apply,\nFail Or Succeed\nBut Never Give Up\nAnd Beleive In Being\n❝A Learner For Life❞';
export const THOSE_TEXT = 'Those';
export const YOU_TEXT = 'You😊 ';
export const DEFAULT_WELCOME_QUOTE = `❝ Never Forget This. Yes. That You Are Unstoppable.❞ – ${DEVELOPER_NAME}`;
export const BLOG_AUTHOR_TITLE = 'Author: ';
export const BLOG_CATEGORY_TITLE = 'Category: ';
export const BLOG_DATE_TITLE = 'Last Updated: ';
export const TOP_BLOGS_TITLE = 'Our Top Blogs';

// DashboardScreen content
export const DASHBOARD_TITLE = 'DASHBOARD';
export const MY_BLOGS_HEADING = 'My Blogs';
export const CREATE_BLOG_BTN_TEXT = 'Create New Blog';
export const NOT_AUTHOR_MSG = `Only Authors can access Dashboard features, please reach us at ${APP_EMAIL} to become an Author at Blog-It-Now.`;

// DashboardSidePanel content
export const SIDE_PANEL_LOGIN_OPTION = 'Log In';
export const SIDE_PANEL_REGISTER_OPTION = 'Sign Up';
export const SIDE_PANEL_PROFILE_OPTION = 'Hi, ';
export const SIDE_PANEL_HOME_OPTION = 'Home';
export const SIDE_PANEL_DASHBOARD_OPTION = 'Dashboard';
export const SIDE_PANEL_EXPLORE_BLOGS_OPTION = 'Explore Blogs';
export const SIDE_PANEL_SETTINGS_OPTION = 'Settings';
export const SIDE_PANEL_ABOUT_US_OPTION = 'About Us';
export const SIDE_PANEL_CONTACT_US_OPTION = 'Contact Us';
export const SIDE_PANEL_LOGOUT_OPTION = 'Log Out';
export const SIDE_PANEL_EXIT_OPTION = 'Exit';
export const ANDROID_DOWNLOAD_TEXT = 'Download for Android';
export const IOS_DOWNLOAD_TEXT = 'Download for Apple iOS';

// ExploreBlogsScreen content
export const EXPLORE_BLOGS_TITLE = 'EXPLORE BLOGS';

// ProfileScreen content
export const PROFILE_TITLE = 'MY PROFILE';
export const PROFILE_HEADING = 'Profile Information';
export const PROFILE_USERNAME_TITLE = 'Username:';
export const PROFILE_USERNAME_PLACEHOLDER =
  'Username must be unique and 8 to 26 characters long';
export const PROFILE_NAME_TITLE = 'Name:';
export const PROFILE_NAME_PLACEHOLDER =
  'Name must atleast be 4 characters long';
export const PROFILE_EMAIL_TITLE = 'Email:';
export const PROFILE_EMAIL_PLACEHOLDER =
  'email must be unique and pass basic email validation';
export const PROFILE_FAV_CONTENT_TITLE = 'Your Favorite Content:';
export const PROFILE_FAV_CONTENT_PLACEHOLDER =
  'Name of your favorite Show/Movie/Anime/Manga';

// SettingsScreen content
export const SETTINGS_TITLE = 'SETTINGS';
export const SETTINGS_APP_HEADING = 'App Settings';
export const SETTINGS_APP_THEME_TITLE = 'App Theme:';
export const SETTINGS_APP_COLOR_TITLE = 'App Color:';
export const SETTINGS_APP_THEME_LIGHT_TEXT = 'Light';
export const SETTINGS_APP_THEME_DARK_TEXT = 'Dark';
export const SETTINGS_ACCOUNT_HEADING = 'Account Settings';
export const SETTINGS_ACCOUNT_DANGER_ZONE_TITLE = 'Danger Zone:';
export const SETTINGS_ACCOUNT_DELETE_AC_TEXT1 = 'Want to delete your account ?';
export const SETTINGS_ACCOUNT_DELETE_AC_TEXT2 =
  'I understand and acknowledge that by proceeding, my account will be permanently deleted, and all associated data will be lost forever.';
export const SETTINGS_ACCOUNT_DELETE_AC_BTN_TEXT = 'Delete My Account';
export const SETTINGS_ACCOUNT_DELETE_AC_SUCCESS_TITLE = 'Sad to see you go!';
export const SETTINGS_ACCOUNT_DELETE_AC_SUCCESS_MSG =
  'Hope to see you back soon!';
export const SETTINGS_ACCOUNT_DELETE_AC_FAILURE_TITLE =
  'Oops! something went wrong.';
export const SETTINGS_ACCOUNT_DELETE_AC_FAILURE_MSG =
  'Your stars want you to stay it seems.';
export const SETTINGS_ACCOUNT_DELETE_BTN_DISABLE_MSG =
  'Please read and click on the acknowledgement statement.';

// AboutUsScreen content
export const ABOUT_US_TITLE = 'ABOUT US';

// ContactUsScreen content
export const CONTACT_US_TITLE = 'CONTACT US';

// ReadBlogScreen content
export const READ_BLOG_TITLE = 'READ IT NOW';
export const MORE_BLOGS_TITLE = 'More Blogs for you';

// LogoutScreen content
export const LOGOUT_TITLE = 'LOG OUT';

// ForbiddenScreen content:
export const FORBIDDEN_TITLE = '403';
export const FORBIDDEN_SUB_TITLE = 'Access Denied!';
export const FORBIDDEN_SUBTEXT =
  'You don\'t have access to this page. If you believe this is a mistake, please wait for 24 hours and then contact us here (Mention "Access Issue" in the subject of your email).';
export const FORBIDDEN_SUBTEXT_LINK_TEXT = 'here';
export const FORBIDDEN_GO_TO_BTN_TEXT = 'Go to Home';

// NotFoundScreen content:
export const NOT_FOUND_TITLE = '404';
export const NOT_FOUND_SUB_TITLE = 'Page Not Found!';
export const NOT_FOUND_SUBTEXT =
  "The page you're looking for does not seem to exist";
export const NOT_FOUND_GO_TO_BTN_TEXT = 'Go to Home';
