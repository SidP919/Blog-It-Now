import {BackHandler, StyleSheet, Text, View, Platform} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {logoutHandler} from '../../services/web-service';
import {
  CB_TYPES_WITH_CANCEL,
  EXIT_APP,
  LOG_OUT,
  INVALID_USER,
  ifWebSmallLandscapeMode,
  isWeb,
} from '../../utils/utils';
import {FONT_INTER_BOLD, FONT_INTER_REGULAR} from '../../utils/fontUtils';
import {resetAlertData} from '../../redux/slices/AlertSlice';
import useCommonParams from '../../hooks/useCommonParams';
import useCustomNavigate from '../../hooks/useCustomNavigate';
import {LOGIN_ROUTE} from '../../utils/constants';
import {CANCEL_BTN_TEXT, CONFIRM_BTN_TEXT} from '../../utils/content';
import {setIsApiLoading} from '../../redux/slices/ApiLoadingSlice';
import ButtonA from '../ButtonA';

const CustomAlert = ({title = '', msg = '', callbackType = ''}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [showCancel, setShowCancel] = useState(false);

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

  const styles = style(
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

  const {navigate} = useCustomNavigate();

  useEffect(() => {
    if (CB_TYPES_WITH_CANCEL.includes(callbackType)) {
      setShowCancel(true);
    } else {
      setShowCancel(false);
    }
  }, [callbackType]);

  const handlePressOK = async () => {
    if (callbackType === EXIT_APP) {
      dispatch(setIsApiLoading(true));
      await logoutHandler();
      dispatch(setIsApiLoading(false));
      isWeb && navigate(LOGIN_ROUTE, {replace: true});
      if (!isWeb) {
        BackHandler.exitApp();
      }
    } else if (callbackType === LOG_OUT) {
      dispatch(setIsApiLoading(true));
      await logoutHandler();
      dispatch(setIsApiLoading(false));
      isWeb && navigate(LOGIN_ROUTE, {replace: true});
    } else if (callbackType === INVALID_USER) {
      // does nothing for now
    } else {
      // navigate('Dashboard', {replace: true});
    }
    dispatch(resetAlertData());
    setIsOpen(false);
    setShowCancel(false);
  };

  const handlePressCancel = () => {
    dispatch(resetAlertData());
    setIsOpen(false);
    setShowCancel(false);
  };

  return (
    isOpen && (
      <View style={[styles.container]}>
        <View style={[styles.alertBody]}>
          <Text style={[styles.alertTitle]}>{title}</Text>
          <Text style={[styles.alertMsg]}>{msg}</Text>
          <View style={[styles.buttonContainer]}>
            {showCancel && (
              <ButtonA
                func={handlePressCancel}
                bg={Colors.alertBtnBg[theme]}
                color={Colors.alertBtnText[theme]}
                border={Colors.alertBorder[theme]}
                title={CANCEL_BTN_TEXT}
                customStyle={styles.button}
              />
            )}
            <ButtonA
              func={handlePressOK}
              bg={Colors.alertBtnBg[theme]}
              color={Colors.alertBtnText[theme]}
              border={Colors.alertBorder[theme]}
              title={CONFIRM_BTN_TEXT}
              customStyle={styles.button}
            />
          </View>
        </View>
      </View>
    )
  );
};

export default CustomAlert;

const style = (
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
) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      width: '100%',
      height: screenHeight,
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 3,
    },
    alertBody: {
      width: isLandscapeMode ? (ifWebSmallLandscapeMode() ? 300 : 460) : 300,
      minHeight: 128,
      backgroundColor: Colors.alertBg[theme],
      borderRadius: 8,
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderWidth: 2,
      borderColor: Colors.alertBorder[theme],
      ...Platform.select({
        native: {
          shadowColor: Colors.border[theme],
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 8,
        },
        web: {
          boxShadow: `0px -2px 2px ${Colors.border[theme]}, 0px 2px 4px ${Colors.border[theme]}, -2px 0px 2px ${Colors.border[theme]}, 2px 0px 2px ${Colors.border[theme]}`,
        },
      }),
    },
    alertTitle: {
      fontSize: mdSize,
      fontWeight: '700',
      fontFamily: FONT_INTER_BOLD,
      margin: 8,
      color: Colors.alertTitle[theme],
    },
    alertMsg: {
      fontSize: smSize,
      fontWeight: '500',
      fontFamily: FONT_INTER_REGULAR,
      margin: 8,
      color: Colors.alertMsg[theme],
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      columnGap: 16,
    },
    button: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      marginHorizontal: 8,
      marginVertical: 8,
    },
  });
