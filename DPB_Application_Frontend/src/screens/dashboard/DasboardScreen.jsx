import {Pressable, ScrollView, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import useCommonParams from '../../hooks/useCommonParams';
import {DASHBOARD_ROUTE} from '../../utils/constants';
import {DASHBOARD_TITLE, NOT_AUTHOR_MSG} from '../../utils/content';
import {postAuthScreenStyle} from '../../utils/commonStyles';
import HeaderWrapper from '../HeaderWrapper';
import MyBlogs from './MyBlogs';
import {getAuthData} from '../../redux/slices/AuthSlice';
import NoDataView from '../../components/NoDataView';

const DasboardScreen = () => {
  const {role} = useSelector(getAuthData);
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

  return (
    <HeaderWrapper title={DASHBOARD_TITLE} currentScreen={DASHBOARD_ROUTE}>
      <ScrollView
        contentContainerStyle={[styles.screenContent]}
        showsVerticalScrollIndicator={false}>
        <Pressable>
          {role && ['AUTHOR', 'ADMIN'].includes(role) ? (
            <MyBlogs />
          ) : (
            <View style={[styles.apiLoadingView]}>
              <NoDataView msg={NOT_AUTHOR_MSG} />
            </View>
          )}
        </Pressable>
      </ScrollView>
    </HeaderWrapper>
  );
};

export default DasboardScreen;
