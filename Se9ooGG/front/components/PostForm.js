import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import { addPostRequestAction } from '../reducer/post';
import useInput from '../hooks/useInput';
import { PostFormContainer, PostContentContainer, PostButton } from '../styles/components/Components';
import { Form, Input, } from 'antd';
import shortId from 'shortid';
import CommonModal, { errorModal } from './CommonModal';

const PostForm = () => {
  const dispatch = useDispatch('');
  const { me } = useSelector((state) => (state.user));
  
  // modal content
  const [modalContent, setModalContent] = useState('');
  // modal show
  const [showModal, setShowModal] = useState(false);
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

    setModalContent({
      title: "글 등록",
      onOk: onOkAddModal,
      onCancel: onCancelAddModal,
      content: "등록 하시겠습니까?"
    });
    setShowModal(true);
  }, [postTitle, postContent]);

  // 게시글 등록 modal ok
  const onOkAddModal = useCallback(() => {
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
    setShowModal(false);
    Router.push('/community'); 
  }, [me, postTitle, postContent]);

  // 게시글 등록 modal cancel
  const onCancelAddModal = useCallback(() => {
    setShowModal(false);
  });

  // 게시글 등록 취소
  const onClickPostCancel = useCallback(() => {
    setModalContent({
      title: "글 등록 - 취소",
      onOk: onOkCancelModal,
      onCancel: onCancelCancelModal,
      content: "작성중인 내용은 저장되지 않습니다.\n취소 하시겠습니까?"
    });
    setShowModal(true);
  }, []);

  // 게시글 등록 취소 modal ok
  const onOkCancelModal = useCallback(() => {
    setShowModal(false);
    Router.push('/community');
  }, []);

// 게시글 등록 취소 modal cancel
  const onCancelCancelModal = useCallback(() => {
    setShowModal(false);
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
      <CommonModal
        title={modalContent.title}
        visible={showModal}
        onOk={modalContent.onOk}
        onCancel={modalContent.onCancel}
        content={modalContent.content}
      />
    </PostFormContainer>
  );
};

export default PostForm;