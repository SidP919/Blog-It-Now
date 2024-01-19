import {Pressable, ScrollView, Text, View} from 'react-native';
import React, {useState} from 'react';
import useCommonParams from '../../hooks/useCommonParams';
import {DASHBOARD_ROUTE} from '../../utils/constants';
import {DASHBOARD_TITLE} from '../../utils/content';
import {postAuthScreenStyle} from '../../utils/commonStyles';
import HeaderWrapper from '../HeaderWrapper';

const DasboardScreen = () => {
  const [isApiLoading, setIsApiLoading] = useState(true);
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
    <HeaderWrapper
      title={DASHBOARD_TITLE}
      currentScreen={DASHBOARD_ROUTE}
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

export default DasboardScreen;
