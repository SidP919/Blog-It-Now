import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import useCommonParams from '../../hooks/useCommonParams';
import {postAuthScreenStyle} from '../../utils/commonStyles';
import {useDispatch, useSelector} from 'react-redux';
import useCustomNavigate from '../../hooks/useCustomNavigate';
import HeaderWrapper from '../HeaderWrapper';
import {
  CREATE_BLOG_BUTTON_SAVE_PREVIEW,
  CREATE_BLOG_BUTTON_SAVE_PUBLISH,
  CREATE_BLOG_MAIN_TITLE,
  CREATE_BLOG_MANDATORY_FIELDS_MSG,
  CREATE_BLOG_TITLE,
  GENERIC_ALERT_TITLE,
} from '../../utils/content';
import {
  CREATE_BLOG_API,
  CREATE_BLOG_ROUTE,
  GET_BLOG_CATEGORIES,
  IS_TOKEN_VALID_API,
  PUBLISH_BLOG_API,
} from '../../utils/constants';
import {
  getIsApiLoading,
  setIsApiLoading,
} from '../../redux/slices/ApiLoadingSlice';
import webService from '../../services/web-service';
import {GENERIC, logger} from '../../utils/utils';
import {getAuthData} from '../../redux/slices/AuthSlice';
import FormInput from '../../components/FormInput';
import {
  getBlogCategories,
  setBlogCategories,
} from '../../redux/slices/OtherDataSlice';
import {CREATE_BLOG_DEFAULT_CONTENT} from './createBlogConstant';
import {showCustomAlert} from '../../services/web-service';
import {READ_BLOG_ROUTE} from '../../utils/constants';
import ButtonA from '../../components/ButtonA';

const CreateBlog = () => {
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
    isAuthor,
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
  //   const {params} = useCustomRouteParams(route);
  const {navigate} = useCustomNavigate();
  const isApiLoading = useSelector(getIsApiLoading);
  const authData = useSelector(getAuthData);
  const blogCategories = useSelector(getBlogCategories);
  const [blogContent, setBlogContent] = useState(CREATE_BLOG_DEFAULT_CONTENT);

  const [blogData, setBlogData] = useState({
    title: '',
    content: '',
    category: '',
    tags: '',
    blogThumbnail: '',
    blogVideo: '',
  });

  // const [isApiLoading, setIsApiLoading] = useState(false);

  const createBlog = async () => {
    try {
      if (
        blogData?.title?.trim() &&
        blogData?.content.trim() &&
        blogData?.category.trim()
      ) {
        dispatch(setIsApiLoading(true));
        const response = await webService.postData(CREATE_BLOG_API, blogData);

        if (response?.data?.success) {
          return response.data.blog;
        }
      } else {
        showCustomAlert(
          GENERIC_ALERT_TITLE,
          CREATE_BLOG_MANDATORY_FIELDS_MSG,
          GENERIC,
        );
      }
    } catch (error) {
      logger('CreateBlog: API- ' + CREATE_BLOG_API + ' threw error:' + error);
    } finally {
      dispatch(setIsApiLoading(false));
    }
    return null;
  };

  const handleSavePreview = async () => {
    const createdBlog = await createBlog();
    logger('Created Blog:', createdBlog);
    if (createdBlog) {
      navigate(READ_BLOG_ROUTE, {state: {blog: createdBlog}});
    }
  };

  const handleSavePublish = async () => {
    const createdBlog = await createBlog();
    if (!createdBlog) {
      return;
    }
    logger('Created Blog:', createdBlog);
    try {
      dispatch(setIsApiLoading(true));
      const publishResponse = await webService.updateData(
        PUBLISH_BLOG_API,
        createdBlog._id,
        {},
      );

      if (publishResponse?.data?.success) {
        navigate(READ_BLOG_ROUTE, {state: {blog: createdBlog}});
      } else {
        showCustomAlert(
          'Publish failed',
          publishResponse?.data?.message ||
            'Unable to publish blog. Please try again.',
        );
      }
    } catch (error) {
      logger('CreateBlog: API- ' + PUBLISH_BLOG_API + ' threw error:' + error);
    } finally {
      dispatch(setIsApiLoading(false));
    }
  };

  useEffect(() => {
    if (!(isLoggedIn && isAuthor && authData)) {
      dispatch(setIsApiLoading(true));
      webService
        .getData(IS_TOKEN_VALID_API)
        .then(response => {
          dispatch(setIsApiLoading(false));
          if (response.data.success) {
            dispatch(
              setLoginState({
                isLoggedIn: true,
                authData: response.data.userData,
              }),
            );
          }
        })
        .catch(err => {
          dispatch(setIsApiLoading(false));
          logger(
            'Navigator:',
            IS_TOKEN_VALID_API + ' threw error:' + JSON.stringify(err),
          );
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthor, isLoggedIn, authData]);

  useEffect(() => {
    if (!(isAuthor && blogCategories)) {
      webService
        .getData(GET_BLOG_CATEGORIES)
        .then(response => response.data.value)
        .then(data => {
          dispatch(setBlogCategories(data?.split(',')));
        })
        .catch(err => {
          logger(
            `CreateBlog: API- ${GET_BLOG_CATEGORIES} threw following error: `,
            err,
          );
        });
    }
    if (authData && blogCategories) {
      setBlogContent(
        blogContent?.map(field => {
          if (field.dataLabel === 'authorName') {
            field.dataContent = authData?.fullname;
          }
          if (field.dataLabel === 'category') {
            field.dropdownOptions = blogCategories;
          }
          return field;
        }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthor, blogCategories]);

  return (
    <HeaderWrapper
      title={CREATE_BLOG_TITLE}
      currentScreen={CREATE_BLOG_ROUTE}
      isApiLoading={isApiLoading}>
      <ScrollView
        contentContainerStyle={[styles.screenContent]}
        showsVerticalScrollIndicator={false}>
        <Pressable style={[customStyles.createBlogContainer]}>
          <FormInput
            mainTitle={CREATE_BLOG_MAIN_TITLE}
            formContent={blogContent}
            data={blogData}
            setData={setBlogData}
            setFormContent={setBlogContent}
          />
          <View style={customStyles.actionButtonsWrapper}>
            <ButtonA
              func={handleSavePreview}
              bg={Colors.btnBgColor[theme]}
              color={Colors.btnText[theme]}
              border={Colors.border[theme]}
              title={CREATE_BLOG_BUTTON_SAVE_PREVIEW}
            />

            <ButtonA
              func={handleSavePublish}
              bg={Colors.btnBgColor[theme]}
              color={Colors.btnText[theme]}
              border={Colors.border[theme]}
              title={CREATE_BLOG_BUTTON_SAVE_PUBLISH}
            />
          </View>
        </Pressable>
      </ScrollView>
    </HeaderWrapper>
  );
};

export default CreateBlog;

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
    createBlogContainer: {
      marginTop: 8,
      paddingBottom: 48,
      width:
        screenWidth >= 1024
          ? screenWidth * 0.8
          : screenWidth >= 768 && isLandscapeMode
          ? screenWidth * 0.85
          : screenWidth * 0.9,
      alignSelf: 'center',
    },
    actionButtonsWrapper: {
      width:
        screenWidth >= 1024
          ? screenWidth * 0.8
          : screenWidth >= 768 && isLandscapeMode
          ? screenWidth * 0.85
          : screenWidth * 0.9,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: screenWidth >= 768 ? 'space-between' : 'center',
      marginTop: 16,
    },
  });
