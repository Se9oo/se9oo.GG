import React from 'react';
import { useSelector } from 'react-redux';

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

  return (
    <>
      <div>빌드</div>
    </>
  );
};

export default MatchDetailBuild;