import {
  Pressable,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import Toast from '../../components/Toast';
import useCommonParams from '../../hooks/useCommonParams';
import {postAuthScreenStyle} from '../../utils/commonStyles';
import {
  ifWebSmallLandscapeMode,
  logger,
  GENERIC,
  ifMobileDevice,
  ifWebLargeLandscapeMode,
} from '../../utils/utils';
import {formattedDate} from '../../utils/jsUtils';
import webService, {showCustomAlert} from '../../services/web-service';
import {
  COMMENTS_PAGE_SIZE,
  CREATE_COMMENT_API,
  CREATE_REPLY_API,
  GET_COMMENTS_API,
  GET_REPLIES_API,
  LIKE_DISLIKE_BLOG_API,
  REPLIES_PAGE_SIZE,
} from '../../utils/constants';
import {
  ADD_COMMENT_BTN_TXT,
  ADD_COMMENT_PLACEHOLDER,
  ADD_REPLY_BTN_TXT,
  ADD_REPLY_PLACEHOLDER,
  ADDING_BTN_TXT,
  BLOG_LOGIN_REQ_HD,
  BLOG_LOGIN_REQ_MSG,
  COMMENT_REQ_MSG,
  COMMENTS_TITLE,
  DISLIKE_BTN_TXT,
  HIDE_REPLIES_BTN_TXT,
  LD_MORE_REPLIES_BTN_TXT,
  LIKE_BTN_TXT,
  LIKES_BTN_TXT,
  MOST_LIKED,
  MOST_RECENT,
  NO_COMMENTS_YET,
  NO_REPLIES_YET,
  REPLIES_TITLE,
  REPLY_REQ_MSG,
  REPLY_TITLE,
  TOTAL,
  UNKNOWN,
  VIEW_BTN_TXT,
} from '../../utils/content';
import ButtonA from '../../components/ButtonA';
import ThreeDotsLoader from '../../components/ThreeDotsLoader';

const SORT_OPTIONS = [
  {id: 'mostLiked', label: MOST_LIKED},
  {id: 'mostRecent', label: MOST_RECENT},
];

const BlogComments = forwardRef(({blogId, refreshBlog}, ref) => {
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
    Colors,
    bigSize,
    mdSize,
    smSize,
    mdText,
    smText,
  );

  const [comments, setComments] = useState([]);
  const [sortBy, setSortBy] = useState('mostLiked');
  const [commentText, setCommentText] = useState('');
  const [activeReplyCommentId, setActiveReplyCommentId] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isReplySubmitting, setIsReplySubmitting] = useState(false);
  const [commentsPage, setCommentsPage] = useState(1);
  const [hasMoreComments, setHasMoreComments] = useState(true);
  const [isLoadingMoreComments, setIsLoadingMoreComments] = useState(false);
  const [repliesMap, setRepliesMap] = useState({});
  const [totalComments, setTotalComments] = useState(0);

  const fetchComments = useCallback(
    async (page = 1, append = false) => {
      if (!blogId) {
        return;
      }
      const requestPage = Math.max(1, page);
      try {
        if (requestPage === 1) {
          setIsLoading(true);
        } else {
          setIsLoadingMoreComments(true);
        }

        const response = await webService.getData(
          `${GET_COMMENTS_API}/${blogId}?sortBy=${sortBy}&page=${requestPage}&limit=${COMMENTS_PAGE_SIZE}`,
        );

        const fetchedComments = response?.data?.comments || [];
        const pagination = response?.data?.pagination;
        logger('BlogComments: fetched comments', {
          blogId,
          sortBy,
          page: requestPage,
          fetchedComments,
          pagination,
        });
        setComments(prev =>
          append ? [...prev, ...fetchedComments] : fetchedComments,
        );
        setCommentsPage(requestPage);
        setHasMoreComments(
          pagination?.hasMore ?? fetchedComments.length === COMMENTS_PAGE_SIZE,
        );
        setTotalComments(pagination?.totalComments || 0);
      } catch (error) {
        logger('BlogComments: fetchComments failed', error);
      } finally {
        logger('BlogComments: fetchComments completed', {
          blogId,
          sortBy,
          page: requestPage,
        });
        setIsLoading(false);
        setIsLoadingMoreComments(false);
      }
    },
    [blogId, sortBy],
  );

  const loadMoreComments = useCallback(() => {
    logger('BlogComments: loadMoreComments called', {
      commentsPage,
      hasMoreComments,
      isLoading,
      isLoadingMoreComments,
    });
    if (!hasMoreComments || isLoadingMoreComments || isLoading) {
      return;
    }
    fetchComments(commentsPage + 1, true);
  }, [
    commentsPage,
    hasMoreComments,
    isLoading,
    isLoadingMoreComments,
    fetchComments,
  ]);

  useImperativeHandle(ref, () => ({
    loadMoreComments: () => {
      loadMoreComments();
    },
  }));

  const loadReplies = async (commentId, page = 1, append = false) => {
    setRepliesMap(prev => ({
      ...prev,
      [commentId]: {
        ...prev[commentId],
        loading: true,
      },
    }));

    try {
      const response = await webService.getData(
        `${GET_REPLIES_API}/${commentId}?page=${page}&limit=${REPLIES_PAGE_SIZE}`,
      );
      const fetchedReplies = response?.data?.replies || [];
      const hasMore =
        response?.data?.pagination?.hasMore ??
        fetchedReplies.length === REPLIES_PAGE_SIZE;

      setRepliesMap(prev => ({
        ...prev,
        [commentId]: {
          items: append
            ? [...(prev[commentId]?.items || []), ...fetchedReplies]
            : fetchedReplies,
          page,
          hasMore,
          loading: false,
          expanded: true,
        },
      }));
    } catch (error) {
      logger('BlogComments: loadReplies failed', error);
      setRepliesMap(prev => ({
        ...prev,
        [commentId]: {
          ...prev[commentId],
          loading: false,
        },
      }));
    }
  };

  const handleToggleReplies = commentId => {
    const currentReply = repliesMap[commentId];
    const prevReply = repliesMap[activeReplyCommentId];

    if (currentReply?.expanded) {
      setRepliesMap(prev => ({
        ...prev,
        [commentId]: {...currentReply, expanded: false},
      }));
      setActiveReplyCommentId(null);
      setReplyText('');
      return;
    }

    if (currentReply?.items?.length) {
      setRepliesMap(prev => ({
        ...prev,
        [commentId]: {...currentReply, expanded: true},
        [activeReplyCommentId]: {...prevReply, expanded: false},
      }));
      setActiveReplyCommentId(current =>
        current === commentId ? null : commentId,
      );
      setReplyText('');
      return;
    }
    setActiveReplyCommentId(current =>
      current === commentId ? null : commentId,
    );
    setReplyText('');
    loadReplies(commentId, 1, false);
  };

  const renderReply = (reply, comment) => {
    return (
      <View key={reply.id || reply._id} style={customStyles.replyCard}>
        <View style={customStyles.commentHeader}>
          <Text style={customStyles.replyAuthor}>
            {reply.replier?.fullname || UNKNOWN}
          </Text>
          <Text style={customStyles.commentDate}>
            {formattedDate(reply.createdAt)}
          </Text>
        </View>

        <Text style={customStyles.replyContent}>{reply.content}</Text>

        <View style={customStyles.commentMetaRow}>
          <Text style={customStyles.commentMetaText}>
            {reply.noOfLikes} {LIKES_BTN_TXT}
          </Text>
        </View>

        <View style={customStyles.commentActionsRow}>
          <Pressable
            onPress={() =>
              handleLikeDislike(
                'reply',
                reply.id || reply._id,
                'like',
                comment.id || comment._id,
              )
            }
            style={customStyles.actionButton}>
            <Text style={customStyles.actionButtonText}>{LIKE_BTN_TXT}</Text>
          </Pressable>
          <Pressable
            onPress={() =>
              handleLikeDislike(
                'reply',
                reply.id || reply._id,
                'dislike',
                comment.id || comment._id,
              )
            }
            style={customStyles.actionButton}>
            <Text style={customStyles.actionButtonText}>{DISLIKE_BTN_TXT}</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  const handleAddComment = async () => {
    if (!isLoggedIn) {
      showCustomAlert(BLOG_LOGIN_REQ_HD, BLOG_LOGIN_REQ_MSG, GENERIC);
      return;
    }

    const trimmed = commentText.trim();
    if (!trimmed) {
      Toast({
        type: 'error',
        position: 'bottom',
        text1: COMMENT_REQ_MSG,
        text2: '',
        visibilityTime: 2000,
      });
      return;
    }

    try {
      setIsSubmitting(true);
      await webService.postData(`${CREATE_COMMENT_API}/${blogId}`, {
        content: trimmed,
      });
      setCommentText('');
      await fetchComments();
      refreshBlog?.();
    } catch (error) {
      logger('BlogComments: add comment failed', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddReply = async commentId => {
    if (!isLoggedIn) {
      showCustomAlert(BLOG_LOGIN_REQ_HD, BLOG_LOGIN_REQ_MSG, GENERIC);
      return;
    }

    const trimmed = replyText.trim();
    if (!trimmed) {
      Toast({
        type: 'error',
        position: 'bottom',
        text1: REPLY_REQ_MSG,
        text2: '',
        visibilityTime: 2000,
      });
      return;
    }

    try {
      setIsReplySubmitting(true);
      await webService.postData(`${CREATE_REPLY_API}/${commentId}`, {
        content: trimmed,
      });
      setReplyText('');
      // setActiveReplyCommentId(null);
      await fetchComments();
      await loadReplies(commentId, 1, false);
    } catch (error) {
      logger('BlogComments: add reply failed', error);
    } finally {
      setIsReplySubmitting(false);
    }
  };

  const handleLikeDislike = async (
    targetType,
    targetId,
    action,
    parentCommentId,
  ) => {
    if (!isLoggedIn) {
      showCustomAlert(BLOG_LOGIN_REQ_HD, BLOG_LOGIN_REQ_MSG, GENERIC);
      return;
    }

    try {
      await webService.putData(LIKE_DISLIKE_BLOG_API, {
        targetId,
        targetType,
        action,
      });

      if (targetType === 'reply' && parentCommentId) {
        const page = repliesMap[parentCommentId]?.page || 1;
        await loadReplies(parentCommentId, page, false);
      }

      await fetchComments();
    } catch (error) {
      logger(
        `BlogComments: like/dislike ${targetType} ${targetId} failed`,
        error,
      );
    }
  };

  const renderComment = ({item: comment}) => {
    const commentReplies =
      repliesMap[comment.id] || repliesMap[comment._id] || {};

    return (
      <View style={customStyles.commentCard}>
        <View style={customStyles.commentHeader}>
          <Text style={customStyles.commentAuthor}>
            {comment.commenter?.fullname || UNKNOWN}
          </Text>
          <Text style={customStyles.commentDate}>
            {formattedDate(comment.createdAt)}
          </Text>
        </View>

        <Text style={customStyles.commentContent}>{comment.content}</Text>

        <View style={customStyles.commentMetaRow}>
          <Text style={customStyles.commentMetaText}>
            {comment.noOfLikes} likes
          </Text>
          <Text style={customStyles.commentMetaText}>
            {comment.noOfReplies}{' '}
            {comment.noOfReplies < 2 ? REPLY_TITLE : REPLIES_TITLE}
          </Text>
        </View>

        <View style={customStyles.commentActionsRow}>
          <Pressable
            onPress={() =>
              handleLikeDislike('comment', comment.id || comment._id, 'like')
            }
            style={customStyles.actionButton}>
            <Text style={customStyles.actionButtonText}>{LIKE_BTN_TXT}</Text>
          </Pressable>
          <Pressable
            onPress={() =>
              handleLikeDislike('comment', comment.id || comment._id, 'dislike')
            }
            style={customStyles.actionButton}>
            <Text style={customStyles.actionButtonText}>{DISLIKE_BTN_TXT}</Text>
          </Pressable>
          <Pressable
            onPress={() => handleToggleReplies(comment.id || comment._id)}
            style={customStyles.actionButton}>
            <Text style={customStyles.actionButtonText}>
              {comment.noOfReplies > 0
                ? commentReplies.expanded &&
                  activeReplyCommentId === (comment.id || comment._id)
                  ? HIDE_REPLIES_BTN_TXT
                  : `${VIEW_BTN_TXT} ${comment.noOfReplies} ${REPLIES_TITLE}`
                : REPLY_TITLE}
            </Text>
          </Pressable>
        </View>

        {activeReplyCommentId === (comment.id || comment._id) && (
          <View style={customStyles.replyInputWrapper}>
            <TextInput
              multiline
              value={replyText}
              onChangeText={setReplyText}
              placeholder={ADD_REPLY_PLACEHOLDER}
              placeholderTextColor={Colors.placeHolderText[theme]}
              style={[
                styles.dataInput,
                customStyles.replyInput,
                {color: Colors.inputText[theme]},
              ]}
            />
            <View style={customStyles.replyButtonWrapper}>
              <ButtonA
                func={() => handleAddReply(comment._id)}
                bg={Colors.btnBgColor[theme]}
                color={Colors.btnText[theme]}
                border={Colors.border[theme]}
                title={isReplySubmitting ? ADDING_BTN_TXT : ADD_REPLY_BTN_TXT}
                customStyle={{
                  ...(isReplySubmitting
                    ? customStyles.replyButtonDisabled
                    : null),
                  ...customStyles.replyButton,
                }}
                isDisabled={isSubmitting}
                size={'sm'}
              />
            </View>
          </View>
        )}

        {commentReplies.expanded && (
          <View style={customStyles.repliesSection}>
            {commentReplies.loading && (
              <ThreeDotsLoader
                theme={theme}
                hideBrand={true}
                placement="flex-end"
              />
            )}

            {activeReplyCommentId === (comment.id || comment._id) && (
              <FlatList
                data={commentReplies.items || []}
                renderItem={({item}) => renderReply(item, comment)}
                keyExtractor={reply => reply.id || reply._id}
                scrollEnabled={false}
                nestedScrollEnabled
                contentContainerStyle={customStyles.repliesList}
                ListEmptyComponent={
                  !commentReplies.loading ? (
                    <Text style={customStyles.emptyText}>{NO_REPLIES_YET}</Text>
                  ) : null
                }
              />
            )}

            {activeReplyCommentId === (comment.id || comment._id) &&
              commentReplies.hasMore && (
                <ButtonA
                  func={() =>
                    loadReplies(
                      comment.id || comment._id,
                      commentReplies.page + 1,
                      true,
                    )
                  }
                  customStyle={customStyles.loadMoreButton}
                  bg={Colors.btnBgColor[theme]}
                  color={Colors.btnText[theme]}
                  border={Colors.border[theme]}
                  title={LD_MORE_REPLIES_BTN_TXT}
                  size="sm"
                />
              )}
          </View>
        )}

        {activeReplyCommentId === comment._id &&
          comment.replies?.map(reply => {
            return (
              <View key={reply._id} style={customStyles.replyCard}>
                <View style={customStyles.commentHeader}>
                  <Text style={customStyles.replyAuthor}>
                    {reply.replierId?.fullname || UNKNOWN}
                  </Text>
                  <Text style={customStyles.commentDate}>
                    {formattedDate(reply.createdAt)}
                  </Text>
                </View>

                <Text style={customStyles.replyContent}>{reply.content}</Text>

                <View style={customStyles.commentMetaRow}>
                  <Text style={customStyles.commentMetaText}>
                    {reply.noOfLikes} likes
                  </Text>
                </View>

                <View style={customStyles.commentActionsRow}>
                  <Pressable
                    onPress={() =>
                      handleLikeDislike('reply', reply._id, 'like')
                    }
                    style={customStyles.actionButton}>
                    <Text style={customStyles.actionButtonText}>
                      {LIKE_BTN_TXT}
                    </Text>
                  </Pressable>
                  <Pressable
                    onPress={() =>
                      handleLikeDislike('reply', reply._id, 'dislike')
                    }
                    style={customStyles.actionButton}>
                    <Text style={customStyles.actionButtonText}>
                      {DISLIKE_BTN_TXT}
                    </Text>
                  </Pressable>
                </View>
              </View>
            );
          })}
      </View>
    );
  };

  const renderEmptyList = () => (
    <Text style={customStyles.emptyText}>{NO_COMMENTS_YET}</Text>
  );

  useEffect(() => {
    if (!blogId) {
      return;
    }

    fetchComments();
    const randomInterval =
      Math.floor(Math.random() * (70000 - 60000 + 1)) + 60000;
    const intervalId = setInterval(fetchComments, randomInterval);
    return () => clearInterval(intervalId);
  }, [blogId, fetchComments]);

  return (
    <View style={[styles.sectionContainer, customStyles.commentsContainer]}>
      <View style={customStyles.headerRow}>
        <Text style={[styles.sectionTitle, customStyles.commentsTitle]}>
          {`${TOTAL} ${COMMENTS_TITLE} (` + (totalComments || 0) + ')'}
        </Text>
        <View style={customStyles.sortWrapper}>
          {SORT_OPTIONS.map(option => (
            <Pressable
              key={option.id}
              onPress={() => setSortBy(option.id)}
              style={[
                customStyles.sortButton,
                sortBy === option.id && customStyles.sortButtonActive,
              ]}>
              <Text
                style={[
                  customStyles.sortButtonText,
                  sortBy === option.id && customStyles.sortButtonTextActive,
                ]}>
                {option.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={customStyles.commentInputContainer}>
        <TextInput
          multiline
          value={commentText}
          onChangeText={setCommentText}
          placeholder={ADD_COMMENT_PLACEHOLDER}
          placeholderTextColor={Colors.placeHolderText[theme]}
          style={[styles.dataInput, customStyles.commentInput]}
        />
        <View style={customStyles.addButtonWrapper}>
          <ButtonA
            func={handleAddComment}
            bg={Colors.btnBgColor[theme]}
            color={Colors.btnText[theme]}
            border={Colors.border[theme]}
            title={isSubmitting ? ADDING_BTN_TXT : ADD_COMMENT_BTN_TXT}
            isDisabled={isSubmitting}
          />
        </View>
      </View>
      <View style={customStyles.flatListContainer}>
        <FlatList
          style={customStyles.commentList}
          contentContainerStyle={customStyles.commentListContent}
          data={comments}
          renderItem={renderComment}
          keyExtractor={item => item.id || item._id}
          scrollEnabled={true}
          nestedScrollEnabled
          removeClippedSubviews={false}
          initialNumToRender={comments.length || COMMENTS_PAGE_SIZE}
          maxToRenderPerBatch={comments.length || COMMENTS_PAGE_SIZE}
          windowSize={Math.max(21, comments.length || COMMENTS_PAGE_SIZE)}
          ListFooterComponent={
            isLoadingMoreComments ? (
              <ThreeDotsLoader theme={theme} hideBrand={true} />
            ) : null
          }
          ListEmptyComponent={!isLoading ? renderEmptyList : null}
        />
      </View>
    </View>
  );
});

export default BlogComments;

const style = (
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
) =>
  StyleSheet.create({
    commentsContainer: {
      width:
        isLandscapeMode && !ifWebSmallLandscapeMode()
          ? screenWidth * 0.64
          : screenWidth * 0.94,
      alignItems:
        isLandscapeMode && !ifWebSmallLandscapeMode() ? 'flex-start' : 'center',
      borderColor: Colors.border[theme],
      borderWidth: isLandscapeMode ? 3 : 2,
      borderRadius: 24,
      overflow: 'hidden',
      padding: 12,
      backgroundColor: Colors.bgColor[theme],
    },
    headerRow: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: ifMobileDevice()
        ? 'flex-start'
        : ifWebLargeLandscapeMode()
        ? 'space-between'
        : 'space-between',
      flexWrap: 'wrap',
      alignItems: 'center',
      marginBottom: 16,
      gap: 4,
    },
    commentsTitle: {
      marginBottom: 0,
    },
    sortWrapper: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 6,
      justifyContent: ifMobileDevice()
        ? 'flex-start'
        : ifWebLargeLandscapeMode()
        ? 'flex-end'
        : 'flex-start',
      marginHorizontal: ifMobileDevice() ? 0 : 16,
      paddingHorizontal: 12,
    },
    sortButton: {
      marginVertical: 4,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 20,
      borderColor: Colors.border[theme],
      borderWidth: 1,
    },
    sortButtonActive: {
      backgroundColor: Colors.main[theme],
    },
    sortButtonText: {
      fontSize: smText,
      color: Colors.btnText[theme],
    },
    sortButtonTextActive: {
      color: Colors.iconOnBgColor[theme],
      fontWeight: '700',
    },
    commentInputContainer: {
      width: '100%',
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 20,
      padding: 0,
      backgroundColor: Colors.main[theme],
      borderRadius: 16,
      borderColor: Colors.border[theme],
      borderWidth: 1,
    },
    commentInput: {
      flex: 1,
      minHeight: 120,
      borderColor: Colors.border[theme],
      borderWidth: 1,
      borderRadius: 12,
      padding: 12,
      margin: 8,
      backgroundColor: Colors.bgColor[theme],
      maxWidth: '100%',
      fontSize: smText,
      color: Colors.inputText[theme],
      textAlignVertical: 'center',
    },
    addButtonWrapper: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      maxHeight: 64,
    },
    addButton: {
      height: ifMobileDevice() ? 40 : 48,
      paddingHorizontal: ifMobileDevice() ? 14 : 20,
      paddingVertical: ifMobileDevice() ? 8 : 10,
      borderRadius: 12,
      minWidth: ifMobileDevice() ? 100 : 120,
      alignItems: 'center',
      backgroundColor: 'red',
    },
    addButtonDisabled: {
      opacity: 0.6,
    },
    addButtonText: {
      fontSize: ifMobileDevice() ? smText : mdText,
      fontWeight: '700',
      textAlign: 'center',
    },
    flatListContainer: {
      width: ifMobileDevice() || !isLandscapeMode ? '100%' : '80%',
      minHeight: 200,
    },
    commentList: {
      width: '100%',
    },
    commentListContent: {
      paddingBottom: 16,
    },
    emptyText: {
      color: Colors.placeHolderText[theme],
      fontSize: smText,
      textAlign: 'center',
      marginVertical: 24,
    },
    commentCard: {
      maxWidth: '100%',
      borderColor: Colors.border[theme],
      borderWidth: 1,
      borderRadius: 14,
      padding: 12,
      marginBottom: 12,
      backgroundColor: Colors.inputView[theme],
    },
    commentHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 10,
      flexWrap: 'wrap',
      gap: 8,
    },
    commentAuthor: {
      fontSize: mdText,
      fontWeight: '700',
      color: Colors.title[theme],
      flex: 1,
    },
    replyAuthor: {
      fontSize: smText,
      fontWeight: '700',
      color: Colors.title[theme],
      flex: 1,
    },
    commentDate: {
      fontSize: smText,
      color: Colors.placeHolderText[theme],
      minWidth: 'auto',
    },
    commentContent: {
      fontSize: smText,
      color: Colors.text[theme],
      marginBottom: 10,
      lineHeight: smText * 1.4,
    },
    commentMetaRow: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      gap: 16,
      marginBottom: 10,
      flexWrap: 'wrap',
    },
    commentMetaText: {
      fontSize: smText,
      color: Colors.placeHolderText[theme],
    },
    commentActionsRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      marginBottom: 10,
    },
    actionButton: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: Colors.border[theme],
      backgroundColor: Colors.bgColor[theme],
    },
    actionButtonText: {
      color: Colors.text[theme],
      fontSize: smText,
      fontWeight: '500',
    },
    replyInputWrapper: {
      marginTop: 12,
      padding: 8,
      backgroundColor: Colors.main[theme],
      borderRadius: 12,
      borderColor: Colors.border[theme],
      borderWidth: 1,
      marginBottom: 10,
    },
    replyInput: {
      width: '100%',
      minHeight: 100,
      borderColor: Colors.border[theme],
      borderWidth: 1,
      borderRadius: 12,
      padding: 12,
      backgroundColor: Colors.bgColor[theme],
      maxWidth: '100%',
      fontSize: smText,
    },
    replyButtonWrapper: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      width: '100%',
    },
    replyButton: {
      marginHorizontal: 0,
      paddingVertical: 8,
      alignItems: 'center',
    },
    replyButtonDisabled: {
      opacity: 0.6,
    },
    replyButtonText: {
      fontSize: ifMobileDevice() ? smText : smText,
      fontWeight: '700',
      textAlign: 'center',
    },
    replyCard: {
      borderColor: Colors.border[theme],
      borderWidth: 1,
      borderRadius: 12,
      padding: 10,
      marginTop: 10,
      marginLeft: ifMobileDevice() ? 16 : 32,
      backgroundColor: Colors.bgColor[theme],
    },
    loadMoreButton: {
      marginHorizontal: 0,
      marginTop: 12,
      alignSelf: 'center',
    },
    replyContent: {
      color: Colors.text[theme],
      fontSize: smText,
      marginBottom: 8,
      lineHeight: smText * 1.4,
    },
  });
