import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import SummonerMatchDetail from './SummonerMatchDetail';
import ParticipantList from './ParticipantList';
import { getChampionNameById, getQueueType, getRuneImgUrl, getSpellNameById } from '../../util/JsonUtil';
import { getKDA, getGameDuration, getGameCreation } from '../../util/util';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const SummonerMatchItem = ({ match }) => {
  // 검색 소환사 accountId
  const { accountId, id } = useSelector((state) => state.statistic.summoner);
  // 검색 소환사 id로 소환사 및 게임 정보 찾기
  const summonerInfo = match.info.participants.find((summoner) => {
    return summoner.summonerId === id;
  });
  // 소환사 게임 timeline
  //const summonerTimeLine = summonerInfo.timeline;
  // 소환사 승패 여부
  const summonerWinOrLose = summonerInfo.win ? '승' : '패';
  // 소환사 챔피언 이름
  const championName = getChampionNameById(summonerInfo.championId);
  // 소환사 spell
  const summonerSpell = getSpellNameById(summonerInfo.summoner1Id, summonerInfo.summoner2Id);
  // 소환사 rune 정보
  const runeInfo = {};
  summonerInfo.perks.styles.map((perk) => {
    if (perk.description === 'primaryStyle') {
      runeInfo.perkPrimaryStyle = perk.style;
      runeInfo.perk0 = perk.selections[0].perk;
    } else if (perk.description === 'subStyle') {
      runeInfo.perkSubStyle = perk.style;
    }
  });

  // 소환사 rune img 경로
  const summonerRune = getRuneImgUrl(runeInfo);
  // 소환사 KDA
  const summonerKDA = getKDA(summonerInfo.kills, summonerInfo.deaths, summonerInfo.assists);
  // 소환사 item
  const summonerItemsArr = [];
  for (let i = 0; i < 7; i++) {
    summonerItemsArr.push(summonerInfo[`item${i}`]);
  }
  // 게임 진행 시간
  const gameDuration = getGameDuration(match.info.gameDuration);
  // 게임 생성 시간
  const gameCreateion = getGameCreation(match.info.gameCreation + match.info.gameDuration * 1000);
  // Queue 타입
  const queueType = getQueueType(match.info.queueId);
  // match.info detail toggle
  const [showDetail, setShowDetail] = useState(false);
  const onToggleDetailBtn = useCallback(() => {
    setShowDetail(!showDetail);
  }, [showDetail]);

  const onErrorItemImg = useCallback((e) => {
    e.target.src = '/img/item/0.png';
  }, []);

  // 소환사들 정보
  const participants = [...match.info.participants];

  // 팀 별로 소환사 나누기
  const teamA = participants.filter((summoner) => summoner.teamId === 100);
  const teamB = participants.filter((summoner) => summoner.teamId === 200);
  const teamList = [teamA, teamB];

  return (
    <SummonerMatchListItem>
      <SummonerMatchListItemHeader>
        <SummonerMatch>
          <SummonerMatchInfo>
            <span>{queueType}</span>
            <span>{gameCreateion}</span>
          </SummonerMatchInfo>
          <span>{`${gameDuration.minutes}분 ${gameDuration.seconds}초`}</span>
        </SummonerMatch>
        {showDetail ? <UpOutlined onClick={onToggleDetailBtn} /> : <DownOutlined onClick={onToggleDetailBtn} />}
      </SummonerMatchListItemHeader>
      {showDetail ? (
        <SummonerMatchDetail match={match} winOrLose={summonerWinOrLose} />
      ) : (
        <SummonerMatchListItemContent>
          <SummonerWinOrLose winOrLose={summonerWinOrLose}>
            <span>{summonerWinOrLose}</span>
          </SummonerWinOrLose>
          <SummonerInfo>
            <SummonerStat>
              <SummonerStatInfo>
                <SummonerChampion>
                  <img src={`./img/champion/${championName.eng}.png`} alt="summoner-champion-image" />
                </SummonerChampion>
                <SummonerSpell>
                  <img src={`./img/spell/${summonerSpell[1].eng}.png`} alt="summoner-second-spell" />
                  <img src={`./img/spell/${summonerSpell[0].eng}.png`} alt="summoner-first-spell" />
                </SummonerSpell>
                <SummonerRune>
                  <img src={`./img/${summonerRune.perk0}`} alt="summoner-primary-rune" />
                  <img src={`./img/${summonerRune.subPerk}`} alt="summoner-sub-rune" />
                </SummonerRune>
                <SummonerText>
                  <SummonerKDA>
                    <SummonerScore>
                      <span>{summonerInfo.kills}</span>
                      <span>{summonerInfo.deaths}</span>
                      <span>{summonerInfo.assists}</span>
                    </SummonerScore>
                    <SummonerKDARate>{`${summonerKDA} : 1`}</SummonerKDARate>
                  </SummonerKDA>
                  <SummonerStats>
                    <span>{`레벨 ${summonerInfo.champLevel}`}</span>
                    <span>
                      {`${parseInt(summonerInfo.totalMinionsKilled + summonerInfo.neutralMinionsKilled, 10)} CS`}
                    </span>
                  </SummonerStats>
                </SummonerText>
              </SummonerStatInfo>
              <SummonerItems>
                {summonerItemsArr.map((v, i) => {
                  return <img key={i} src={`/img/item/${v}.png`} alt="summoner-item" onError={onErrorItemImg} />;
                })}
              </SummonerItems>
            </SummonerStat>
            <ParticipantList teamList={teamList} />
          </SummonerInfo>
        </SummonerMatchListItemContent>
      )}
    </SummonerMatchListItem>
  );
};

