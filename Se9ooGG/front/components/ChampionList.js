import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Router } from 'next/dist/client/router';
import { ChampionName, ChampList } from '../styles/components/Components';

const ChampionImg = styled.img`
  display: block;
  width: 7rem;
  height: 7rem;
  padding: .2rem;
`;

const ChampionList = ({ data }) => {

  // const onClickChampionImg = useCallback(() => {
  //   Router.push('/')
  // }, []);
  return (
    <>
      <ChampList>
        {
          data.map((v) => {
            return (
              <li style={{ display: 'flex', flexDirection:'column', alignItems: 'center'}} key={v.name}>
                <motion.div
                  key={v.name}
                  style={{ cursor: 'pointer'}}
                  whileTap={{ scale: 1.2 }}
                >
                  <ChampionImg src={`/img/champion/${v.id}.png`} alt={ `${v.id}` }/>
                </motion.div>
                <ChampionName>{v.name}</ChampionName>
              </li>
            )
          })
        }
      </ChampList>
    </>
  );
};

export default ChampionList;