import React from 'react';
import Participant from './Participant';
import styled from 'styled-components';

const ParticipantList = ({ teamList }) => {
  return (
    <List>
      {
        teamList.map((team, i) => {
          return <Participant key={i} team={team} />
        })
      }
    </List>
  );
};

export default ParticipantList;

const List = styled.div`
  display: none;
  padding: .5rem;

  & ul {
    padding: .5rem;
  }

  @media ${props => props.theme.tablet} {
    display: flex;
  }
`;