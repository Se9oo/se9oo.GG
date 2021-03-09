import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { Input } from 'antd';
import styled from 'styled-components';

const ChampionList = ({ data }) => {
  const router = useRouter();

  const onClickChampionItem = useCallback((id) => {
    router.push({
      pathname: '/champion/[championName]',
      query: { championName: `${id}`}
    });
  }, []);
  
  return (
    <>
      <ChampionSearchInput
        placeholder="챔피언 검색" 
        enterButton
      />
      <ChampList>
        {
          data.map((v) => {
            return (
              <ChampListItem 
                key={v.name}
                onClick={() => onClickChampionItem(v.id)}
              >
                <ChampionImg src={`/img/champion/${v.id}.png`} alt={ `${v.id}` }/>
                <ChampionName>{v.name}</ChampionName>
              </ChampListItem>
            )
          })
        }
      </ChampList>
    </>
  );
};

const ChampionSearchInput = styled(Input.Search)`
  margin: 1rem 0;

  & ::placeholder {
    font-size: 1.2rem;
  }
`;

const ChampList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  max-height: 27rem;
  overflow-y: scroll;
  background-color: #ffffff;
  border: 1px solid rgba(206, 212, 218, .5);
  padding: 1rem;

  @media ${props => props.theme.tablet} {
    max-height: 100%;
    overflow: auto;
  }
`;

 const ChampListItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: .2rem;
`;

 const ChampionImg = styled.img`
  display: block;
  width: 4rem;
  height: 4rem;
`;

 const ChampionName = styled.span`
  display: block;
  width: 3rem;
  padding: .5rem 0;
  font-size: .8rem;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export default ChampionList;