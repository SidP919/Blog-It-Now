import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ImgButton from '../../components/ImgButton';
import {FAVICON_ICON, MENU_ICON} from '../../utils/images';
import {bigSize, getWidth, ifMobileDevice} from '../../utils/utils';
import {FONT_INTER_BOLD} from '../../utils/fontUtils';
import useCommonParams from '../../hooks/useCommonParams';
import useCustomNavigate from '../../hooks/useCustomNavigate';
import {DASHBOARD_ROUTE, DEFAULT_ROUTE} from '../../utils/constants';

const Header = ({headerTitle, toggleSidePanel}) => {
  const {theme, isLandscapeMode, isLoggedIn, Colors} = useCommonParams();
  const {navigate} = useCustomNavigate();
  const styles = style(theme, Colors);

  const onHomePress = () => {
    isLoggedIn
      ? navigate(DASHBOARD_ROUTE, {replace: true})
      : navigate(DEFAULT_ROUTE, {replace: true});
  };

  return (
    <View style={[styles.headerContainer]}>
      <ImgButton
        source={MENU_ICON}
        size={32}
        color={Colors.headerLogo[theme]}
        onPress={() => toggleSidePanel(true)}
      />
      {isLandscapeMode && (
        <Text style={[styles.headerTitle]}>{headerTitle}</Text>
      )}
      <View>
        <ImgButton
          onPress={onHomePress}
          source={FAVICON_ICON}
          size={40}
          color={Colors.headerLogo[theme]}
        />
      </View>
    </View>
  );
};

export default Header;

const style = (theme, Colors) =>
  StyleSheet.create({
    headerContainer: {
      height: ifMobileDevice() ? 64 : 75,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: Colors.main[theme],
    },
    headerTitle: {
      width: (getWidth() - 64) * 0.6,
      fontSize: bigSize(),
      fontWeight: '700',
      fontFamily: FONT_INTER_BOLD,
      textAlign: 'center',
      color: Colors.headerTitle[theme],
      paddingHorizontal: 12,
      paddingVertical: 16,
    },
  });
