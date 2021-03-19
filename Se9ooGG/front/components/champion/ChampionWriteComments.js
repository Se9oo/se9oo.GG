import React, { useCallback, useState } from 'react';
import { Form, Input, Button } from 'antd';
import { errorModal } from '../CommonModal';
import styled from 'styled-components';

const ChampionWriteComments = () => {
  const [commentText, setCommentText] = useState('');

  const onChangeCommentText = useCallback((e) => {
    setCommentText(e.target.value);
  }, []);

  const onSubmitForm = useCallback(() => {
    if (!commentText) {
      errorModal('한줄평을 작성해주세요.');
      return;
    }

    //setCommentText('');
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
