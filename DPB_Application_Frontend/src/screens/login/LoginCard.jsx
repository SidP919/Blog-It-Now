import {Pressable, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {
  GENERIC_ALERT_TITLE,
  LOGIN_BTN_TEXT,
  LOGIN_EMAIL_PLACEHOLDER,
  LOGIN_EMAIL_TITLE,
  LOGIN_FORGOT_PWD_LINK_TEXT,
  LOGIN_PWD_PLACEHOLDER,
  LOGIN_PWD_TITLE,
  LOGIN_REGISTER_LINK_TEXT,
  LOGIN_TITLE,
  MANDATORY_FIELDS_MSG,
} from '../../utils/content';
import {GENERIC, bigSize, isWeb, logger} from '../../utils/utils';
import useCommonParams from '../../hooks/useCommonParams';
import webService, {showCustomAlert} from '../../services/web-service';
import {
  AUTH_TOKEN_LOCAL,
  DASHBOARD_ROUTE,
  FORGOT_PWD_ROUTE,
  LOGIN_API,
  REGISTER_ROUTE,
} from '../../utils/constants';
import {saveLocalData} from '../../utils/preferences';
import {setLoginState} from '../../redux/slices/AuthSlice';
import useCustomNavigate from '../../hooks/useCustomNavigate';
import ButtonA from '../../components/ButtonA';
import Img from '../../components/Img';
import {
  PWD_HIDDEN_ICON,
  PWD_ICON,
  PWD_VISIBLE_ICON,
  USERNAME_ICON,
} from '../../utils/images';
import {formCardStyle} from '../../utils/commonStyles';

const LoginCard = () => {
  const dispatch = useDispatch();
  const {navigate} = useCustomNavigate();
  const {screenHeight, screenWidth, theme, isLandscapeMode, Colors} =
    useCommonParams();

  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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

  const onLoginPress = () => {
    if (emailOrUsername && password) {
      const data = {
        emailOrUsername: emailOrUsername, //'sidp0008',
        password: password, //'password123',
      };
      webService
        .authenticate(LOGIN_API, data)
        .then(response => {
          if (response) {
            logger('LoginScreen: Response Data', response.data);
            saveLocalData(
              AUTH_TOKEN_LOCAL,
              response.headers.getAuthorization(),
            );
            dispatch(
              setLoginState({
                isLoggedIn: true,
                authData: response.data.userData,
              }),
            );
            setEmailOrUsername('');
            setPassword('');
            setShowPassword(false);
            isWeb && navigate(DASHBOARD_ROUTE, {replace: true});
          } else {
            logger('Response is empty');
          }
        })
        .catch(err => {
          logger('LoginScreen: Auth Error:', err);
        });
    } else {
      logger(MANDATORY_FIELDS_MSG);
      showCustomAlert(GENERIC_ALERT_TITLE, MANDATORY_FIELDS_MSG, GENERIC);
    }
  };

  return (
    <View style={[styles.cardContainer]}>
      <Text style={[styles.mainTitle]}>{LOGIN_TITLE}</Text>
      <Text style={[styles.dataTitle]}>{LOGIN_EMAIL_TITLE}</Text>
      <View style={[styles.inputContainer]}>
        <Img
          source={USERNAME_ICON}
          size={bigSize()}
          color={Colors.inputIcon[theme]}
        />
        <TextInput
          style={[styles.inputView]}
          placeholder={LOGIN_EMAIL_PLACEHOLDER}
          placeholderTextColor={Colors.inputText[theme]}
          value={emailOrUsername}
          onChangeText={text => setEmailOrUsername(text)}
        />
      </View>
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
          enterKeyHint="done"
          onSubmitEditing={onLoginPress}
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
      <View style={[styles.linkContainer, styles.justifyLinksBetween]}>
        <Pressable onPress={() => navigate(REGISTER_ROUTE)}>
          <Text style={[styles.dataTitle, styles.linkText]}>
            {LOGIN_REGISTER_LINK_TEXT}
          </Text>
        </Pressable>
        <Pressable onPress={() => navigate(FORGOT_PWD_ROUTE)}>
          <Text style={[styles.dataTitle, styles.linkText]}>
            {LOGIN_FORGOT_PWD_LINK_TEXT}
          </Text>
        </Pressable>
      </View>
      <View style={[styles.btnContainer]}>
        <ButtonA
          func={onLoginPress}
          bg={Colors.btnBgColor[theme]}
          color={Colors.btnText[theme]}
          border={Colors.border[theme]}
          title={LOGIN_BTN_TEXT}
          customStyle={styles.btnView}
        />
      </View>
    </View>
  );
};

export default LoginCard;
