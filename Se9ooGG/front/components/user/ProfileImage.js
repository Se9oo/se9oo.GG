import React, { useCallback, useRef } from 'react';
import { Form } from 'antd';
import { UserOutlined, PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const ProfileImage = () => {
  const imageInput = useRef();
  const submitButton = useRef();

  const onSubmitProfileImg = useCallback(() => {}, []);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeProfileImg = useCallback((e) => {
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (file) => {
      imageFormData.append('profile-image', file);
    });
  }, []);

  return (
    <ProfileIcon>
      <ProfileImg />
      <Form encType="multipart/form-data" onFinish={onSubmitProfileImg}>
        <input
          type="file"
          accept="images/*"
          capture="gallery"
          name="profile-image"
          hidden
          ref={imageInput}
          onChange={onChangeProfileImg}
        />
        <AddProfileImageButton onClick={onClickImageUpload}>
          <Plus />
        </AddProfileImageButton>
        <button htmlType="submit" hidden ref={submitButton}></button>
      </Form>
    </ProfileIcon>
  );
};

export default ProfileImage;

const ProfileIcon = styled.div`
  position: relative;
  background-color: #e9ecef;
  border-radius: 9999px;
  margin-bottom: 1rem;
  padding: 2rem;
`;

const ProfileImg = styled(UserOutlined)`
  display: block;
  font-size: 10rem;
  border-radius: 999px;
`;

const AddProfileImageButton = styled.button`
  position: absolute;
  bottom: 5%;
  right: 5%;
  padding: 0;
  border-radius: 9999px;
  background-color: #1890ff;
  border: 0;
  outline: 0;
  cursor: pointer;
  z-index: 1;

  &: active {
    background-color: rgba(24, 144, 255, 0.5);
  }
`;

const Plus = styled(PlusOutlined)`
  display: block;
  font-size: 2.5rem;
  color: #ffffff;
`;
