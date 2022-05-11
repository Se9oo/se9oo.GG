import React from 'react';
import { useSelector } from 'react-redux';
import BuildItems from './BuildItems';
import styled from 'styled-components';
import BuildSkills from './BuildSkills';
import BuildRune from './BuildRune';

const MatchDetailBuild = ({ match, winOrLose }) => {
  // 검색한 소환사명
  const { summonerName } = useSelector((state) => state.statistic.summoner);
  // 검색한 소환사의 participantId
  const summonerParticipantId = match.info.participants.filter((summoner) => {
    return summoner.summonerName === summonerName;
  })[0].participantId;
  // match의 timeline 추출
  const matchTimelines = match.matchTimelines.info.frames;
  // 위에서 찾은 participantId로 검색한 소환사의 시간대별 events 추출
  const events = matchTimelines.map((v) => {
    return v.events.filter((e) => e.participantId === summonerParticipantId);
  });
  // 아이템 (구매,판매 정보)
  const items = events.map((item) => {
    return item.filter((v) => v.type !== 'SKILL_LEVEL_UP' && v.type !== 'ITEM_DESTROYED');
  });

  // timestamp -> 분으로 변환해서 time property 추가
  // 시간대별로 묶여있는 배열을 풀어서 시간값 추가 후 하나의 큰 배열안에 저장
  const formedItems = [];
  items.map((item) => {
    if (item.length !== 0) {
      item.map((i) => {
        i.time = parseInt(i.timestamp / 60000, 10);
        formedItems.push(i);
      });
    }
  });

  // 되돌린 구매 아이템 제거
  // 이전 ITEM TYPE
  let prevType = '';
  // 아이템 Object 저장 array
  const secondFormedItems = [];
  // 아이템 Object의 property 'itemId' 값 저장 array
  const secondFormedItemsId = [];
  formedItems.map((f) => {
    if (f.type === 'ITEM_PURCHASED' || f.type === 'ITEM_SOLD') {
      secondFormedItems.push(f);
      secondFormedItemsId.push(f.itemId);
      // 현재 아이템 정보가 되돌린 아이템이면서 이전 item이 판매 아이템이 아니면
    } else if (f.type === 'ITEM_UNDO' && prevType !== 'ITEM_SOLD') {
      // 되돌린 아이템 id 와 구매한 id가 같은 마지막 item 의 index
      const lastIdx = secondFormedItemsId.lastIndexOf(f.beforeId);
      // 구매/판매 아이템 리스트에서 제거
      secondFormedItems.splice(lastIdx, 1);
      secondFormedItemsId.splice(lastIdx, 1);
    }
    prevType = f.type;
  });

  // 시간대별로 다시 배열로 묶음
  // 이전 시간
  let prevTime = 0;
  // 같은 시간에 구매/판매 한 아이템 배열
  let sameTimeArr = [];
  // 최종 빌드 아이템 배열
  const finalItemArr = [];
  secondFormedItems.map((f, i) => {
    if (prevTime === f.time) {
      sameTimeArr.push(f);
      prevTime = f.time;
      secondFormedItems.length === i + 1 ? finalItemArr.push(sameTimeArr) : null;
    } else {
      finalItemArr.push(sameTimeArr);
      sameTimeArr = [];
      sameTimeArr.push(f);
      prevTime = f.time;
    }
  });

  // 스킬 레벨업 정보
  let skillArr = [];
  events.map((skills) => {
    skills.filter((v) => v.type === 'SKILL_LEVEL_UP');
    skills.map((skill) => {
      if (skill.type === 'SKILL_LEVEL_UP') {
        skillArr.push(skill);
      }
    });
  });

  // summoner game info 추출
  const gameInfo = match.info.participants.filter((summoner) => {
    return summoner.participantId === summonerParticipantId;
  })[0];
  // 스킬 빌드에서 사용할 summoner champion id 값 추출
  const championId = gameInfo.championId;

  // 룬 정보 세팅
  const runeInfo = {};
  const perkStyles = [];
  // 메인, 서브 룬 세팅
  gameInfo.perks.styles.map((perk) => {
    if (perk.description === 'primaryStyle') {
      runeInfo.perkPrimaryStyle = perk.style;
    } else if (perk.description === 'subStyle') {
      runeInfo.perkSubStyle = perk.style;
    }
    perkStyles.push(...perk.selections);
  });

  // 메인, 서브 하위 룬 세팅
  perkStyles.map((perk, idx) => {
    runeInfo[`perk${idx}`] = perk.perk;
  });

  // 특성 세팅
  runeInfo.statPerk0 = gameInfo.perks.statPerks.defense;
  runeInfo.statPerk1 = gameInfo.perks.statPerks.flex;
  runeInfo.statPerk2 = gameInfo.perks.statPerks.offense;

  return (
    <>
      <SubTitle title="build">아이템 빌드</SubTitle>
      <Build>
        {finalItemArr.map((item, i) => {
          return (
            <BuildItemsList key={i}>
              <BuildItems key={i} items={item} idx={i} />
            </BuildItemsList>
          );
        })}
      </Build>
      <SubTitle title="skill">스킬 빌드</SubTitle>
      <BuildSkills skills={skillArr} winOrLose={winOrLose} championId={championId} />
      <SubTitle title="rune">룬</SubTitle>
      <BuildRune rune={runeInfo} />
    </>
  );
};

export default MatchDetailBuild;

const SubTitle = styled.div`
  padding: 1rem;
  ${(props) => {
    if (props.title === 'build') {
      return `border-bottom: 1px solid rgba(206, 212, 218, .5);`;
    } else {
      return `
        border-top: 1px solid rgba(206, 212, 218, .5);
        border-bottom: 1px solid rgba(206, 212, 218, .5);
      `;
    }
  }}
  font-size: 1.2rem;
`;

const Build = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 1rem;
  width: 100%;
`;

const BuildItemsList = styled.div`
  display: flex;
  align-items: center;
`;
