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
  // 스킬 레벨업 정보
  const skills = events.map((skill) => {
    return skill.filter((v) => v.type === 'SKILL_LEVEL_UP');
  });

  return (
    <>
      {
        items.map((item, i) => {
          if (item.length !== 0) {
            return <BuildItems key={i} items={item} time={i} />
          }
        })
      }
    </>
  );
};

export default MatchDetailBuild;