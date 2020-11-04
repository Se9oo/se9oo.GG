import React, { useCallback } from 'react';
import { Button, Form, Input, } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addPostRequestAction } from '../reducer/post';

const PostForm = () => {
  const dispatch = useDispatch('');
  const { me } = useSelector((state) => (state.user));

  // 게시글 등록
  const onSubmitAddPost = useCallback(() => {
    dispatch(addPostRequestAction({
      user: {
        email: me.email,
        nickname: me.nickname,
      },
      title: 'dummy',
      content: '내용내용',
      comments: [],
    }))
  }, [me]);

  return (
    <Form onFinish={onSubmitAddPost}>
      <div style={{ borderBottom: '1px solid #e5e5e5', marginBottom: '1rem' }}>
        <Input.TextArea
          rows={3}
          placeholder="오늘 무슨 일이 있었나요?"
          maxLength={140}
          style={{ marginBottom: '.5rem' }}
        />
        <Button 
        type="primary"
        htmlType="submit"
        style={{ marginBottom: '1rem'}}
        >
          등록
        </Button>
      </div>
    </Form>
  );
};

export default PostForm;