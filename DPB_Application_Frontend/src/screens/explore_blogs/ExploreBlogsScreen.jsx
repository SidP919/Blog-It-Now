import {Text, Pressable, View, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import useCommonParams from '../../hooks/useCommonParams';
import {EXPLORE_BLOGS_TITLE} from '../../utils/content';
import {EXPLORE_BLOGS_ROUTE} from '../../utils/constants';
import {postAuthScreenStyle} from '../../utils/commonStyles';
import HeaderWrapper from '../HeaderWrapper';

const ExploreBlogsScreen = () => {
  const [isApiLoading, setIsApiLoading] = useState(false);
  const {
    screenHeight,
    screenWidth,
    theme,
    appColor,
    isLandscapeMode,
    isLoggedIn,
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

  const dispatch = useDispatch();

  return (
    <HeaderWrapper
      title={EXPLORE_BLOGS_TITLE}
      currentScreen={EXPLORE_BLOGS_ROUTE}
      isApiLoading={isApiLoading}>
      <ScrollView
        contentContainerStyle={[styles.screenContent]}
        showsVerticalScrollIndicator={false}>
        <Pressable>
          <View style={styles.sectionContainer}>
            <Text style={[styles.sectionTitle]}>{'Section 1'}</Text>
            <View style={[styles.dataContainer]}>
              <Text style={[styles.dataTitle]}>{'Data Title 1'}</Text>
              <View style={styles.dataContent}>
                {/* Data Content comes here */}
              </View>
            </View>
            <View style={[styles.dataContainer]}>
              <Text style={[styles.dataTitle]}>{'Data Title 2'}</Text>
              <View style={styles.dataContent}>
                {/* Data Content comes here */}
              </View>
            </View>
          </View>
          <View style={styles.sectionContainer}>
            <Text style={[styles.sectionTitle]}>{'Section 2'}</Text>
            <View style={[styles.dataContainer]}>
              <Text style={[styles.dataTitle]}>{'Data Title 2.1'}</Text>
              <View style={styles.dataContent}>
                {/* Data Content comes here */}
              </View>
            </View>
            <View style={[styles.dataContainer]}>
              <Text style={[styles.dataTitle]}>{'Data Title 2.2'}</Text>
              <View style={styles.dataContent}>
                {/* Data Content comes here */}
              </View>
            </View>
          </View>
        </Pressable>
      </ScrollView>
    </HeaderWrapper>
  );
};

export default ExploreBlogsScreen;
