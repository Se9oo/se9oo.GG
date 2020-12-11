import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
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
      <ChampList>
        {
          data.map((v) => {
            return (
              <ChampListItem 
                key={v.name}
                onClick={() => onClickChampionItem(v.id)}
              >
                <motion.div
                  key={v.name}
                  style={{ cursor: 'pointer'}}
                  whileTap={{ scale: 1.2 }}
                >
                  <ChampionImg src={`/img/champion/${v.id}.png`} alt={ `${v.id}` }/>
                </motion.div>
                <ChampionName>{v.name}</ChampionName>
              </ChampListItem>
            )
          })
        }
      </ChampList>
    </>
  );
};

export const ChampList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  max-height: 27rem;
  overflow-y: scroll;
  background-color: #ffffff;
  border: 1px solid rgba(206, 212, 218, .5);

  @media ${props => props.theme.tablet} {
    max-height: 100%;
    overflow: auto;
  }
`;

export const ChampListItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: .2rem;
`;

export const ChampionImg = styled.img`
  display: block;
  width: 4rem;
  height: 4rem;
`;

export const ChampionName = styled.span`
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