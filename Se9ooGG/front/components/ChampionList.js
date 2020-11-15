import React from 'react';
import { motion } from 'framer-motion';
import { Router } from 'next/dist/client/router';
import { ChampionImg, ChampionName, ChampList, ChampListItem } from '../styles/components/Components';

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
              <ChampListItem key={v.name}>
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

export default ChampionList;