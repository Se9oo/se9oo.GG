import React, { useCallback, useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';
import { errorModal } from '../CommonModal';
import { useDispatch, useSelector } from 'react-redux';
import { addChampionCommentAction, loadChampionCommentsAction } from '../../reducer/champion';
import styled from 'styled-components';

const ChampionWriteComments = ({ championName, changeMode }) => {
  const dispatch = useDispatch('');
  const { me } = useSelector((state) => state.user);
  const { addChampionCommentSuccess } = useSelector((state) => state.champion);
  const [commentText, setCommentText] = useState('');

  // 한줄평이 등록되면
  useEffect(() => {
    if (addChampionCommentSuccess) {
      // 다시 목록을 읽음
      dispatch(loadChampionCommentsAction({ championName, page: 1 }));
      // 한줄평 입력에서 목록으로 변경
      changeMode('list');
    }
  }, [addChampionCommentSuccess]);

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