const SummonerMatchListItem = styled.li`
  background-color: #ffffff;
  border: 1px solid rgba(206, 212, 218, 0.5);
  border-top: none;
`;

const SummonerMatchListItemHeader = styled.div`
  position: relative;
  display: flex;
  background-color: #ffffff;
  margin-top: 1rem;
  padding: 0.5rem;
  border: 1px solid rgba(206, 212, 218, 0.5);
  border-left: none;
  border-right: none;

  & span {
    font-size: 1.2rem;

    @media ${(props) => props.theme.tablet} {
      font-size: 1rem;
    }
  }

  & svg {
    position: absolute;
    top: 45%;
    right: 0;
    transform: translateY(-45%);
    font-size: 1.6rem;
    cursor: pointer;
  }
`;

const SummonerMatch = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SummonerMatchInfo = styled.div`
  & span {
    margin-right: 1rem;
  }

  & span:last-child {
    font-size: 0.8rem;
    color: rgba(51, 51, 51, 0.5);
  }
`;

const SummonerMatchListItemContent = styled.div`
  display: flex;
`;

const SummonerWinOrLose = styled.div`
  width: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${(props) => {
    if (props.winOrLose == '무') {
      return `background-color: #adb5bd;`;
    } else {
      return `background-color: ${props.winOrLose == '승' ? '#339af0' : '#e03131'};`;
    }
  }}
  color: #ffffff;
  font-size: 1.2rem;
`;

const SummonerInfo = styled.div`
  width: 100%;
  display: flex;
`;

const SummonerStat = styled.div`
  width: 100%;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media ${(props) => props.theme.tablet} {
    width: 70%;
  }
`;

const SummonerStatInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const SummonerChampion = styled.div`
  width: 18%;
  display: flex;
  flex-direction: column;
  align-items: center;

  & img {
    width: 100%;
    margin: 0;
    padding: 0.5rem;
    border-radius: 999px;
  }

  @media ${(props) => props.theme.tablet} {
    width: 13%;
  }
`;

const SummonerSpell = styled.div`
  width: 7.5%;

  & img {
    width: 100%;
    margin: 10%;
    border-radius: 20%;
  }

  @media ${(props) => props.theme.tablet} {
    width: 5%;
  }
`;

const SummonerRune = styled.div`
  width: 7.5%;
  margin-right: 0.5rem;

  & img {
    width: 100%;
    margin: 10%;
    padding: 10%;
    background-color: #000000;
    border-radius: 999px;
  }

  @media ${(props) => props.theme.tablet} {
    width: 5%;
  }
`;

const SummonerText = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const SummonerKDA = styled.div`
  width: 20%;
  flex-grow: 1.2;
  text-align: center;
`;

const SummonerScore = styled.div`
  margin-bottom: 0.7rem;

  & span:nth-child(-n + 2):after {
    diplay: block;
    content: ' / ';
  }
`;

const SummonerKDARate = styled.span`
  color: #ced4da;
`;

const SummonerStats = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 0.5rem;

  & span:first-child {
    margin-bottom: 0.7rem;
  }
`;

const SummonerItems = styled.div`
  width: 100%;
  padding: 0 0.5rem;
  display: flex;

  & img {
    width: 12%;
    padding: 0.1rem;
    border: 1px solid #ced4da;
    border-radius: 20%;

    @media ${(props) => props.theme.tablet} {
      width: 8%;
    }
  }

  & img:last-child {
    border-radius: 999px;
  }
`;

export default SummonerMatchItem;
