import React, {useCallback, useRef, useState} from 'react';
import {FlatList, Pressable, StyleSheet, View} from 'react-native';
import useCommonParams from '../../hooks/useCommonParams';
import {
  ifMobileDevice,
  ifTablet,
  ifWebLargeLandscapeMode,
  isMobileNative,
} from '../../utils/utils';

const CustomCarousel = ({data, RenderItem}) => {
  const {
    screenHeight,
    screenWidth,
    theme,
    isLandscapeMode,
    isLoggedIn,
    Colors,
    bigSize,
    mdSize,
    smSize,
    mdText,
    smText,
  } = useCommonParams();

  const styles = style(
    screenHeight,
    screenWidth,
    theme,
    isLandscapeMode,
    isLoggedIn,
    Colors,
    bigSize,
    mdSize,
    smSize,
    mdText,
    smText,
  );

  const [index, setIndex] = useState(0);
  const indexRef = useRef(index);
  const flatListRef = useRef(null);
  indexRef.current = index;
  const onScroll = useCallback(event => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const currentIndex = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(currentIndex);

    const distance = Math.abs(roundIndex - currentIndex);

    // Prevent one pixel triggering setIndex in the middle
    // of the transition. With this we have to scroll a bit
    // more to trigger the index change.
    const isNoMansLand = distance > 0.4;

    if (
      !(ifWebLargeLandscapeMode() || ifTablet()) &&
      roundIndex !== indexRef.current &&
      !isNoMansLand
    ) {
      // console.log('onScroll: roundIndex', roundIndex);
      setIndex(roundIndex);
    }
  }, []);

  const flatListOptimizationProps = {
    initialNumToRender: 10,
    maxToRenderPerBatch: 1,
    removeClippedSubviews: true,
    scrollEventThrottle: 16,
    windowSize: 2,
    keyExtractor: useCallback(e => e._id, []),
    getItemLayout: useCallback(
      (_, ind) => ({
        index: ind,
        length: 296 * 2,
        offset: ind * 296,
      }),
      [],
    ),
  };

  const goToSlide = useCallback(
    i => {
      if (
        flatListRef &&
        flatListRef.current &&
        flatListRef.current.scrollToOffset
      ) {
        setIndex(i);
        const offset = ifMobileDevice()
          ? i * (screenWidth - 32)
          : i * (296 - 32);
        // isLandscapeMode
        //   ? ifWebSmallLandscapeMode()
        //     ? i * (screenWidth - 32)
        //     : i > 2
        //     ? (i * screenWidth) / 3
        //     : 0
        //   : i * (screenWidth - 32);
        flatListRef.current?.scrollToOffset({offset, animated: true});
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [screenWidth],
  );

  // Use the index
  // useEffect(() => {
  //   console.log(index);
  // }, [index]);

  return (
    <View style={[styles.carouselView]}>
      <FlatList
        data={data}
        style={styles.cardListView}
        renderItem={({item}) => {
          return <RenderItem item={item} />;
        }}
        ItemSeparatorComponent={<View style={[styles.itemSeparatorView]} />}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        contentContainerStyle={styles.flatListContainerStyle}
        {...flatListOptimizationProps}
        ref={flatListRef}
      />
      <View style={styles.pagination}>
        {data.map((_, i) => {
          return (
            <Pressable key={'item_no_' + i} onPress={() => goToSlide(i)}>
              <View
                style={[
                  styles.paginationDot,
                  index === i
                    ? styles.paginationDotActive
                    : styles.paginationDotInactive,
                ]}
              />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const style = (
  screenHeight,
  screenWidth,
  theme,
  isLandscapeMode,
  isLoggedIn,
  Colors,
  bigSize,
  mdSize,
  smSize,
  mdText,
  smText,
) =>
  StyleSheet.create({
    carouselView: {
      width: isMobileNative ? screenWidth : screenWidth - 32,
      // height:
      //   screenHeight -
      //   ((isLandscapeMode && !ifMobileDevice()) || ifTablet() ? 100 : 60) -
      //   (ifMobileDevice() || ifTablet() ? 56 : 85) -
      //   32,
      maxHeight: 500,
      justifyContent: 'center',
      alignItems: isLandscapeMode ? 'center' : 'flex-start',
    },
    cardListView: {
      // height:
      //   screenHeight -
      //   ((isLandscapeMode && !ifMobileDevice()) || ifTablet() ? 100 : 60) -
      //   (ifMobileDevice() || ifTablet() ? 56 : 85) -
      //   32,
      marginBottom: 40,
      maxHeight: 500,
      width: screenWidth - 32,
    },
    flatListContainerStyle: {
      paddingHorizontal: 32,
      justifyContent: 'center',
    },
    itemSeparatorView: {
      width: isMobileNative ? 32 : 16,
    },
    pagination: {
      position: 'absolute',
      bottom: 8,
      width: '100%',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    paginationDot: {
      width: 16,
      height: 16,
      borderRadius: 8,
      marginHorizontal: 4,
    },
    paginationDotActive: {backgroundColor: Colors.iconOnBgColor[theme]},
    paginationDotInactive: {backgroundColor: Colors.trackColor[theme]},
  });
export default CustomCarousel;
