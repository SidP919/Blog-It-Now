import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import useCommonParams from '../../hooks/useCommonParams';
import TitleThumbnail from '../../components/TitleThumbnail';
import HtmlRenderer from '../../components/HtmlRenderer';
import {postAuthScreenStyle} from '../../utils/commonStyles';
import {
  ifWebSmallLandscapeMode,
  logger,
  GENERIC,
  ifWebLargeLandscapeMode,
} from '../../utils/utils';
import {formattedDate} from '../../utils/jsUtils';
import {
  BLOG_AUTHOR_TITLE,
  BLOG_CATEGORY_TITLE,
  BLOG_DATE_TITLE,
  BLOG_HAPPY_READ_MSG,
  BLOG_LOGIN_REQ_HD,
  BLOG_LOGIN_REQ_MSG,
  DISLIKE_BTN_TXT,
  DISLIKES_BTN_TXT,
  LIKE_BTN_TXT,
  LIKES_BTN_TXT,
} from '../../utils/content';
import BlogComments from './BlogComments';
import IconTextBtn from '../../components/IconTextBtn';
import {
  DISLIKE_ICON,
  DISLIKE_SOLID_ICON,
  LIKE_ICON,
  LIKE_SOLID_ICON,
} from '../../utils/images';
import useCustomNavigate from '../../hooks/useCustomNavigate';
import webService, {showCustomAlert} from '../../services/web-service';
import {LIKE_DISLIKE_BLOG_API} from '../../utils/constants';

const BlogContent = ({blogData, refreshBlog, commentsRef}) => {
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
  const {navigate} = useCustomNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
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

  const isLiked = !!blogData?.liked;
  const isDisliked = !!blogData?.disliked;
  const blogId = blogData?.id || blogData?._id;
  const likeDisabled = isProcessing || isLiked;
  const dislikeDisabled = isProcessing || isDisliked;

  const handleLikeDislike = async action => {
    logger(`BlogContent: ${action} button clicked`);
    if (!isLoggedIn) {
      showCustomAlert(BLOG_LOGIN_REQ_HD, BLOG_LOGIN_REQ_MSG, GENERIC);
      return;
    }

    if (!blogData.id) {
      return;
    }

    setIsProcessing(true);
    try {
      await webService.putData(LIKE_DISLIKE_BLOG_API, {
        targetId: blogId,
        targetType: 'blog',
        action,
      });
      if (refreshBlog) {
        await refreshBlog();
      }
    } catch (error) {
      logger('BlogContent: like/dislike failed', error);
    } finally {
      setIsProcessing(false);
    }
  };

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
      <View style={[styles.dataContainer, customStyles.blogInfoContainer]}>
        <View style={customStyles.blogInfoDetailsView}>
          {[
            `${BLOG_AUTHOR_TITLE}${blogData?.author}`,
            `${BLOG_DATE_TITLE} ${formattedDate(blogData?.createdAt)}`,
            `${BLOG_CATEGORY_TITLE}${blogData?.category?.toUpperCase()}`,
            BLOG_HAPPY_READ_MSG,
          ].map((text, i) => (
            <Text
              key={`blogInfo_${i}`}
              style={[styles.dataText, customStyles.blogInfoText]}>
              {text}
            </Text>
          ))}
        </View>
        <View style={customStyles.blogInfoButtonView}>
          <IconTextBtn
            func={() => handleLikeDislike('like')}
            disabled={likeDisabled}
            bg={Colors.btnBgColor[theme]}
            color={Colors.btnText[theme]}
            border={Colors.border[theme]}
            title={
              blogData?.noOfLikes > 0
                ? `${blogData.noOfLikes} ${
                    blogData.noOfLikes > 1 ? LIKES_BTN_TXT : LIKE_BTN_TXT
                  } `
                : LIKE_BTN_TXT
            }
            icon={blogData?.liked ? LIKE_SOLID_ICON : LIKE_ICON}
          />
          <IconTextBtn
            func={() => handleLikeDislike('dislike')}
            disabled={dislikeDisabled}
            bg={Colors.btnBgColor[theme]}
            color={Colors.btnText[theme]}
            border={Colors.border[theme]}
            title={
              blogData?.noOfDislikes > 0
                ? `${blogData.noOfDislikes} ${
                    blogData.noOfDislikes > 1
                      ? DISLIKES_BTN_TXT
                      : DISLIKE_BTN_TXT
                  } `
                : DISLIKE_BTN_TXT
            }
            icon={blogData?.disliked ? DISLIKE_SOLID_ICON : DISLIKE_ICON}
          />
        </View>
      </View>
      <View style={[styles.dataContainer, customStyles.blogContentView]}>
        <HtmlRenderer
          htmlContent={blogData?.content}
          contentWidth={customStyles.blogContentView.width}
        />
      </View>
      {isLandscapeMode && ifWebLargeLandscapeMode() && (
        <BlogComments
          blogId={blogId}
          refreshBlog={refreshBlog}
          ref={commentsRef}
        />
      )}
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
          ? screenWidth * 0.64 - 24
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
    blogInfoContainer: {
      width:
        isLandscapeMode && !ifWebSmallLandscapeMode()
          ? screenWidth * 0.64
          : screenWidth * 0.94,
      flexDirection: 'row',
      alignItems: 'flex-start',
      borderColor: Colors.border[theme],
      borderWidth: isLandscapeMode ? 3 : 2,
      borderRadius: 24,
      overflow: 'hidden',
      marginBottom: 8,
      paddingVertical: 8,
    },
    blogInfoDetailsView: {
      width:
        isLandscapeMode && !ifWebSmallLandscapeMode()
          ? screenWidth * 0.32
          : screenWidth * 0.6,
      flexDirection: 'column',
      alignItems: 'flex-start',
      overflow: 'hidden',
      marginBottom: 8,
      paddingVertical: 8,
    },
    blogInfoButtonView: {
      width:
        isLandscapeMode && !ifWebSmallLandscapeMode()
          ? screenWidth * 0.3
          : screenWidth * 0.32,
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
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
