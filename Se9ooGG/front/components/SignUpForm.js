import React, { useCallback } from 'react';
import useInput from '../hooks/useInput';
import { Form, Input } from 'antd';

const SignUpForm = () => {
  const [email, setEmail, onChangeEmail] = useInput('');

  const onSubmitForm = useCallback(() => {

  }, []);
  
  return (
    <Form onFinish={onSubmitForm}>
      <div>
        <label htmlFor="user-email">이메일</label>
        <Input 
          name="user-email"
          placeholder="이메일"
          value={email}
          onChange={onChangeEmail}
        />
      </div>
    </Form>
  );
};

export default SignUpForm;