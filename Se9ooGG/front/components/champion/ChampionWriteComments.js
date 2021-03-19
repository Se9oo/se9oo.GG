import React, { useCallback, useState } from 'react';
import { Form, Input, Button } from 'antd';
import { errorModal } from '../CommonModal';
import { useDispatch, useSelector } from 'react-redux';
import { addChampionCommentAction } from '../../reducer/champion';
import styled from 'styled-components';

const ChampionWriteComments = ({ championName }) => {
  const dispatch = useDispatch('');
  const { me } = useSelector((state) => state.user);
  const [commentText, setCommentText] = useState('');

  const onChangeCommentText = useCallback((e) => {
    setCommentText(e.target.value);
  }, []);

  const onSubmitForm = useCallback(() => {
    if (!commentText) {
      errorModal('한줄평을 작성해주세요.');
      return;
    }

    if (me) {
      dispatch(
        addChampionCommentAction({
          championName,
          content: commentText,
          userEmail: me.email,
        })
      );
    } else {
      errorModal('다시 로그인 해주세요.');
    }

    setCommentText('');
  }, [commentText]);

  return (
    <WriteCommentForm onFinish={onSubmitForm}>
      <Input.TextArea rows={3} placeholder="한줄평을 입력하세요." value={commentText} onChange={onChangeCommentText} />
      <WriteCommentButtonArea>
        <Button type="primary" htmlType="submit">
          등록
        </Button>
      </WriteCommentButtonArea>
    </WriteCommentForm>
  );
};

export default ChampionWriteComments;

const WriteCommentForm = styled(Form)`
  display: block;
  height: 210px;
  padding: 0.5rem;

  & textArea ::placeholder {
    font-size: 1rem;
  }

  @media ${(props) => props.theme.tablet} {
    height: 60%;
  }
`;

const WriteCommentButtonArea = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1rem 0;
`;
