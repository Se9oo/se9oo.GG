import { Button, Form, Input, } from 'antd';
import React from 'react';

const PostForm = () => {
  return (
    <Form>
      <div style={{ borderBottom: '1px solid #e5e5e5', marginBottom: '1rem' }}>
        <Input.TextArea
          rows={3}
          placeholder="오늘 무슨 일이 있었나요?"
          maxLength={140}
          style={{ marginBottom: '.5rem' }}
        />
        <Button type="primary" style={{ marginBottom: '1rem'}}>등록</Button>
      </div>
    </Form>
  );
};

export default PostForm;