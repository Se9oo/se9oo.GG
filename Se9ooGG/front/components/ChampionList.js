import React from 'react';
import styled from 'styled-components';

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
            return <li key={v}><ChampionImg src={`/img/champion/${v}.png`} alt={ `${v}` }/></li>
          })
        }
      </ul>
    </>
  );
};

export default ChampionList;