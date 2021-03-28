import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const ChampionList = ({ list }) => {
  const router = useRouter();
  // 가나다 순으로 정렬
  const championList = [...list].sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));

  const onClickChampionItem = useCallback((id) => {
    router.push({
      pathname: '/champion/[championName]',
      query: { championName: `${id}` },
    });
  }, []);

  return (
    <ChampList>
      {championList.map((champion) => {
        return (
          <ChampListItem key={champion.name} onClick={() => onClickChampionItem(champion.id)}>
            <ChampionImg src={`/img/champion/${champion.id}.png`} alt={`${champion.id}`} />
            <ChampionName>{champion.name}</ChampionName>
          </ChampListItem>
        );
      })}
    </ChampList>
  );
};

export default ChampionList;

const ChampList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  background-color: #ffffff;
  border: 1px solid rgba(206, 212, 218, 0.5);
  padding: 1rem;
`;

const ChampListItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.2rem;
  cursor: pointer;
`;

const ChampionImg = styled.img`
  display: block;
  width: 5rem;
`;

const ChampionName = styled.span`
  display: block;
  width: 3rem;
  padding: 0.5rem 0;
  font-size: 0.8rem;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
