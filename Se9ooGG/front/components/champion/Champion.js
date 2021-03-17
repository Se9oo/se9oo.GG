import React, { useCallback, useState } from 'react';
import ChampionList from './ChampionList';
import { Input } from 'antd';
import styled from 'styled-components';

const Champion = ({ champion }) => {
  const [championList, setChampionList] = useState(champion);

  const [searchInput, setSearchInput] = useState();
  const onChangeSearchInput = useCallback(
    (e) => {
      setSearchInput(e.target.value);
      if (e.target.value) {
        setChampionList(champion.filter((champion) => champion.name.includes(e.target.value)));
      } else {
        setChampionList(champion);
      }
    },
    [searchInput]
  );

  return (
    <>
      <ChampionSearchInput placeholder="챔피언 검색" onChange={onChangeSearchInput} value={searchInput} enterButton />
      <ChampionList list={championList} />
    </>
  );
};

export default Champion;

const ChampionSearchInput = styled(Input.Search)`
  margin: 1rem 0;

  & ::placeholder {
    font-size: 1.2rem;
  }
`;
