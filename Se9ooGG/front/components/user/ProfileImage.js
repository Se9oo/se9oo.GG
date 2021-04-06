import React, { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadProfileImageRequestAction } from '../../reducer/user';
import { backURL } from '../../config/config';
import { Form } from 'antd';
import { UserOutlined, PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const ProfileImage = () => {
  const dispatch = useDispatch('');
  const { me } = useSelector((state) => state.user);
  const imageInput = useRef();

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeProfileImg = useCallback(
    (e) => {
      if (e.target.files !== null) {
        const formData = new FormData();
        formData.append('profile-image', e.target.files[0]);
        formData.append('email', me.email);

        dispatch(uploadProfileImageRequestAction(formData));
      }
    },
    [me]
  );

  return (
    <ProfileIcon>
      {me && me.profileImage ? (
        <ProfileImg src={`${backURL}/${me.profileImage}`} alt="profile-image" />
      ) : (
        <ProfileNoneImg />
      )}
      <Form encType="multipart/form-data">
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
      </Form>
    </ProfileIcon>
  );
};

export default ProfileImage;

const ProfileIcon = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

const ProfileImg = styled.img`
  width: 10rem;
  border-radius: 9999px;
`;

const ProfileNoneImg = styled(UserOutlined)`
  display: block;
  font-size: 10rem;
  border-radius: 9999px;
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
