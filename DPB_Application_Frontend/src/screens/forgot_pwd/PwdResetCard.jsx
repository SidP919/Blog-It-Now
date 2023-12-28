import {Pressable, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {
  CONFIRM_EMAIL_ERROR_MSG,
  GENERIC_ALERT_TITLE,
  MANDATORY_FIELDS_MSG,
  RESET_PWD_BTN_TEXT,
  RESET_PWD_CONFIRM_PWD_PLACEHOLDER,
  RESET_PWD_CONFIRM_PWD_TITLE,
  RESET_PWD_NEW_PWD_PLACEHOLDER,
  RESET_PWD_NEW_PWD_TITLE,
  RESET_PWD_TITLE,
  RESET_PWD_TOAST_FAILURE_MSG,
  RESET_PWD_TOAST_FAILURE_TITLE,
  RESET_PWD_TOAST_SUCCESS_MSG,
  RESET_PWD_TOAST_SUCCESS_TITLE,
} from '../../utils/content';
import {GENERIC, bigSize, logger} from '../../utils/utils';
import useCommonParams from '../../hooks/useCommonParams';
import webService, {
  logoutHandler,
  showCustomAlert,
} from '../../services/web-service';
import {LOGIN_ROUTE, RESET_PWD_API} from '../../utils/constants';
import useCustomNavigate from '../../hooks/useCustomNavigate';
import ButtonA from '../../components/ButtonA';
import Img from '../../components/Img';
import {PWD_HIDDEN_ICON, PWD_ICON, PWD_VISIBLE_ICON} from '../../utils/images';
import Toast from '../../components/Toast';
import useQueryParams from '../../hooks/useQueryParams';
import {setIsApiLoading} from '../../redux/slices/ApiLoadingSlice';
import {formCardStyle} from '../../utils/commonStyles';

const PwdResetCard = () => {
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
  const [newPassword, setNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const resetPasswordToken = queryParams.get('resetPasswordToken') || null;
  const userId = queryParams.get('userId') || null;
  const toggleShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };
  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const styles = formCardStyle(
    theme,
    isLandscapeMode,
    screenWidth,
    screenHeight,
    Colors,
  );

  const onConfirmResetPassword = () => {
    if (userId && resetPasswordToken && newPassword && confirmPassword) {
      if (newPassword === confirmPassword) {
        const data = {
          _id: userId,
          resetPasswordToken: resetPasswordToken,
          password: confirmPassword,
        };
        dispatch(setIsApiLoading(true));
        webService
          .authenticate(RESET_PWD_API, data)
          .then(response => {
            dispatch(setIsApiLoading(false));
            if (response && response.data) {
              logger('ResetPwdCard: Response Data', response.data);
              Toast({
                type: 'success', // or 'error', 'info'
                position: 'bottom', // or 'top'
                text1: RESET_PWD_TOAST_SUCCESS_TITLE,
                text2: RESET_PWD_TOAST_SUCCESS_MSG,
                visibilityTime: 4000, // number of milliseconds
              });
              setNewPassword('');
              setConfirmPassword('');
              isLoggedIn && logoutHandler();
              navigate(LOGIN_ROUTE, {replace: true});
            } else {
              logger('ResetPwdScreen: Response is empty');
              Toast({
                type: 'success', // or 'error', 'info'
                position: 'bottom', // or 'top'
                text1: RESET_PWD_TOAST_SUCCESS_TITLE,
                text2: RESET_PWD_TOAST_SUCCESS_MSG,
                visibilityTime: 4000, // number of milliseconds
              });
              navigate(LOGIN_ROUTE, {replace: true});
            }
          })
          .catch(err => {
            Toast({
              type: 'error', // or 'error', 'info'
              position: 'bottom', // or 'top'
              text1: RESET_PWD_TOAST_FAILURE_TITLE,
              text2: RESET_PWD_TOAST_FAILURE_MSG,
              visibilityTime: 4000, // number of milliseconds
            });
            logger('ResetPwdCard: Password Reset Error:', err);
          });
      } else {
        logger(CONFIRM_EMAIL_ERROR_MSG);
        showCustomAlert(GENERIC_ALERT_TITLE, CONFIRM_EMAIL_ERROR_MSG, GENERIC);
      }
    } else {
      logger(MANDATORY_FIELDS_MSG);
      showCustomAlert(GENERIC_ALERT_TITLE, MANDATORY_FIELDS_MSG, GENERIC);
    }
  };

  return (
    <Pressable style={[styles.cardContainer]}>
      <View>
        <Text style={[styles.mainTitle]}>{RESET_PWD_TITLE}</Text>
        <Text style={[styles.dataTitle]}>{RESET_PWD_NEW_PWD_TITLE}</Text>
        <View style={[styles.inputContainer]}>
          <Img
            source={PWD_ICON}
            size={bigSize()}
            color={Colors.inputIcon[theme]}
          />
          <TextInput
            style={[styles.inputView]}
            placeholder={RESET_PWD_NEW_PWD_PLACEHOLDER}
            placeholderTextColor={Colors.inputText[theme]}
            secureTextEntry={!showNewPassword}
            value={newPassword}
            onChangeText={text => setNewPassword(text)}
            returnKeyType="next"
          />
          {/* Password Icon */}
          <Pressable onPress={toggleShowNewPassword}>
            <Img
              source={showNewPassword ? PWD_VISIBLE_ICON : PWD_HIDDEN_ICON}
              size={bigSize()}
              color={Colors.inputIcon[theme]}
            />
          </Pressable>
        </View>
        <Text style={[styles.dataTitle]}>{RESET_PWD_CONFIRM_PWD_TITLE}</Text>
        <View style={[styles.inputContainer]}>
          <Img
            source={PWD_ICON}
            size={bigSize()}
            color={Colors.inputIcon[theme]}
          />
          <TextInput
            style={[styles.inputView]}
            placeholder={RESET_PWD_CONFIRM_PWD_PLACEHOLDER}
            placeholderTextColor={Colors.inputText[theme]}
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)}
            enterKeyHint="done"
            onSubmitEditing={onConfirmResetPassword}
          />
          {/* Password Icon */}
          <Pressable onPress={toggleShowConfirmPassword}>
            <Img
              source={showConfirmPassword ? PWD_VISIBLE_ICON : PWD_HIDDEN_ICON}
              size={bigSize()}
              color={Colors.inputIcon[theme]}
            />
          </Pressable>
        </View>
        <View style={[styles.btnContainer]}>
          <ButtonA
            func={onConfirmResetPassword}
            bg={Colors.btnBgColor[theme]}
            color={Colors.btnText[theme]}
            border={Colors.border[theme]}
            title={RESET_PWD_BTN_TEXT}
            customStyle={styles.btnView}
          />
        </View>
      </View>
    </Pressable>
  );
};

export default PwdResetCard;
