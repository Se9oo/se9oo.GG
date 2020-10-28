import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const ChampionImg = styled.img`
  display: block;
  width: 50px;
  height: 50px;
  padding: .2rem;
`;

const ChampionList = ({ data }) => {
  console.log(JSON.stringify(data));
  return (
    <>
      <ul style={{ display: 'flex', flexWrap: 'wrap', height: '100px'}}>
        {
          data.map((v) => {
            return <li><ChampionImg src={`/img/champion/${v}.png`} alt={ `${v}` }/></li>
          })
        }
      </ul>
    </>
  );
};

export default ChampionList;