import {Pressable, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {
  FORGOT_PWD_BTN_TEXT,
  FORGOT_PWD_EMAIL_PLACEHOLDER,
  FORGOT_PWD_EMAIL_TITLE,
  FORGOT_PWD_LOGIN_LINK_TEXT,
  FORGOT_PWD_REGISTER_LINK_TEXT,
  FORGOT_PWD_TITLE,
  FORGOT_PWD_TOAST_FAILURE_MSG,
  FORGOT_PWD_TOAST_FAILURE_TITLE,
  FORGOT_PWD_TOAST_SUCCESS_MSG,
  FORGOT_PWD_TOAST_SUCCESS_TITLE,
  GENERIC_ALERT_TITLE,
  MANDATORY_FIELDS_MSG,
} from '../../utils/content';
import {GENERIC, bigSize, isWeb, logger} from '../../utils/utils';
import useCommonParams from '../../hooks/useCommonParams';
import webService, {showCustomAlert} from '../../services/web-service';
import {
  LOGIN_ROUTE,
  PWD_RESET_REQ_API,
  REGISTER_ROUTE,
} from '../../utils/constants';
import useCustomNavigate from '../../hooks/useCustomNavigate';
import ButtonA from '../../components/ButtonA';
import Img from '../../components/Img';
import {EMAIL_ICON} from '../../utils/images';
import Toast from '../../components/Toast';
import {formCardStyle} from '../../utils/commonStyles';

const ForgotPwdCard = () => {
  const {navigate} = useCustomNavigate();
  const {screenHeight, screenWidth, theme, isLandscapeMode, Colors} =
    useCommonParams();

  const [email, setEmail] = useState('');

  const styles = formCardStyle(
    theme,
    isLandscapeMode,
    screenWidth,
    screenHeight,
    Colors,
  );

  const onSendPwdResetReq = () => {
    if (email) {
      const data = {
        email: email,
      };
      webService
        .authenticate(PWD_RESET_REQ_API, data)
        .then(response => {
          if (response && response.data) {
            logger('ForgotPwdScreen: Response Data', response.data);
            Toast({
              type: 'success', // or 'error', 'info'
              position: 'top', // or 'bottom'
              align: 'center',
              text1: FORGOT_PWD_TOAST_SUCCESS_TITLE,
              text2: FORGOT_PWD_TOAST_SUCCESS_MSG,
              visibilityTime: 4000, // number of milliseconds
            });
            setEmail('');
          } else {
            logger('ForgotPwdCard: Response is empty');
            Toast({
              type: 'success', // or 'error', 'info'
              position: 'top', // or 'top'
              align: 'center',
              text1: FORGOT_PWD_TOAST_SUCCESS_TITLE,
              text2: FORGOT_PWD_TOAST_SUCCESS_MSG,
              visibilityTime: 4000, // number of milliseconds
            });
          }
        })
        .catch(err => {
          Toast({
            type: 'error', // or 'error', 'info'
            position: 'top', // or 'top'
            align: 'center',
            text1: FORGOT_PWD_TOAST_FAILURE_TITLE,
            text2: FORGOT_PWD_TOAST_FAILURE_MSG,
            visibilityTime: 4000, // number of milliseconds
          });
          logger('ForgotPwdCard: Password Reset Req Error:', err);
        });
    } else {
      logger(MANDATORY_FIELDS_MSG);
      showCustomAlert(GENERIC_ALERT_TITLE, MANDATORY_FIELDS_MSG, GENERIC);
    }
  };

  return (
    <View style={[styles.cardContainer]}>
      <View>
        <Text style={[styles.mainTitle]}>{FORGOT_PWD_TITLE}</Text>
        <Text style={[styles.dataTitle]}>{FORGOT_PWD_EMAIL_TITLE}</Text>
        <View style={[styles.inputContainer]}>
          <Img
            source={EMAIL_ICON}
            size={bigSize()}
            color={Colors.inputIcon[theme]}
          />
          <TextInput
            inputMode="email"
            style={[styles.inputView]}
            placeholder={FORGOT_PWD_EMAIL_PLACEHOLDER}
            placeholderTextColor={Colors.inputText[theme]}
            value={email}
            onChangeText={text => setEmail(text)}
            onSubmitEditing={onSendPwdResetReq}
          />
        </View>
        <View style={[styles.linkContainer, styles.justifyLinksBetween]}>
          <Pressable onPress={() => navigate(REGISTER_ROUTE, {replace: true})}>
            <Text style={[styles.dataTitle, styles.linkText]}>
              {FORGOT_PWD_REGISTER_LINK_TEXT}
            </Text>
          </Pressable>
          <Pressable
            onPress={() => (isWeb ? navigate(-1) : navigate(LOGIN_ROUTE))}>
            <Text style={[styles.dataTitle, styles.linkText]}>
              {FORGOT_PWD_LOGIN_LINK_TEXT}
            </Text>
          </Pressable>
        </View>
        <View style={[styles.btnContainer]}>
          <ButtonA
            func={onSendPwdResetReq}
            bg={Colors.btnBgColor[theme]}
            color={Colors.btnText[theme]}
            border={Colors.border[theme]}
            title={FORGOT_PWD_BTN_TEXT}
            customStyle={styles.btnView}
          />
        </View>
      </View>
    </View>
  );
};

export default ForgotPwdCard;
