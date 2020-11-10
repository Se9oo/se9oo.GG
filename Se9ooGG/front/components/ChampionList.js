import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ChampionImg = styled.img`
  display: block;
  width: 50px;
  height: 50px;
  padding: .2rem;
`;

const ChampionList = ({ data }) => {
  return (
    <>
      <ul style={{ display: 'flex', flexWrap: 'wrap'}}>
        {
          data.map((v) => {
            return (
              <li key={v}>
                <motion.div
                  key={v}
                  style={{ cursor: 'pointer'}}
                  whileTap={{ scale: 1.2 }}
                >
                  <ChampionImg src={`/img/champion/${v}.png`} alt={ `${v}` }/>
                </motion.div>
              </li>
            )
          })
        }
      </ul>
    </>
  );
};

export default ChampionList;