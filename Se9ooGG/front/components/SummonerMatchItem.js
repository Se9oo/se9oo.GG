import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { getChampionNameById, getRuneImgUrl, getSpellNameById } from './JsonUtil';
import styled from 'styled-components';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import SummonerMatchDetail from './SummonerMatchDetail';

// KDA 계산
function getKDA(kill, death, assist) {
  return ((kill + assist) / death).toFixed(2);
}
// 게임 진행 시간
function getGameDuration(duration) {
  let minutes = parseInt(duration / 60);
  let seconds = duration % 60;

  if (minutes.toString().length === 1) {
    minutes = '0' + minutes;
  }

  if (seconds.toString().length === 1) {
    seconds = '0' + seconds;
  }

  const gameDuration = {
    minutes: minutes,
    seconds: seconds,
  };

  return gameDuration;
}

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
  // match detail toggle
  const [showDetail, setShowDetail] = useState(false);
  const onToggleDetailBtn = useCallback(() => {
    setShowDetail(!showDetail);
  }, [showDetail]);

  return (
    <SummonerMatchListItem>
      <SummonerMatchListItemHeader>
        <SummonerMatch>
          <span>솔랭</span>
          <span>{`${gameDuration.minutes}분${gameDuration.seconds}초`}</span>
        </SummonerMatch>
        {
          showDetail 
          ? <UpOutlined onClick={onToggleDetailBtn} />
          : <DownOutlined onClick={onToggleDetailBtn} />
        }
      </SummonerMatchListItemHeader>
      <SummonerMatchListItemContent>
      {
        showDetail 
        ? <SummonerMatchDetail match={match} />
        : 
        <>
          <SummonerWinOrLose winOrLose={summonerStats.win}>
            <span>{summonerStats.win ? '승' : '패'}</span>
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
                  <span>{`${summonerStats.totalMinionsKilled} CS`}</span>
                </SummonerStats>
                {/* <SummonerMatch>
                  <span>솔랭</span>
                  <span>{gameDuration}</span>
                </SummonerMatch> */}
              </SummonerText>
            </SummonerStatInfo>
            <SummonerItems>
              {
                summonerItemsArr.map((v) => {
                  return v == 0 ? <div></div> : <img src={`/img/item/${v}.png`} alt="summoner-item" />
                })
              }
            </SummonerItems>
          </SummonerInfo>
        </>
      }
      </SummonerMatchListItemContent>
    </SummonerMatchListItem>
  )
};

export const SummonerMatchListItem = styled.li`
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

  & span {
    font-size: 1.2rem;
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

const SummonerMatchListItemContent = styled.div`
  display: flex;
`;

export const SummonerWinOrLose = styled.div`
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props => (props.winOrLose ? '#339af0' : '#e03131')};
  color: #ffffff;
  font-size: 1.2rem;
`;

export const SummonerInfo = styled.div`
  padding: .5rem;
`;

export const SummonerStatInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

export const SummonerChampion = styled.div`
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
`;

export const SummonerSpell = styled.div`
  width: 7.5%;

  & img {
    width: 100%;
    margin: 10%;
    border-radius: 20%;
  }
`;

export const SummonerRune = styled.div`
  width: 7.5%;
  margin-right: .5rem;

  & img {
    width: 100%;
    margin: 10%;
    padding: 10%;
    background-color: #000000;
    border-radius: 999px;
  }
`;

export const SummonerText = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

export const SummonerKDA = styled.div`
  width: 20%;
  flex-grow: 1.2;
  text-align: center;
`;

export const SummonerScore = styled.div`
  margin-bottom: .7rem;

  & span:nth-child(-n+2):after {
    diplay: block;
    content: ' / ';
  }
`;

export const SummonerKDARate = styled.span`
  color: #ced4da;
`;

export const SummonerStats = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 .5rem;

  & span:first-child {
    margin-bottom: .7rem;
  }
`;

export const SummonerItems = styled.div`
  width: 100%;
  padding: 0 .5rem;
  display: flex;

  & div {
    width: 12%;
    padding: .1rem;
    border-radius: 20%;
    border: 1px solid #ced4da;
    background-image: url('./img/bg/opacity.png');
    background-size: 100%;
  }

  & img {
    width: 12%;
    height: 12%;
    padding: .1rem;
    border-radius: 20%;
  }

  & img:last-child {
    border-radius: 999px;
  }
`;

export default SummonerMatchItem;