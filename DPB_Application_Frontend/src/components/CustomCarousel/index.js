import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import useCommonParams from '../../hooks/useCommonParams';
import {
  ifMobileDevice,
  ifTablet,
  ifWebLargeLandscapeMode,
  ifWebSmallLandscapeMode,
  isMobileNative,
} from '../../utils/utils';
import ImgButton from '../ImgButton';
import {LEFT_PLAY_ICON, RIGHT_PLAY_ICON} from '../../utils/images';
import NoDataView from '../NoDataView';
import {FONT_INTER_REGULAR} from '../../utils/fontUtils';

const CustomCarousel = ({
  data,
  RenderItem,
  autoScroll = true,
  showPaginationDots = true,
}) => {
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
  const [continueAutoScroll, setContinueAutoScroll] = useState(autoScroll);
  const calcItemWidth = useCallback(() => {
    return isLandscapeMode
      ? ifWebSmallLandscapeMode()
        ? (screenWidth - 64) / 2
        : ifWebLargeLandscapeMode() || ifTablet()
        ? (screenWidth - 64) / 3
        : screenWidth - 24
      : ifTablet()
      ? (screenWidth - 48) / 2
      : isMobileNative
      ? screenWidth - 64
      : screenWidth - 48;
  }, [isLandscapeMode, screenWidth]);

  const [itemWidth, setItemWidth] = useState(calcItemWidth());
  const indexRef = useRef(index);
  const flatListRef = useRef(null);
  indexRef.current = index;

  const onScroll = useCallback(
    event => {
      const multiplyingFactor = isLandscapeMode
        ? ifWebSmallLandscapeMode()
          ? 2
          : ifWebLargeLandscapeMode() || ifTablet()
          ? 3
          : 1
        : ifTablet()
        ? 2
        : 1;
      const slideSize = event.nativeEvent.layoutMeasurement.width;
      const currentIndex =
        (multiplyingFactor * event.nativeEvent.contentOffset.x) / slideSize;
      const roundIndex = Math.round(currentIndex);

      const indexDiff = Math.abs(roundIndex - currentIndex);

      // Restrict a minute scroll from triggering the setIndex in the middle
      // of the transition, i.e., user needs to scroll a bit
      // more to trigger the index-change/slide-change:
      const isInvalidRegion = indexDiff > 0.4;

      if (roundIndex !== indexRef.current && !isInvalidRegion) {
        setIndex(roundIndex);
      }
    },
    [isLandscapeMode],
  );

  const flatListOptimizationProps = {
    initialNumToRender: 10,
    maxToRenderPerBatch: 1,
    removeClippedSubviews: true,
    scrollEventThrottle: 8,
    windowSize: 2,
    keyExtractor: useCallback(e => e._id, []),
    getItemLayout: useCallback(
      (_, ind) => ({
        index: ind,
        length: itemWidth,
        offset: ind * itemWidth,
      }),
      [itemWidth],
    ),
  };

  const goToSlide = useCallback(
    i => {
      if (
        flatListRef &&
        flatListRef.current &&
        flatListRef.current.scrollToOffset
      ) {
        const offset = i * (itemWidth + 32);
        flatListRef.current?.scrollToOffset({offset, animated: true});
        setIndex(i);
      }
    },
    [itemWidth],
  );

  useEffect(() => {
    setItemWidth(calcItemWidth());
  }, [calcItemWidth]);

  useEffect(() => {
    const autoplayInterval =
      autoScroll &&
      continueAutoScroll &&
      setInterval(() => {
        goToSlide(index < data.length - 1 ? index + 1 : 0);
      }, 3000);
    return () => {
      continueAutoScroll && clearInterval(autoplayInterval);
    };
  }, [data.length, index, goToSlide, continueAutoScroll, autoScroll]);

  return (
    <View style={[styles.carouselContainer]}>
      {data?.length > 0 ? (
        <View style={[styles.carouselView]}>
          <FlatList
            data={data}
            style={styles.cardListView}
            renderItem={({item}) => {
              return (
                <RenderItem
                  item={item}
                  itemWidth={itemWidth}
                  setContinueAutoScroll={setContinueAutoScroll}
                />
              );
            }}
            ItemSeparatorComponent={
              !ifMobileDevice() && <View style={[styles.itemSeparatorView]} />
            }
            pagingEnabled
            horizontal
            showsHorizontalScrollIndicator={false}
            onScroll={onScroll}
            contentContainerStyle={styles.flatListContainerStyle}
            {...flatListOptimizationProps}
            ref={flatListRef}
          />
          <View style={styles.bottomView}>
            <ImgButton
              source={LEFT_PLAY_ICON}
              onPress={() => goToSlide(index > 0 ? index - 1 : 0)}
              size={smSize}
              color={Colors.dotOneColor[theme]}
            />
            {showPaginationDots ? (
              <View style={styles.pagination}>
                {data.map((_, i) => {
                  return (
                    <Pressable
                      key={'item_no_' + i}
                      onPress={() => goToSlide(i)}>
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
            ) : (
              <View style={styles.pagination}>
                <Text style={styles.paginationNum}>
                  {index + 1}
                  {'/'}
                  {data.length}
                </Text>
              </View>
            )}
            <ImgButton
              source={RIGHT_PLAY_ICON}
              onPress={() =>
                goToSlide(index === data.length - 1 ? index : index + 1)
              }
              size={smSize}
              color={Colors.dotOneColor[theme]}
            />
          </View>
        </View>
      ) : (
        <NoDataView />
      )}
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
    carouselContainer: {
      height:
        screenHeight -
        ((isLandscapeMode && !ifMobileDevice()) || ifTablet() || isMobileNative
          ? 80
          : !isLandscapeMode
          ? 60
          : 48) -
        (ifMobileDevice() || ifTablet() ? 56 : 85),
      maxHeight: 556,
      justifyContent: 'flex-start',
      paddingTop: 0,
      alignItems: 'center',
    },
    carouselView: {
      width:
        isMobileNative && ifMobileDevice() ? screenWidth : screenWidth - 32,
      height:
        isLandscapeMode && ifWebSmallLandscapeMode()
          ? screenHeight - 48 - 56
          : null,
      maxHeight: 556,
      justifyContent: 'center',
      alignItems: isLandscapeMode ? 'center' : 'flex-start',
    },
    cardListView: {
      height:
        isLandscapeMode && ifWebSmallLandscapeMode()
          ? screenHeight - 48 - 56
          : null,
      marginBottom: 40,
      maxHeight: 500,
      width: screenWidth - 32,
    },
    flatListContainerStyle: {
      minWidth: screenWidth - 32,
      paddingLeft: 0,
      justifyContent: 'center',
    },
    itemSeparatorView: {
      width: isMobileNative && ifMobileDevice() ? 32 : 16,
    },
    bottomView: {
      width: '100%',
      paddingHorizontal: isMobileNative && ifMobileDevice() ? 24 : 12,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'absolute',
      bottom: isLandscapeMode && ifWebSmallLandscapeMode() ? 12 : -12,
    },
    pagination: {
      flexDirection: 'row',
    },
    paginationDot: {
      width: 16,
      height: isLandscapeMode && ifWebSmallLandscapeMode() ? bigSize : smSize,
      borderRadius: 8,
      marginHorizontal: 4,
      borderColor: Colors.border[theme],
      borderWidth: 2,
    },
    paginationDotActive: {
      height: 16,
      backgroundColor: Colors.dotOneColor[theme],
    },
    paginationDotInactive: {height: 16, backgroundColor: Colors.bgColor[theme]},
    paginationNum: {
      fontSize: mdText,
      fontWeight: '700',
      fontFamily: FONT_INTER_REGULAR,
      textAlign: 'center',
      color: Colors.title[theme],
      alignSelf: 'center',
      alignItems: 'center',
    },
  });
export default memo(CustomCarousel);
