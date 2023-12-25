import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  Platform,
  ScrollView,
} from 'react-native';
import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Toast from '../../components/Toast';
import {bigSize, isWeb, logger, mdText} from '../../utils/utils';
import DasboardSidePanel from '../dashboard/DasboardSidePanel';
import useCommonParams from '../../hooks/useCommonParams';
import useAnimatedSidebar from '../../hooks/useAnimatedSidebar';
import Header from '../dashboard/Header';
import {IS_TOKEN_VALID_API, PROFILE_ROUTE} from '../../utils/constants';
import {
  PROFILE_EMAIL_PLACEHOLDER,
  PROFILE_EMAIL_TITLE,
  PROFILE_FAV_CONTENT_PLACEHOLDER,
  PROFILE_FAV_CONTENT_TITLE,
  PROFILE_HEADING,
  PROFILE_NAME_PLACEHOLDER,
  PROFILE_NAME_TITLE,
  PROFILE_TITLE,
  PROFILE_USERNAME_PLACEHOLDER,
  PROFILE_USERNAME_TITLE,
} from '../../utils/content';
import {
  FONT_INTER_MEDIUM,
  FONT_INTER_REGULAR,
  FONT_INTER_SEMIBOLD,
} from '../../utils/fontUtils';
import {getAuthData, setLoginState} from '../../redux/slices/AuthSlice';
import webService from '../../services/web-service';
import {getVisibleFullName} from '../../utils/jsUtils';

const ProfileScreen = () => {
  const {screenHeight, screenWidth, theme, isLandscapeMode, Colors} =
    useCommonParams();
  const {fullname, email, username, favoriteContent} = useSelector(getAuthData);
  const {showView, animatedValue, toggleSidePanel, panResponder} =
    useAnimatedSidebar();

  let styles = style(theme, screenHeight, screenWidth, Colors);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!(fullname && email && username && favoriteContent)) {
      webService
        .getData(IS_TOKEN_VALID_API)
        .then(response => response.data.userData)
        .then(data => {
          logger('ProfileScreen: data:', data);
          dispatch(
            setLoginState({
              isLoggedIn: true,
              authData: data,
            }),
          );
        })
        .catch(err => {
          logger('ProfileScreen: IS_TOKEN_VALID_API threw error:', err);
        });
    }
  }, [dispatch, email, favoriteContent, fullname, username]);

  const onChangeData = (dataTitle, data, title) => {
    const toastTitle = title.replace(/[^\w\s]/g, '');
    Toast({
      type: 'success', // or 'error', 'info', 'warning'
      position: 'top', // or bottom
      text1: 'Hey!',
      text2: `${toastTitle} cannot be edited at the moment.`,
      visibilityTime: 3000,
    });
    logger(`${toastTitle} cannot be edited.`);
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <DasboardSidePanel
        screenHeight={screenHeight}
        screenWidth={screenWidth}
        animatedValue={animatedValue}
        toggleSidePanel={toggleSidePanel}
        showView={showView}
        currentScreen={PROFILE_ROUTE}
        panResponder={panResponder}
      />
      <View style={[styles.mainContainer]} {...panResponder?.panHandlers}>
        <Header headerTitle={PROFILE_TITLE} toggleSidePanel={toggleSidePanel} />
        <ScrollView contentContainerStyle={[styles.screenContent]}>
          <Text style={[styles.bigTitle]}>{PROFILE_HEADING}</Text>
          <View style={[styles.dataContainer]}>
            <Text style={[styles.dataTitle]}>{PROFILE_USERNAME_TITLE}</Text>
            <TextInput
              rows={1}
              style={[styles.dataInput, {color: Colors.btnText[theme]}]}
              onChangeText={text =>
                onChangeData('username', text, PROFILE_USERNAME_TITLE)
              }
              value={`${username}`}
              placeholder={PROFILE_USERNAME_PLACEHOLDER}
            />
          </View>
          <View style={[styles.dataContainer]}>
            <Text style={[styles.dataTitle]}>{PROFILE_NAME_TITLE}</Text>
            <TextInput
              rows={1}
              style={[styles.dataInput, {color: Colors.btnText[theme]}]}
              onChangeText={text =>
                onChangeData('fullname', text, PROFILE_NAME_TITLE)
              }
              value={getVisibleFullName(fullname)}
              placeholder={PROFILE_NAME_PLACEHOLDER}
            />
          </View>
          <View style={[styles.dataContainer]}>
            <Text style={[styles.dataTitle]}>{PROFILE_EMAIL_TITLE}</Text>
            <TextInput
              rows={1}
              inputMode="email"
              style={[styles.dataInput, {color: Colors.btnText[theme]}]}
              onChangeText={text =>
                onChangeData('email', text, PROFILE_EMAIL_TITLE)
              }
              value={`${email}`}
              placeholder={PROFILE_EMAIL_PLACEHOLDER}
            />
          </View>
          <View style={[styles.dataContainer]}>
            <Text style={[styles.dataTitle]}>{PROFILE_FAV_CONTENT_TITLE}</Text>
            <TextInput
              rows={1}
              style={[styles.dataInput, {color: Colors.btnText[theme]}]}
              onChangeText={text =>
                onChangeData('favoriteContent', text, PROFILE_FAV_CONTENT_TITLE)
              }
              value={`${favoriteContent}`}
              placeholder={PROFILE_FAV_CONTENT_PLACEHOLDER}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const style = (theme, screenHeight, screenWidth, Colors) =>
  StyleSheet.create({
    container: {
      flex: isWeb ? null : 1,
      height: screenHeight,
    },
    mainContainer: {
      height: screenHeight,
      backgroundColor: Colors.bgColor[theme],
    },
    screenContent: {
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    bigTitle: {
      fontSize: bigSize(),
      fontWeight: '700',
      fontFamily: FONT_INTER_SEMIBOLD,
      textAlign: 'center',
      color: Colors.title[theme],
      paddingHorizontal: 12,
      paddingVertical: 16,
      textDecorationLine: 'underline',
      textDecorationStyle: 'dotted',
    },
    dataContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    dataTitle: {
      width: screenWidth * 0.45,
      maxWidth: 300,
      fontSize: mdText(),
      fontWeight: '700',
      fontFamily: FONT_INTER_MEDIUM,
      textAlign: 'left',
      color: Colors.mdTitle[theme],
      paddingHorizontal: 12,
      paddingVertical: 12,
    },
    dataInput: {
      width: screenWidth * 0.5,
      maxWidth: 300,
      fontSize: mdText(),
      fontWeight: '700',
      fontFamily: FONT_INTER_REGULAR,
      textAlign: 'left',
      color: Colors.text[theme],
      paddingHorizontal: 12,
      paddingVertical: 12,
      ...Platform.select({
        web: {
          textOverflow: 'ellipsis',
        },
      }),
    },
  });

export default ProfileScreen;
