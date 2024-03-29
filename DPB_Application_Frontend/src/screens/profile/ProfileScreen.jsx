import {View, Text, TextInput, ScrollView, Pressable} from 'react-native';
import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Toast from '../../components/Toast';
import {logger} from '../../utils/utils';
import useCommonParams from '../../hooks/useCommonParams';
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
import {getAuthData, setLoginState} from '../../redux/slices/AuthSlice';
import webService from '../../services/web-service';
import {getVisibleFullName} from '../../utils/jsUtils';
import {postAuthScreenStyle} from '../../utils/commonStyles';
import HeaderWrapper from '../HeaderWrapper';

const ProfileScreen = () => {
  const {
    screenHeight,
    screenWidth,
    theme,
    isLandscapeMode,
    Colors,
    bigSize,
    mdSize,
    smSize,
    mdText,
    smText,
  } = useCommonParams();
  const {fullname, email, username, favoriteContent} = useSelector(getAuthData);

  let styles = postAuthScreenStyle(
    screenHeight,
    screenWidth,
    theme,
    isLandscapeMode,
    Colors,
    bigSize,
    mdSize,
    smSize,
    mdText,
    smText,
  );

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
      type: 'success', // or 'error', 'info'
      position: 'top', // or bottom
      text1: 'Hey!',
      text2: `${toastTitle} cannot be edited at the moment.`,
      visibilityTime: 3000,
    });
    logger(`${toastTitle} cannot be edited.`);
  };

  return (
    <HeaderWrapper
      title={PROFILE_TITLE}
      currentScreen={PROFILE_ROUTE}
      isApiLoading={false}>
      <ScrollView
        contentContainerStyle={[styles.screenContent]}
        showsVerticalScrollIndicator={false}>
        <Pressable>
          <View style={[styles.sectionContainer]}>
            <Text style={[styles.sectionTitle]}>{PROFILE_HEADING}</Text>
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
              <Text style={[styles.dataTitle]}>
                {PROFILE_FAV_CONTENT_TITLE}
              </Text>
              <TextInput
                style={[styles.dataInput, {color: Colors.btnText[theme]}]}
                onChangeText={text =>
                  onChangeData(
                    'favoriteContent',
                    text,
                    PROFILE_FAV_CONTENT_TITLE,
                  )
                }
                value={`${favoriteContent}`}
                placeholder={PROFILE_FAV_CONTENT_PLACEHOLDER}
              />
            </View>
          </View>
        </Pressable>
      </ScrollView>
    </HeaderWrapper>
  );
};

export default ProfileScreen;
