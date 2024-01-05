import {
  SafeAreaView,
  Text,
  Pressable,
  View,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import DasboardSidePanel from '../dashboard/DasboardSidePanel';
import useAnimatedSidebar from '../../hooks/useAnimatedSidebar';
import Header from '../dashboard/Header';
import useCommonParams from '../../hooks/useCommonParams';
import {HOME_ROUTE} from '../../utils/constants';
import {HOME_TITLE, PLEASE_WAIT_TEXT} from '../../utils/content';
import {postAuthScreenStyle} from '../../utils/commonStyles';
import ThreeDotsLoader from '../../components/ThreeDotsLoader';

const HomeScreen = () => {
  const [isApiLoading, setIsApiLoading] = useState(true);
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

  const {showView, animatedValue, toggleSidePanel, panResponder} =
    useAnimatedSidebar();

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
    <SafeAreaView style={[styles.container]}>
      <DasboardSidePanel
        screenHeight={screenHeight}
        screenWidth={screenWidth}
        animatedValue={animatedValue}
        toggleSidePanel={toggleSidePanel}
        showView={showView}
        currentScreen={HOME_ROUTE}
        panResponder={panResponder}
      />
      <View style={[styles.mainContainer]} {...panResponder?.panHandlers}>
        <KeyboardAvoidingView
          style={[styles.mainContainer]}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Header
            headerTitle={HOME_TITLE}
            toggleSidePanel={toggleSidePanel}
            currentScreen={HOME_ROUTE}
          />
          {isApiLoading ? (
            <View style={styles.apiLoadingView}>
              <ThreeDotsLoader theme={theme} loaderMsg={PLEASE_WAIT_TEXT} />
            </View>
          ) : (
            <ScrollView contentContainerStyle={[styles.screenContent]}>
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
          )}
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
