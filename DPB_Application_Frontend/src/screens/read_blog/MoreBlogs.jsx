import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import BlogCard from '../../components/BlogCard';
import useCommonParams from '../../hooks/useCommonParams';
import {
  ifMobileDevice,
  ifWebSmallLandscapeMode,
  isMobileNative,
  logger,
} from '../../utils/utils';
import {postAuthScreenStyle} from '../../utils/commonStyles';
import useCustomNavigate from '../../hooks/useCustomNavigate';
import {
  DATA_REFRESH_MSG_ARR,
  GET_TOP_BLOGS,
  READ_BLOG_ROUTE,
} from '../../utils/constants';
import {setTopBlogsData} from '../../redux/slices/BlogsDataSlice';
import DataRefreshLoader from '../../components/DataRefreshLoader';
import webService from '../../services/web-service';
import {useDispatch} from 'react-redux';
import {MORE_BLOGS_TITLE} from '../../utils/content';

const MoreBlogs = ({moreBlogs}) => {
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

  const customStyles = style(
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

  const dispatch = useDispatch();
  const {navigate} = useCustomNavigate();
  const handleOnBlogPress = item => {
    console.log(`${item.title} is being loaded...`);
    navigate(READ_BLOG_ROUTE, {state: {item}});
  };
  const [isApiLoading, setIsApiLoading] = useState(false);

  useEffect(() => {
    if (!moreBlogs.length) {
      (async () => {
        setIsApiLoading(true);
        await webService
          .getData(GET_TOP_BLOGS)
          .then(res => {
            dispatch(setTopBlogsData(res.data.topBlogs));
            return res.data.topBlogs;
          })
          .catch(error => {
            setIsApiLoading(false);
            logger(error);
          });
        setIsApiLoading(false);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const flatListOptimizationProps = {
    initialNumToRender: 10,
    maxToRenderPerBatch: 1,
    removeClippedSubviews: true,
    scrollEventThrottle: 8,
    windowSize: 1,
    keyExtractor: useCallback(e => e._id, []),
    getItemLayout: useCallback(
      (_, ind) => ({
        index: ind,
        length: screenHeight * 0.35,
        offset: ind * screenHeight,
      }),
      [screenHeight],
    ),
  };

  if (isApiLoading) {
    return <DataRefreshLoader msgArr={DATA_REFRESH_MSG_ARR} />;
  }

  return (
    <View style={[styles.sectionContainer, customStyles.relatedBlogsContainer]}>
      <Text style={[styles.sectionTitle]}>{MORE_BLOGS_TITLE}</Text>
      <FlatList
        data={moreBlogs}
        style={customStyles.cardListView}
        keyExtractor={item => item._id}
        renderItem={({item}) => {
          return (
            <BlogCard
              item={item}
              itemWidth={
                isLandscapeMode && !ifWebSmallLandscapeMode()
                  ? screenWidth * 0.3
                  : isMobileNative && ifMobileDevice()
                  ? screenWidth - 64
                  : screenWidth * 0.9
              }
              handleOnBlogPress={() => handleOnBlogPress(item)}
            />
          );
        }}
        ItemSeparatorComponent={
          <View style={[customStyles.itemSeparatorView]} />
        }
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={customStyles.flatListContainerStyle}
        {...flatListOptimizationProps}
      />
    </View>
  );
};

export default MoreBlogs;

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
    relatedBlogsContainer: {
      width:
        isLandscapeMode && !ifWebSmallLandscapeMode()
          ? screenWidth * 0.32
          : screenWidth * 0.94,
      alignItems:
        isLandscapeMode && !ifWebSmallLandscapeMode() ? 'flex-start' : 'center',
      borderColor: Colors.border[theme],
      borderWidth: isLandscapeMode ? 3 : 2,
      borderRadius: 24,
      overflow: 'hidden',
    },
    cardListView: {
      width:
        isLandscapeMode && !ifWebSmallLandscapeMode()
          ? screenWidth * 0.318
          : screenWidth * 0.94,
      marginBottom: 8,
    },
    flatListContainerStyle: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    itemSeparatorView: {
      height: isMobileNative && ifMobileDevice() ? 32 : 16,
    },
  });
