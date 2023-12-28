import {Pressable, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {
  GENERIC_ALERT_TITLE,
  MANDATORY_FIELDS_MSG,
  REGISTER_BTN_TEXT,
  REGISTER_EMAIL_PLACEHOLDER,
  REGISTER_EMAIL_TITLE,
  REGISTER_FAV_CONTENT_PLACEHOLDER,
  REGISTER_FAV_CONTENT_TITLE,
  REGISTER_FULLNAME_PLACEHOLDER,
  REGISTER_FULLNAME_TITLE,
  REGISTER_LOGIN_LINK_BTN_TEXT,
  REGISTER_LOGIN_LINK_TEXT,
  REGISTER_PWD_PLACEHOLDER,
  REGISTER_PWD_TITLE,
  REGISTER_TITLE,
  REGISTER_USERNAME_PLACEHOLDER,
  REGISTER_USERNAME_TITLE,
  REGISTER_VERIFICATION_TOAST_MSG,
  REGISTER_VERIFICATION_TOAST_TITLE,
} from '../../utils/content';
import {GENERIC, bigSize, isWeb, logger} from '../../utils/utils';
import useCommonParams from '../../hooks/useCommonParams';
import webService, {showCustomAlert} from '../../services/web-service';
import {LOGIN_ROUTE, REGISTER_API} from '../../utils/constants';
import useCustomNavigate from '../../hooks/useCustomNavigate';
import ButtonA from '../../components/ButtonA';
import Img from '../../components/Img';
import {
  EMAIL_ICON,
  FAV_CONTENT_ICON,
  NAME_ICON,
  PWD_HIDDEN_ICON,
  PWD_ICON,
  PWD_VISIBLE_ICON,
  USERNAME_ICON,
} from '../../utils/images';
import {formCardStyle} from '../../utils/commonStyles';
import Toast from '../../components/Toast';

const RegisterCard = () => {
  const {navigate} = useCustomNavigate();
  const {screenHeight, screenWidth, theme, isLandscapeMode, Colors} =
    useCommonParams();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [favContent, setFavContent] = useState('');

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

  const onSignUpPress = () => {
    if (fullName && email && password && favContent) {
      const data = {
        fullname: fullName,
        email: email, //'sidp0008',
        username: username,
        password: password, //'password123',
        favoriteContent: favContent,
      };
      webService
        .authenticate(REGISTER_API, data)
        .then(async response => {
          if (response) {
            setFullName('');
            setEmail('');
            setUsername('');
            setPassword('');
            setShowPassword(false);
            setFavContent('');
            await Toast({
              type: 'success', // or 'error', 'info'
              position: 'bottom', // or 'top'
              align: 'center',
              text1: REGISTER_VERIFICATION_TOAST_TITLE,
              text2: REGISTER_VERIFICATION_TOAST_MSG,
              visibilityTime: 4000, // number of milliseconds
            });
            isWeb && navigate(LOGIN_ROUTE, {replace: true});
          } else {
            logger('Response is empty');
          }
        })
        .catch(err => {
          logger('RegisterScreen: Auth Error:', err);
        });
    } else {
      logger(MANDATORY_FIELDS_MSG);
      showCustomAlert(GENERIC_ALERT_TITLE, MANDATORY_FIELDS_MSG, GENERIC);
    }
  };

  return (
    <View style={[styles.cardContainer]}>
      <Text style={[styles.mainTitle]}>{REGISTER_TITLE}</Text>
      <Text style={[styles.dataTitle]}>{REGISTER_FULLNAME_TITLE}</Text>
      <View style={[styles.inputContainer]}>
        <Img
          source={NAME_ICON}
          size={bigSize()}
          color={Colors.inputIcon[theme]}
        />
        <TextInput
          style={[styles.inputView]}
          placeholder={REGISTER_FULLNAME_PLACEHOLDER}
          placeholderTextColor={Colors.inputText[theme]}
          value={fullName}
          onChangeText={text => setFullName(text)}
        />
      </View>
      <Text style={[styles.dataTitle]}>{REGISTER_EMAIL_TITLE}</Text>
      <View style={[styles.inputContainer]}>
        <Img
          source={EMAIL_ICON}
          size={bigSize()}
          color={Colors.inputIcon[theme]}
        />
        <TextInput
          inputMode="email"
          style={[styles.inputView]}
          placeholder={REGISTER_EMAIL_PLACEHOLDER}
          placeholderTextColor={Colors.inputText[theme]}
          value={email}
          onChangeText={text => setEmail(text)}
        />
      </View>
      <Text style={[styles.dataTitle]}>{REGISTER_USERNAME_TITLE}</Text>
      <View style={[styles.inputContainer]}>
        <Img
          source={USERNAME_ICON}
          size={bigSize()}
          color={Colors.inputIcon[theme]}
        />
        <TextInput
          style={[styles.inputView]}
          placeholder={REGISTER_USERNAME_PLACEHOLDER}
          placeholderTextColor={Colors.inputText[theme]}
          value={username}
          onChangeText={text => setUsername(text)}
        />
      </View>
      <Text style={[styles.dataTitle]}>{REGISTER_PWD_TITLE}</Text>
      <View style={[styles.inputContainer]}>
        <Img
          source={PWD_ICON}
          size={bigSize()}
          color={Colors.inputIcon[theme]}
        />
        <TextInput
          style={[styles.inputView]}
          placeholder={REGISTER_PWD_PLACEHOLDER}
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
      <Text style={[styles.dataTitle]}>{REGISTER_FAV_CONTENT_TITLE}</Text>
      <View style={[styles.inputContainer]}>
        <Img
          source={FAV_CONTENT_ICON}
          size={bigSize()}
          color={Colors.inputIcon[theme]}
        />
        <TextInput
          style={[styles.inputView]}
          placeholder={REGISTER_FAV_CONTENT_PLACEHOLDER}
          placeholderTextColor={Colors.inputText[theme]}
          value={favContent}
          onChangeText={text => setFavContent(text)}
          enterKeyHint="done"
          onSubmitEditing={onSignUpPress}
        />
      </View>
      <View style={[styles.btnContainer]}>
        <ButtonA
          func={onSignUpPress}
          bg={Colors.btnBgColor[theme]}
          color={Colors.btnText[theme]}
          border={Colors.border[theme]}
          title={REGISTER_BTN_TEXT}
          customStyle={styles.btnView}
        />
      </View>
      <View style={[styles.linkContainer, styles.justifyLinksCenter]}>
        <Text style={[styles.dataTitle]}>{REGISTER_LOGIN_LINK_TEXT}</Text>
        <Pressable onPress={() => navigate(LOGIN_ROUTE, {replace: true})}>
          <Text style={[styles.dataTitle, styles.linkText]}>
            {REGISTER_LOGIN_LINK_BTN_TEXT}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default RegisterCard;
