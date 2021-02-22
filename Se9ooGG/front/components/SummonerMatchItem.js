import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import SummonerMatchDetail from './SummonerMatchDetail';
import { getChampionNameById, getQueueType, getRuneImgUrl, getSpellNameById } from '../util/JsonUtil';
import { getKDA, getGameDuration, getGameCreation } from '../util/util';
import styled from 'styled-components';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

const SummonerMatchItem = ({ match }) => {
  // 소환사 이름
  const summonerName = useSelector((state) => (state.statistic.summoner.summonerName));
  // 소환사 id
  const findSummoner = match.participantIdentities.find((summoner) => {
    return summoner.player.summonerName.toLowerCase() === summonerName.toLowerCase();
  });
  // 소환사 id로 찾은 소환사의 게임 정보
  const summonerInfo = match.participants.find((info) => info.participantId === parseInt(findSummoner.participantId, 10));
  // 소환사 게임 stat
  const summonerStats = summonerInfo.stats;
  // 소환사 게임 timeline
  const summonerTimeLine = summonerInfo.timeline;
  // 소환사 승패 여부
  let summonerWinOrLose = '';
  if (Object.keys(summonerTimeLine).length < 4) {
    summonerWinOrLose = '무';
  } else {
    summonerWinOrLose = summonerStats.win ? '승' : '패';
  }
  // 소환사 챔피언 이름
  const championName = getChampionNameById(summonerInfo.championId);
  // 소환사 spell
  const summonerSpell = getSpellNameById(summonerInfo.spell1Id, summonerInfo.spell2Id);
  // 소환사 rune
  const runeInfo = {
    perkPrimaryStyle: summonerStats.perkPrimaryStyle,
    perk0: summonerStats.perk0,
    perkSubStyle: summonerStats.perkSubStyle,
  }
  // 소환사 rune img 경로
  const summonerRune = getRuneImgUrl(runeInfo);
  // 소환사 KDA
  const summonerKDA = getKDA(summonerStats.kills, summonerStats.deaths, summonerStats.assists);
  // 소환사 item
  const summonerItemsArr = [];
  for (let i = 0; i < 7; i++) {
    summonerItemsArr.push(summonerStats[`item${i}`]);
  }
  // 게임 진행 시간
  const gameDuration = getGameDuration(match.gameDuration);
  // 게임 생성 시간
  const gameCreateion = getGameCreation(match.gameCreation + match.gameDuration * 1000);
  // Queue 타입
  const queueType = getQueueType(match.queueId);
  // match detail toggle
  const [showDetail, setShowDetail] = useState(false);
  const onToggleDetailBtn = useCallback(() => {
    setShowDetail(!showDetail);
  }, [showDetail]);

  const onErrorItemImg = useCallback((e) => {
    e.target.src = "/img/item/0.png";
  }, []);

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
        {
          showDetail 
          ? <UpOutlined onClick={onToggleDetailBtn} />
          : <DownOutlined onClick={onToggleDetailBtn} />
        }
      </SummonerMatchListItemHeader>
      {
        showDetail 
        ? <SummonerMatchDetail match={match} winOrLose={summonerWinOrLose} />
        : 
        <SummonerMatchListItemContent>
          <SummonerWinOrLose winOrLose={summonerWinOrLose}>
            <span>{summonerWinOrLose}</span>
          </SummonerWinOrLose>
          <SummonerInfo>
            <SummonerStatInfo>
              <SummonerChampion>
                <img src={`./img/champion/${championName.eng}.png`} alt="summoner-champion-image"/>
              </SummonerChampion>
              <SummonerSpell>
                <img src={`./img/spell/${summonerSpell[0].eng}.png`} alt="summoner-first-spell"/>
                <img src={`./img/spell/${summonerSpell[1].eng}.png`} alt="summoner-second-spell"/>
              </SummonerSpell>
              <SummonerRune>
                <img src={`./img/${summonerRune.perk0}`} alt="summoner-primary-rune"/>
                <img src={`./img/${summonerRune.subPerk}`} alt="summoner-sub-rune"/>
              </SummonerRune>
              <SummonerText>
                <SummonerKDA>
                  <SummonerScore>
                    <span>{summonerStats.kills}</span>
                    <span>{summonerStats.deaths}</span>
                    <span>{summonerStats.assists}</span>
                  </SummonerScore>
                  <SummonerKDARate>
                    {`${summonerKDA} : 1`}
                  </SummonerKDARate>
                </SummonerKDA>
                <SummonerStats>
                  <span>{`레벨 ${summonerStats.champLevel}`}</span>
                  <span>
                    {`${parseInt(summonerStats.totalMinionsKilled + summonerStats.neutralMinionsKilled, 10)} CS`}
                  </span>
                </SummonerStats>
              </SummonerText>
            </SummonerStatInfo>
            <SummonerItems>
              {
                summonerItemsArr.map((v, i) => {
                  return <img key={i} src={`/img/item/${v}.png`} alt="summoner-item" onError={onErrorItemImg} />
                })
              }
            </SummonerItems>
          </SummonerInfo>
        </SummonerMatchListItemContent>
      }
    </SummonerMatchListItem>
  )
};

const SummonerMatchListItem = styled.li`
  background-color: #ffffff;
  border: 1px solid rgba(206, 212, 218, .5);
  border-top: none;
`;

const SummonerMatchListItemHeader = styled.div`
  position: relative;
  display: flex;
  background-color: #ffffff;
  margin-top: 1rem;
  padding: .5rem;
  border: 1px solid rgba(206, 212, 218, .5);
  border-left: none;
  border-right: none;

  & span {
    font-size: 1.2rem;

    @media ${props => props.theme.tablet} {
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
    font-size: .8rem;
    color: rgba(51, 51, 51, .5);
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
  ${props => {
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
  padding: .5rem;
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
    padding: .5rem;
    border-radius: 999px;
  }

  @media ${props => props.theme.tablet} {
    width: 9%;
  }
`;

const SummonerSpell = styled.div`
  width: 7.5%;

  & img {
    width: 100%;
    margin: 10%;
    border-radius: 20%;
  }

  @media ${props => props.theme.tablet} {
    width: 3%;
  }
`;

const SummonerRune = styled.div`
  width: 7.5%;
  margin-right: .5rem;

  & img {
    width: 100%;
    margin: 10%;
    padding: 10%;
    background-color: #000000;
    border-radius: 999px;
  }

  @media ${props => props.theme.tablet} {
    width: 3%;
  }
`;

const SummonerText = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const SummonerKDA = styled.div`
  width: 20%;
  flex-grow: 1.2;
  text-align: center;
`;

const SummonerScore = styled.div`
  margin-bottom: .7rem;

  & span:nth-child(-n+2):after {
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
  margin: 0 .5rem;

  & span:first-child {
    margin-bottom: .7rem;
  }
`;

const SummonerItems = styled.div`
  width: 100%;
  padding: 0 .5rem;
  display: flex;

  & img {
    width: 12%;
    padding: .1rem;
    border: 1px solid #ced4da;
    border-radius: 20%;

    @media ${props => props.theme.tablet} {
      width: 6%;
    }
  }

  & img:last-child {
    border-radius: 999px;
  }
`;

export default SummonerMatchItem;