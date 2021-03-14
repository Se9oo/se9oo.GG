import React, { useCallback, useState } from 'react';
import { getChampionNameById, getSpellNameById } from '../../util/JsonUtil';
import BuildRune from './BuildRune';
import { Button } from 'antd';
import styled from 'styled-components';

const InGameSummoner = ({ summoner }) => {
  // 룬 페이지 노출 여부
  const [isShowRune, setIsShowRune] = useState(false);
  // 소환사 선택 챔피언 이름
  const champName = getChampionNameById(summoner.championId);
  // 소환사 선택 spell
  const spell = getSpellNameById(summoner.spell1Id, summoner.spell2Id);

  // 인게임 룬 정보 세팅
  let rune = {}
  summoner.perks.perkIds.map((perk, i) => {
    if (i < 6) {
      rune[`perk${i}`] = perk;
    } else {
      rune[`statPerk${i - 6}`] = perk
    }
  })
  rune.perkPrimaryStyle = summoner.perks.perkStyle;
  rune.perkSubStyle = summoner.perks.perkSubStyle;

  const onClickIsShowRune = useCallback(() => {
    setIsShowRune((prevState) => {
      return !prevState;
    });
  }, [isShowRune]);

  return (
    <>
    <ListItem>
      <ChampionImg src={`/img/champion/${champName.eng}.png`} alt="champion-image" />
      <Spell>
        <img src={`/img/spell/${spell[0].eng}.png`} alt="spell1" />
        <img src={`/img/spell/${spell[1].eng}.png`} alt="spell2" />
      </Spell>
      <div>
        <span>{summoner.summonerName}</span>
      </div>
      <ShowRuneButton onClick={onClickIsShowRune}>룬</ShowRuneButton>
    </ListItem>
    {
      isShowRune && <BuildRune rune={rune} />
    }
    </>
  );
};

export default InGameSummoner;

const ListItem = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  padding: .5rem 0;
`;

const ChampionImg = styled.img`
  width: 3rem;
  margin-right: .5rem;
  border-radius: 9999px;
`;

const Spell = styled.div`
  display: flex;
  margin-right: 1rem;

  & img {
    width: 2rem;
  }
`;

const ShowRuneButton = styled(Button)`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  width: 18%;
`;