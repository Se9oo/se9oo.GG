import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import router from 'next/router';
import useInput from '../../hooks/useInput';
import { editPostRequestAction } from '../../reducer/post';
import CommonModal, { errorModal } from '../CommonModal';
import { Button, Form, Input } from 'antd';
import styled from 'styled-components';

const EditPostForm = ({ data }) => {
  const dispatch = useDispatch('');
  
  // 제목 입력
  const [postTitle, onChangePostTitle] = useInput(data.postTitle);
  const [postContent, onChangePostContent] = useInput(data.postContent);
  // modal content
  const [modalContent, setModalContent] = useState('');
  // modal show
  const [showModal, setShowModal] = useState(false);

  const onClickEditBtn = () => {
    if (postTitle === data.postTitle && postContent === data.postContent ) {
      errorModal('변경된 내용이 없습니다.')
      return;
    }

    setModalContent({
      title: '게시글 수정',
      onOk: onOkEditModal,
      onCancel: onCancelEditModal,
      content: '수정 하시겠습니까?',
    });
    setShowModal(true);
  };

  // 게시글 수정 ok
  const onOkEditModal = () => {
    dispatch(editPostRequestAction({
      postId: data.postId,
      postTitle: postTitle,
      postContent: postContent,
    }));
    setShowModal(false);
    router.back();
  };

  // 게시글 수정 취소
  const onCancelEditModal = () => {
    setShowModal(false);
  };

  // 취소
  const onClickCancelBtn = () => {
    router.back();
  };

  return (
    <Container>
      <Form onFinish="">
        <Content>
          <label htmlFor="post-writer">작성자</label>
          <strong>{data && data.userNickname}</strong>
        </Content>
        <Content>
          <label htmlFor="post-title">제목</label>
          <Input type="text" name="post-title" maxLength={30} value={postTitle} onChange={onChangePostTitle} />
        </Content>
        <Content>
          <label htmlFor="post-content">내용</label>
          <Input.TextArea
            rows={5}
            showCount
            maxLength={140}
            value={postContent}
            onChange={onChangePostContent}
            style={{ marginBottom: '.5rem' }}
          />
        </Content>
        <PostButton type="primary" htmlType="submit" style={{ marginBottom: '1rem' }} onClick={onClickEditBtn}>
          수정
        </PostButton>
        <PostButton onClick={onClickCancelBtn}>취소</PostButton>
      </Form>
      <CommonModal modalContent={modalContent} visible={showModal} />
    </Container>
  );
};

EditPostForm.defaultProps = {
  data: {
    postTitle: '',
    postContent: '',
  },
};

export default EditPostForm;

const Container = styled.div`
  width: 100%;
  padding: 1rem;
  background-color: #ffffff;
`;

const Content = styled.div`
  margin-bottom: 1rem;

  & strong {
    display: block;
    opacity: 0.5;
  }
`;

const PostButton = styled(Button)`
  width: 100%;
`;
