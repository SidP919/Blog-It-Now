import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import DasboardSidePanel from './DasboardSidePanel';
import ThreeDotsLoader from '../../components/ThreeDotsLoader';
import useAnimatedSidebar from '../../hooks/useAnimatedSidebar';
import Header from './Header';
import useCommonParams from '../../hooks/useCommonParams';
import {DASHBOARD_ROUTE} from '../../utils/constants';
import {DASHBOARD_TITLE, PLEASE_WAIT_TEXT} from '../../utils/content';
import {postAuthScreenStyle} from '../../utils/commonStyles';

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

  const [isApiLoading, setIsApiLoading] = useState(true);

  return (
    <SafeAreaView style={[styles.container]}>
      <DasboardSidePanel
        animatedValue={animatedValue}
        screenHeight={screenHeight}
        screenWidth={screenWidth}
        toggleSidePanel={toggleSidePanel}
        showView={showView}
        currentScreen={DASHBOARD_ROUTE}
        panResponder={panResponder}
      />
      <View style={[styles.mainContainer]} {...panResponder?.panHandlers}>
        <KeyboardAvoidingView
          style={[styles.mainContainer]}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Header
            headerTitle={DASHBOARD_TITLE}
            toggleSidePanel={toggleSidePanel}
            currentScreen={DASHBOARD_ROUTE}
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

export default DasboardScreen;
