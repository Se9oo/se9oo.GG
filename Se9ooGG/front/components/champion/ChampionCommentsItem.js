import React from 'react';
import styled from 'styled-components';

const ChampionCommentsItem = ({ comment }) => {
  return (
    <Comment>
      <Content>{comment.content}</Content>
      <UserName>{`- ${comment.userNickname} -`}</UserName>
    </Comment>
  );
};

export default ChampionCommentsItem;

const Comment = styled.li`
  position: relative;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(206, 212, 218, 0.5);
  font-size: 1.1rem;
`;

const Content = styled.p`
  display: block;
  width: 100%;
  padding: 1rem;
  word-break: break-all;
`;

const UserName = styled.span`
  position: absolute;
  bottom: 2px;
  right: 2px;
`;
