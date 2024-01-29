import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ifMobileDevice, ifTabletLandscapeMode} from '../../utils/utils';
import useCommonParams from '../../hooks/useCommonParams';
import ThreeDotsLoader from '../ThreeDotsLoader';
import {PLEASE_WAIT_TEXT} from '../../utils/content';

const DataRefreshLoader = ({msgArr = []}) => {
  const {screenHeight, screenWidth, theme} = useCommonParams();
  const styles = style(screenHeight, screenWidth);
  const [updatedMsg, setUpdatedMsg] = useState(PLEASE_WAIT_TEXT);
  useEffect(() => {
    let i = 0;
    const tempMsgArr = Array.isArray(msgArr)
      ? [...msgArr, PLEASE_WAIT_TEXT]
      : [PLEASE_WAIT_TEXT];
    const loaderMsgInterval = setInterval(() => {
      setUpdatedMsg(tempMsgArr[i]);
      ++i;
      if (i === tempMsgArr.length) {
        i = 0;
      }
    }, 3500);
    return () => {
      clearInterval(loaderMsgInterval);
    };
  }, [msgArr]);
  return (
    <View style={[styles.isApiLoadingView]}>
      <ThreeDotsLoader theme={theme} loaderMsg={updatedMsg} />
    </View>
  );
};

export default DataRefreshLoader;

const style = (screenHeight, screenWidth) =>
  StyleSheet.create({
    isApiLoadingView: {
      width: screenWidth,
      height:
        screenHeight - (ifMobileDevice() || ifTabletLandscapeMode() ? 56 : 85),
    },
  });
