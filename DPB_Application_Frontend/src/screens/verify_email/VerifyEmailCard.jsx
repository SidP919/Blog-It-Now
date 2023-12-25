import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useDispatch} from 'react-redux';
import {
  LOGIN_REGISTER_LINK_TEXT,
  MANDATORY_FIELDS_MSG,
  REGISTER_LOGIN_LINK_BTN_TEXT,
  VERIFY_EMAIL_BTN_TEXT,
  VERIFY_EMAIL_MSG,
  VERIFY_EMAIL_TITLE,
  VERIFY_EMAIL_TOAST_FAILURE_MSG,
  VERIFY_EMAIL_TOAST_FAILURE_TITLE,
  VERIFY_EMAIL_TOAST_FAILURE_TITLE2,
  VERIFY_EMAIL_TOAST_SUCCESS_MSG,
  VERIFY_EMAIL_TOAST_SUCCESS_TITLE,
} from '../../utils/content';
import {logger} from '../../utils/utils';
import useCommonParams from '../../hooks/useCommonParams';
import webService from '../../services/web-service';
import {
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  VERIFY_EMAIL_API,
} from '../../utils/constants';
import useCustomNavigate from '../../hooks/useCustomNavigate';
import ButtonA from '../../components/ButtonA';
import Toast from '../../components/Toast';
import useQueryParams from '../../hooks/useQueryParams';
import {setIsApiLoading} from '../../redux/slices/ApiLoadingSlice';
import {formCardStyle} from '../../utils/commonStyles';

const VerifyEmailCard = () => {
  const dispatch = useDispatch();
  const {navigate} = useCustomNavigate();
  const {
    screenHeight,
    screenWidth,
    theme,
    isLandscapeMode,
    isLoggedIn,
    Colors,
  } = useCommonParams();
  const queryParams = useQueryParams();
  const verifyToken = queryParams.get('verifyToken') || null;
  const userId = queryParams.get('userId') || null;

  const styles = formCardStyle(
    theme,
    isLandscapeMode,
    screenWidth,
    screenHeight,
    Colors,
  );

  const onVerifyEmail = e => {
    e.preventDefault();
    if (userId && verifyToken) {
      const data = {
        _id: userId,
        verifyToken: verifyToken,
      };
      dispatch(setIsApiLoading(true));
      webService
        .authenticate(VERIFY_EMAIL_API, data)
        .then(response => {
          dispatch(setIsApiLoading(false));
          if (response && response.data) {
            logger('VerifyEmail: Response Data', response.data);
            Toast({
              type: 'success', // or 'error', 'info', 'warning'
              position: 'bottom', // or 'top'
              text1: VERIFY_EMAIL_TOAST_SUCCESS_TITLE,
              text2: VERIFY_EMAIL_TOAST_SUCCESS_MSG,
              visibilityTime: 4000, // number of milliseconds
            });
            navigate(LOGIN_ROUTE, {replace: true});
          } else {
            logger('VerifyEmail: Response is empty');
            Toast({
              type: 'success', // or 'error', 'info', 'warning'
              position: 'bottom', // or 'top'
              text1: VERIFY_EMAIL_TOAST_SUCCESS_TITLE,
              text2: VERIFY_EMAIL_TOAST_SUCCESS_MSG,
              visibilityTime: 4000, // number of milliseconds
            });
            navigate(LOGIN_ROUTE, {replace: true});
          }
        })
        .catch(err => {
          Toast({
            type: 'error', // or 'success', 'info', 'warning'
            position: 'bottom', // or 'top'
            text1: VERIFY_EMAIL_TOAST_FAILURE_TITLE,
            text2: VERIFY_EMAIL_TOAST_FAILURE_MSG,
            visibilityTime: 4000, // number of milliseconds
          });
          logger('VerifyEmail: Error:', err);
        });
    } else {
      Toast({
        type: 'error', // or 'success', 'info', 'warning'
        position: 'bottom', // or 'top'
        text1: VERIFY_EMAIL_TOAST_FAILURE_TITLE2,
        text2: VERIFY_EMAIL_TOAST_FAILURE_MSG,
        visibilityTime: 4000, // number of milliseconds
      });
      logger(MANDATORY_FIELDS_MSG);
    }
  };

  return (
    <Pressable style={[styles.cardContainer]}>
      <View>
        <Text style={[styles.mainTitle]}>{VERIFY_EMAIL_TITLE}</Text>
        <Text style={[styles.dataTitle, verifyEmailStyles.dataTitle]}>
          {VERIFY_EMAIL_MSG}
        </Text>
        <View style={[styles.btnContainer]}>
          <ButtonA
            func={onVerifyEmail}
            bg={Colors.btnBgColor[theme]}
            color={Colors.btnText[theme]}
            border={Colors.border[theme]}
            title={VERIFY_EMAIL_BTN_TEXT}
            customStyle={styles.btnView}
          />
        </View>
        <View style={[styles.linkContainer, styles.justifyLinksBetween]}>
          <Pressable onPress={() => navigate(REGISTER_ROUTE)}>
            <Text style={[styles.dataTitle, styles.linkText]}>
              {LOGIN_REGISTER_LINK_TEXT}
            </Text>
          </Pressable>
          <Pressable onPress={() => navigate(LOGIN_ROUTE)}>
            <Text style={[styles.dataTitle, styles.linkText]}>
              {REGISTER_LOGIN_LINK_BTN_TEXT}
            </Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};

const verifyEmailStyles = StyleSheet.create({
  dataTitle: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
  },
});
export default VerifyEmailCard;
