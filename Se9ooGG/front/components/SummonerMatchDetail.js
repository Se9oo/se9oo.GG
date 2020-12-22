import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

const SummonerMatchDetail = ({ match }) => {
  // menu item
  const menuItemArr = ['종합', '팀 분석', '빌드', 'etc'];
  // 선택한 메뉴 저장 state
  const [selectedMenu, setSelectedMenu] = useState(0);
  const onClickMenu = useCallback((idx) => () => {
    setSelectedMenu(idx)
  }, []);
  return (
    <>
      <MatchDetailHeader>
        {
          menuItemArr.map((item, idx) => {
            return <MatchDetailMenu key={idx} idx={idx} select={selectedMenu} onClick={onClickMenu(idx)}>{`${item}`}</MatchDetailMenu>
          })
        }
      </MatchDetailHeader>
    </>
  );
};

const MatchDetailHeader = styled.ul`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  font-size: 1.2rem;
  text-align: center;
`;

const MatchDetailMenu = styled.li`
  width: 25%;
  padding: 1rem;
  ${props => {
    if (props.select === props.idx) {
      return `background-color: #339af0;`;
    } else {
      return `background-color: #ffffff;`;
    }
  }}
`;

export default SummonerMatchDetail;