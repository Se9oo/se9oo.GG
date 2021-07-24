import React, { useState } from 'react';
import useInput from '../../hooks/useInput';
import { Button, Form, Input } from 'antd';
import CommonModal from '../CommonModal';
import styled from 'styled-components';

const EditPostForm = ({ data }) => {
  // 제목 입력
  const [postTitle, onChangePostTitle] = useInput(data.postTitle);
  const [postContent, onChangePostContent] = useInput(data.postContent);
  // modal content
  const [modalContent, setModalContent] = useState('');
  // modal show
  const [showModal, setShowModal] = useState(false);

  return (
    <Container>
      <Form onFinish="">
        <Content>
          <label htmlFor="post-writer">작성자</label>
          <strong>{data && data.nickname}</strong>
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
        <PostButton type="primary" htmlType="submit" style={{ marginBottom: '1rem' }}>
          수정
        </PostButton>
        <PostButton onClick="">취소</PostButton>
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
