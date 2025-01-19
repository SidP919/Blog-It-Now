import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import useCommonParams from '../../hooks/useCommonParams';
import TitleThumbnail from '../../components/TitleThumbnail';
import HtmlRenderer from '../../components/HtmlRenderer';
import {postAuthScreenStyle} from '../../utils/commonStyles';
import {ifWebSmallLandscapeMode} from '../../utils/utils';
import {formattedDate} from '../../utils/jsUtils';
import {
  BLOG_AUTHOR_TITLE,
  BLOG_CATEGORY_TITLE,
  BLOG_DATE_TITLE,
} from '../../utils/content';
import BlogComments from './BlogComments';

const BlogContent = ({blogData}) => {
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
  const styles = postAuthScreenStyle(
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

  return (
    <View style={[styles.sectionContainer, customStyles.blogSecContainer]}>
      <Text style={[styles.sectionTitle, customStyles.blogSectionTitle]}>
        {blogData?.title}
      </Text>
      <View style={[customStyles.imgView]}>
        {blogData?.blogThumbnail ? (
          <Image
            source={{
              uri: blogData.blogThumbnail,
              height: isLandscapeMode ? screenHeight * 0.5 : screenHeight * 0.6,
              width: isLandscapeMode ? screenWidth * 0.6 : screenWidth * 0.8,
            }}
            resizeMode="stretch"
            style={[styles.img]}
          />
        ) : (
          <TitleThumbnail title={blogData?.title} />
        )}
      </View>
      <View style={[styles.dataContainer, customStyles.blogInfoView]}>
        {[
          `${BLOG_AUTHOR_TITLE}${blogData?.author}`,
          `${BLOG_DATE_TITLE} ${formattedDate(blogData?.updatedAt)}`,
          `${BLOG_CATEGORY_TITLE}${blogData?.category?.toUpperCase()}`,
          'Happy read!',
        ].map((text, i) => (
          <Text
            key={`blogInfo_${i}`}
            style={[styles.dataText, customStyles.blogInfoText]}>
            {text}
          </Text>
        ))}
      </View>
      <View style={[styles.dataContainer, customStyles.blogContentView]}>
        <HtmlRenderer
          htmlContent={blogData?.content}
          contentWidth={customStyles.blogContentView.width}
        />
      </View>
      <BlogComments blogData={blogData} />
    </View>
  );
};

export default BlogContent;

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
    blogSecContainer: {
      width:
        isLandscapeMode && !ifWebSmallLandscapeMode()
          ? screenWidth * 0.64
          : screenWidth * 0.94,
      alignItems:
        isLandscapeMode && !ifWebSmallLandscapeMode() ? 'flex-start' : 'center',
    },
    blogSectionTitle: {textAlign: 'center', width: '100%', paddingVertical: 8},
    imgView: {
      height: isLandscapeMode ? screenHeight * 0.5 : screenHeight * 0.6,
      width:
        isLandscapeMode && !ifWebSmallLandscapeMode()
          ? screenWidth * 0.64
          : screenWidth * 0.94,
      alignItems: 'center',
      borderColor: Colors.border[theme],
      borderWidth: isLandscapeMode ? 3 : 2,
      borderRadius: 24,
      overflow: 'hidden',
      marginBottom: 8,
    },
    blogInfoView: {
      width:
        isLandscapeMode && !ifWebSmallLandscapeMode()
          ? screenWidth * 0.64
          : screenWidth * 0.94,
      flexDirection: 'column',
      alignItems: 'flex-start',
      borderColor: Colors.border[theme],
      borderWidth: isLandscapeMode ? 3 : 2,
      borderRadius: 24,
      overflow: 'hidden',
      marginBottom: 8,
      paddingVertical: 8,
    },
    blogInfoText: {
      paddingVertical: 4,
      fontStyle: 'italic',
      alignSelf: 'flex-start',
      textAlign: 'left',
    },
    blogContentView: {
      width:
        isLandscapeMode && !ifWebSmallLandscapeMode()
          ? screenWidth * 0.64
          : screenWidth * 0.94,
      borderColor: Colors.border[theme],
      borderWidth: isLandscapeMode ? 3 : 2,
      borderRadius: 24,
      overflow: 'hidden',
      marginBottom: 8,
    },
  });
