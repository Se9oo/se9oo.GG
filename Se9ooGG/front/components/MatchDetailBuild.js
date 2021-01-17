import React from 'react';
import { useSelector } from 'react-redux';
import BuildItems from './BuildItems';

const MatchDetailBuild = ({ match }) => {
  // 검색한 소환사명
  const { summonerName } = useSelector((state) => state.statistic.summoner);
  // 검색한 소환사의 participantId
  const summonerParticipantId = match.participantIdentities.filter((summoner) => {
    return summoner.player.summonerName === summonerName;
  })[0].participantId;
  // match의 timeline 추출
  const matchTimelines = match.matchTimelines.frames;
  // 위에서 찾은 participantId로 검색한 소환사의 시간대별 events 추출
  const events = matchTimelines.map((v) => {
    return v.events.filter((e) => e.participantId === summonerParticipantId);
  });
  // 아이템 (구매,판매 정보)
  const items = events.map((item) => {
    return item.filter((v) => v.type !== 'SKILL_LEVEL_UP');
  });

  // timestamp -> 분으로 변환해서 time property 추가
  let formedItems = [];
  items.map((item) => {
    if (item.length !== 0) {
      item.map((i) => {
        i.time = parseInt(i.timestamp / 60000 , 10);
        formedItems.push(i);
      });
    }
  });

  // 이전 시간
  let prevTime = 0;
  // 같은 시간에 구매/판매 한 아이템 배열
  let sameTimeArr = [];
  // 최종 빌드 아이템 배열
  let finalItemArr = [];  
  formedItems.map((f, i) => {
    if (prevTime === f.time) {
      sameTimeArr.push(f);
      prevTime = f.time;
      formedItems.length === (i + 1) ? finalItemArr.push(sameTimeArr) : null;
    } else {
      finalItemArr.push(sameTimeArr);
      sameTimeArr = [];
      sameTimeArr.push(f);
      prevTime = f.time;
    }
  });
  // 스킬 레벨업 정보
  const skills = events.map((skill) => {
    return skill.filter((v) => v.type === 'SKILL_LEVEL_UP');
  });

  return (
    <>
      {
        finalItemArr.map((item, i) => {
          return <BuildItems key={i} items={item} />
        })
      }
    </>
  );
};

export default MatchDetailBuild;