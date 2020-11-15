import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { ChampionImg, ChampionName, ChampList, ChampListItem } from '../styles/components/Components';

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

export default ChampionList;