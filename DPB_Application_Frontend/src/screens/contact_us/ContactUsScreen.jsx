import {
  SafeAreaView,
  Text,
  Pressable,
  View,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import React from 'react';
import {useDispatch} from 'react-redux';
import DasboardSidePanel from '../dashboard/DasboardSidePanel';
import useAnimatedSidebar from '../../hooks/useAnimatedSidebar';
import Header from '../dashboard/Header';
import useCommonParams from '../../hooks/useCommonParams';
import {CONTACT_US_TITLE} from '../../utils/content';
import {CONTACT_US_ROUTE} from '../../utils/constants';
import {postAuthScreenStyle} from '../../utils/commonStyles';

const ContactUsScreen = () => {
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
        currentScreen={CONTACT_US_ROUTE}
        panResponder={panResponder}
      />
      <View style={[styles.mainContainer]} {...panResponder?.panHandlers}>
        <KeyboardAvoidingView
          style={[styles.mainContainer]}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <Header
            headerTitle={CONTACT_US_TITLE}
            toggleSidePanel={toggleSidePanel}
            currentScreen={CONTACT_US_ROUTE}
          />
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
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default ContactUsScreen;
