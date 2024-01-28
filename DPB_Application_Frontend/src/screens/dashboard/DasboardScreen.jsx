import {Pressable, ScrollView} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import useCommonParams from '../../hooks/useCommonParams';
import {DASHBOARD_ROUTE} from '../../utils/constants';
import {DASHBOARD_TITLE} from '../../utils/content';
import {postAuthScreenStyle} from '../../utils/commonStyles';
import HeaderWrapper from '../HeaderWrapper';
import MyBlogs from './MyBlogs';

const DasboardScreen = () => {
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
          <MyBlogs />
        </Pressable>
      </ScrollView>
    </HeaderWrapper>
  );
};

export default DasboardScreen;
