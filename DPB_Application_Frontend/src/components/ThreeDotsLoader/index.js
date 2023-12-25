import {Animated, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {bigSize, isWeb, mdSize, smSize, smText} from '../../utils/utils';
import {FONT_INTER_BOLD} from '../../utils/fontUtils';
import Img from '../Img';
import {BRAND_ICON} from '../../utils/images';
import useCommonParams from '../../hooks/useCommonParams';

const ThreeDotsLoader = ({theme, size = null, loaderMsg = null}) => {
  const {Colors} = useCommonParams();
  const styles = style(
    theme,
    size ? size : loaderMsg ? smText() : mdSize(),
    loaderMsg,
    Colors,
  );
  const [dotOne] = useState(new Animated.Value(0));
  const [dotTwo] = useState(new Animated.Value(0));
  const [dotThree] = useState(new Animated.Value(0));

  const runDotsAnimation = useCallback(() => {
    Animated.sequence([
      Animated.timing(dotOne, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(dotTwo, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(dotThree, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(dotOne, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(dotTwo, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(dotThree, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      runDotsAnimation();
    });
  }, [dotOne, dotTwo, dotThree]);

  const changeDotOne = dotOne.interpolate({
    inputRange: [0, 1],
    outputRange: [
      isWeb ? Colors.dotZeroColor[theme] : 0.5,
      isWeb ? Colors.dotOneColor[theme] : 1,
    ],
  });
  const changeDotTwo = dotTwo.interpolate({
    inputRange: [0, 1],
    outputRange: [
      isWeb ? Colors.dotZeroColor[theme] : 0.5,
      isWeb ? Colors.dotOneColor[theme] : 1,
    ],
  });
  const changeDotThree = dotThree.interpolate({
    inputRange: [0, 1],
    outputRange: [
      isWeb ? Colors.dotZeroColor[theme] : 0.5,
      isWeb ? Colors.dotOneColor[theme] : 1,
    ],
  });

  useEffect(() => {
    runDotsAnimation();
  }, [runDotsAnimation]);

  return (
    <View style={[styles.apiLoaderView]}>
      <Img
        source={BRAND_ICON}
        width={bigSize() * 6} //152
        height={bigSize() * 4} //106
        color={Colors.dotOneColor[theme]}
      />
      <View style={[styles.dotsContainer]}>
        <Text style={[loaderMsg && styles.loaderTitle]}>{loaderMsg}</Text>
        <Animated.View
          style={[
            styles.dot,
            isWeb
              ? {
                  backgroundColor: changeDotOne,
                }
              : {
                  transform: [{scale: changeDotOne}],
                },
          ]}
        />
        <Animated.View
          style={[
            styles.dot,
            isWeb
              ? {
                  backgroundColor: changeDotTwo,
                }
              : {
                  transform: [{scale: changeDotTwo}],
                },
          ]}
        />
        <Animated.View
          style={[
            styles.dot,
            isWeb
              ? {
                  backgroundColor: changeDotThree,
                }
              : {
                  transform: [{scale: changeDotThree}],
                },
          ]}
        />
      </View>
    </View>
  );
};

export default ThreeDotsLoader;

const style = (theme, size, loaderMsg, Colors) =>
  StyleSheet.create({
    apiLoaderView: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.bgColor[theme],
      zIndex: 9999,
    },
    loaderTitle: {
      fontSize: bigSize(),
      fontWeight: '700',
      fontFamily: FONT_INTER_BOLD,
      color: Colors.dotOneColor[theme],
      paddingHorizontal: 8,
      paddingTop: 4,
      textAlign: 'center',
    },
    dotsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-end',
      paddingTop: 0,
      paddingBottom: 48,
    },
    dot: {
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: Colors.dotOneColor[theme],
      marginRight: loaderMsg ? 6 : smSize(),
      marginLeft: loaderMsg ? null : smSize(),
      marginBottom: 6,
    },
  });
