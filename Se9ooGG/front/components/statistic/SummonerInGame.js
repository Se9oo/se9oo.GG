import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import InGameSummonerList from './InGameSummonerList';
import { UpOutlined, DownOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const SummonerInGame = () => {
  const { inGame } = useSelector((state) => state.statistic);
  const [isShowInGame, setIsShowInGame] = useState(true);

  let teamArr = [];
  let bannedListArr = [];
  if (Object.keys(inGame).length !== 0) {
    const team1 = inGame.participants.filter((summoner) => summoner.teamId === 100);
    const team2 = inGame.participants.filter((summoner) => summoner.teamId === 200);
    teamArr = [team1, team2];

    const team1BannedList = inGame.bannedChampions.filter((item) => item.teamId === 100);
    const team2BannedList = inGame.bannedChampions.filter((item) => item.teamId === 200);
    bannedListArr = [team1BannedList, team2BannedList];
  }

  const onToggleShowInGame = useCallback(() => {
    setIsShowInGame((prevState) => {
      return !prevState;
    });
  }, [isShowInGame]);

  return (
    <InGame showInGame={isShowInGame}>
      <SubTitle>
        <span>인게임 정보</span>
        {isShowInGame ? <UpOutlined onClick={onToggleShowInGame} /> : <DownOutlined onClick={onToggleShowInGame} />}
      </SubTitle>
      {isShowInGame &&
        (Object.keys(inGame).length !== 0 ? (
          <div>
            {teamArr.map((team, i) => {
              return <InGameSummonerList key={i} team={team} bannedList={bannedListArr[i]} />;
            })}
          </div>
        ) : (
          <Info>
            <strong>'인게임 정보'</strong>를 눌러주세요.
          </Info>
        ))}
    </InGame>
  );
};

export default SummonerInGame;

const InGame = styled.div`
  background-color: #ffffff;
  margin-top: 1rem;
  border: 1px solid rgba(206, 212, 218, 0.5);
`;

const SubTitle = styled.div`
  position: relative;
  padding: 1rem;
  font-size: 1.2rem;

  @media ${(props) => props.theme.tablet} {
    font-size: 1rem;
  }

  & svg {
    position: absolute;
    top: 50%;
    right: 3%;
    transform: translateY(-50%);
    cursor: pointer;
  }
`;

const Info = styled.div`
  text-align: center;
  margin: 2rem;
  font-size: 1.5rem;

  & strong {
    font-weight: 700;
    color: #1890ff;
  }

  @media ${(props) => props.theme.tablet} {
    font-size: 1.2rem;
  }
`;
