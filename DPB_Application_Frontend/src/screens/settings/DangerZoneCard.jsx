import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {
  GENERIC_ALERT_TITLE,
  LOGIN_PWD_PLACEHOLDER,
  LOGIN_PWD_TITLE,
  MANDATORY_FIELDS_MSG,
  SETTINGS_ACCOUNT_DELETE_AC_BTN_TEXT,
  SETTINGS_ACCOUNT_DELETE_AC_FAILURE_MSG,
  SETTINGS_ACCOUNT_DELETE_AC_FAILURE_TITLE,
  SETTINGS_ACCOUNT_DELETE_AC_SUCCESS_MSG,
  SETTINGS_ACCOUNT_DELETE_AC_SUCCESS_TITLE,
  SETTINGS_ACCOUNT_DELETE_AC_TEXT1,
  SETTINGS_ACCOUNT_DELETE_AC_TEXT2,
  SETTINGS_ACCOUNT_DELETE_BTN_DISABLE_MSG,
} from '../../utils/content';
import {GENERIC, bigSize, isWeb, logger} from '../../utils/utils';
import useCommonParams from '../../hooks/useCommonParams';
import webService, {
  logoutHandler,
  showCustomAlert,
} from '../../services/web-service';
import {DEFAULT_ROUTE, DELETE_AC_API} from '../../utils/constants';
import useCustomNavigate from '../../hooks/useCustomNavigate';
import ButtonA from '../../components/ButtonA';
import Img from '../../components/Img';
import {
  CHECKED_ICON,
  PWD_HIDDEN_ICON,
  PWD_ICON,
  PWD_VISIBLE_ICON,
  UNCHECKED_ICON,
} from '../../utils/images';
import Toast from '../../components/Toast';
import {formCardStyle} from '../../utils/commonStyles';
import {getAuthData} from '../../redux/slices/AuthSlice';

const DangerZoneCard = () => {
  const {navigate} = useCustomNavigate();

  const {
    screenHeight,
    screenWidth,
    theme,
    isLandscapeMode,
    isLoggedIn,
    Colors,
  } = useCommonParams();
  const {email} = useSelector(getAuthData);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [checkedMsg, setCheckedMsg] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const styles = formCardStyle(
    theme,
    isLandscapeMode,
    screenWidth,
    screenHeight,
    Colors,
  );

  const dangerCardStyles = dangerCardStyle(
    theme,
    isLandscapeMode,
    screenWidth,
    screenHeight,
    Colors,
  );

  const onDeleteAccount = () => {
    if (email && password) {
      const data = {
        email: email,
        password: password,
      };
      logger('input:', data);
      webService
        .authenticate(DELETE_AC_API, data)
        .then(async response => {
          if (response && response.data) {
            logger('DangerZoneCard: Response Data', response.data);
            Toast({
              type: 'success', // or 'error', 'info', 'warning'
              position: 'top', // or 'top'
              align: 'center',
              text1: SETTINGS_ACCOUNT_DELETE_AC_SUCCESS_TITLE,
              text2: SETTINGS_ACCOUNT_DELETE_AC_SUCCESS_MSG,
              visibilityTime: 4000, // number of milliseconds
            });
            setPassword('');
          } else {
            logger('DangerZoneCard: Response is empty');
            Toast({
              type: 'success', // or 'error', 'info', 'warning'
              position: 'top', // or 'top'
              align: 'center',
              text1: SETTINGS_ACCOUNT_DELETE_AC_SUCCESS_TITLE,
              text2: SETTINGS_ACCOUNT_DELETE_AC_SUCCESS_MSG,
              visibilityTime: 4000, // number of milliseconds
            });
          }
          isWeb && navigate(DEFAULT_ROUTE, {replace: true});
        })
        .catch(err => {
          Toast({
            type: 'error', // or 'error', 'info', 'warning'
            position: 'top', // or 'top'
            align: 'center',
            text1: SETTINGS_ACCOUNT_DELETE_AC_FAILURE_TITLE,
            text2: err.message ?? SETTINGS_ACCOUNT_DELETE_AC_FAILURE_MSG,
            visibilityTime: 4000, // number of milliseconds
          });
          logger('ForgotPwdCard: Password Reset Req Error:', err);
        });
    } else {
      logger(MANDATORY_FIELDS_MSG);
      showCustomAlert(GENERIC_ALERT_TITLE, MANDATORY_FIELDS_MSG, GENERIC);
    }
  };

  const onDisabledDeleteBtn = () => {
    Toast({
      type: 'success', // or 'error', 'info', 'warning'
      position: 'bottom', // or 'top'
      align: 'center',
      text1: GENERIC_ALERT_TITLE,
      text2: SETTINGS_ACCOUNT_DELETE_BTN_DISABLE_MSG,
      visibilityTime: 4000, // number of milliseconds
    });
  };

  return (
    <View style={[styles.cardContainer, dangerCardStyles.cardContainer]}>
      <Text style={[styles.mainTitle]}>{SETTINGS_ACCOUNT_DELETE_AC_TEXT1}</Text>
      <Text style={[styles.dataTitle]}>{LOGIN_PWD_TITLE}</Text>
      <View style={[styles.inputContainer]}>
        <Img
          source={PWD_ICON}
          size={bigSize()}
          color={Colors.inputIcon[theme]}
        />
        <TextInput
          style={[styles.inputView]}
          placeholder={LOGIN_PWD_PLACEHOLDER}
          placeholderTextColor={Colors.inputText[theme]}
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={text => setPassword(text)}
        />
        {/* Password Icon */}
        <Pressable onPress={toggleShowPassword}>
          <Img
            source={showPassword ? PWD_VISIBLE_ICON : PWD_HIDDEN_ICON}
            size={bigSize()}
            color={Colors.inputIcon[theme]}
          />
        </Pressable>
      </View>
      <Pressable
        style={[
          styles.linkContainer,
          // styles.justifyLinksCenter,
          dangerCardStyles.linkContainer,
        ]}
        onPress={() => setCheckedMsg(!checkedMsg)}>
        <Img
          source={!checkedMsg ? UNCHECKED_ICON : CHECKED_ICON}
          size={bigSize()}
          color={Colors.iconOnBgColor[theme]}
        />
        <Text style={[styles.dataTitle, dangerCardStyles.dataTitle]}>
          {SETTINGS_ACCOUNT_DELETE_AC_TEXT2}
        </Text>
      </Pressable>
      <View style={[styles.btnContainer]}>
        <ButtonA
          func={() => (!checkedMsg ? onDisabledDeleteBtn() : onDeleteAccount())}
          bg={Colors.danger[theme]}
          color={Colors.dangerBtnText[theme]}
          border={Colors.dangerBtnText[theme]}
          title={SETTINGS_ACCOUNT_DELETE_AC_BTN_TEXT}
          customStyle={{
            ...styles.btnView,
            ...(!checkedMsg && dangerCardStyles.btnView),
          }}
        />
      </View>
    </View>
  );
};

const dangerCardStyle = (
  theme,
  isLandscapeMode,
  screenWidth,
  screenHeight,
  Colors,
) =>
  StyleSheet.create({
    cardContainer: {
      width: isLandscapeMode ? '100%' : '90%',
      minWidth: 280,
      maxWidth: 900,
    },
    dataTitle: {
      flex: 1,
      paddingVertical: 4,
      textAlign: 'left',
      fontWeight: 500,
    },
    linkContainer: {
      columnGap: 0,
      flexWrap: 'nowrap',
    },
    btnView: {
      opacity: 0.5,
    },
  });

export default DangerZoneCard;
