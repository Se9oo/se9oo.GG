import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import { addPostRequestAction } from '../reducer/post';
import useInput from '../hooks/useInput';
import { PostFormContainer, PostContentContainer, PostButton } from '../styles/components/Components';
import { Form, Input, } from 'antd';
import shortId from 'shortid';
import { errorModal } from './CommonModal';

const PostForm = () => {
  const dispatch = useDispatch('');
  const { me } = useSelector((state) => (state.user));
  const { addPostLoading } = useSelector((state) => (state.post));

  // 제목 입력
  const [postTitle, onChangePostTitle] = useInput('');
  // 글 입력
  const [postContent, onChangePostContent] = useInput('');

  // 게시글 등록
  const onSubmitAddPost = useCallback(() => {
    if (!postTitle) {
      errorModal(`'제목' 란을 채워주세요.`);
      return;
    }

    if (!postContent) {
      errorModal(`'내용' 란을 채워주세요.`);
      return;
    }

    dispatch(addPostRequestAction({
      postId: shortId.generate(),
      user: {
        email: me.email,
        nickname: me.nickname,
      },
      title: postTitle,
      content: postContent,
      comments: [],
    }));
    Router.push('/community'); 
  }, [me, postTitle, postContent]);

  const onClickPostCancel = useCallback(() => {
    Router.push('/community');
  }, []);

  return (
    <PostFormContainer>
      <Form onFinish={onSubmitAddPost}>
        {/* 작성자 */}
        <PostContentContainer>
          <label htmlFor="post-writer">작성자</label>
          <strong>{me && me.nickname}</strong>
        </PostContentContainer>
        {/* 제목 */}
        <PostContentContainer>
          <label htmlFor="post-title">제목</label>
          <Input
            type="text"
            name="post-title"
            placeholder="제목을 입력하세요."
            maxLength={30}
            value={postTitle}
            onChange={onChangePostTitle}
          />
        </PostContentContainer>
        {/* 내용 */}
        <PostContentContainer>
          <label htmlFor="post-content">내용</label>
          <Input.TextArea
            rows={5}
            placeholder="오늘 무슨 일이 있었나요?"
            showCount
            maxLength={140}
            value={postContent}
            onChange={onChangePostContent}
            style={{ marginBottom: '.5rem' }}
          />
        </PostContentContainer>
        {/* 등록 */}
        <PostButton 
          type="primary"
          htmlType="submit"
          loading={addPostLoading}
          style={{ marginBottom: '1rem'}}
        >
          등록
        </PostButton>
        <PostButton
          onClick={onClickPostCancel}
        >
          취소
        </PostButton>
      </Form>
    </PostFormContainer>
    
  );
};

export default PostForm;