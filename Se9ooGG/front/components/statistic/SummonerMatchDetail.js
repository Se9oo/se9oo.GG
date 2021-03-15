import React, { useCallback, useState } from 'react';
import MatchDetailTotal from './MatchDetailTotal';
import MatchDetailAnalysis from './MatchDetailAnalysis';
import MatchDetailBuild from './MatchDetailBuild';
import MatchDetailEtc from './MatchDetailEtc';
import styled from 'styled-components';

const SummonerMatchDetail = ({ match, winOrLose }) => {
  // menu item
  const menuItemArr = ['종합', '팀 분석', '빌드', 'etc'];
  // 선택한 메뉴 저장 state
  const [selectedMenu, setSelectedMenu] = useState(0);
  const onClickMenu = useCallback(
    (idx) => () => {
      setSelectedMenu(idx);
    },
    []
  );
  return (
    <>
      {winOrLose === '무' ? null : (
        <MatchDetailHeader>
          {menuItemArr.map((item, idx) => {
            return (
              <MatchDetailMenu
                key={idx}
                idx={idx}
                select={selectedMenu}
                winOrLose={winOrLose}
                onClick={onClickMenu(idx)}
              >{`${item}`}</MatchDetailMenu>
            );
          })}
        </MatchDetailHeader>
      )}
      {(selectedMenu === 0 && <MatchDetailTotal match={match} />) ||
        (selectedMenu === 1 && <MatchDetailAnalysis match={match} />) ||
        (selectedMenu === 2 && (
          <MatchDetailBuild match={match} winOrLose={winOrLose} />
        )) ||
        (selectedMenu === 3 && (
          <MatchDetailEtc match={match} winOrLose={winOrLose} />
        ))}
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
  ${(props) => {
    if (props.select === props.idx) {
      return `background-color: #ffffff;`;
    } else {
      if (props.winOrLose == '무') {
        return `background-color: #adb5bd;`;
      } else {
        return `
          background-color: ${props.winOrLose == '승' ? '#339af0' : '#e03131'};
          color: #ffffff;
        `;
      }
    }
  }}
  transition: all .3s ease;
  cursor: pointer;
`;

export default SummonerMatchDetail;
