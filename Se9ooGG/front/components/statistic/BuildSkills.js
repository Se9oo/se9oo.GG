import React from 'react';
import { getChampionFullInfoById } from '../../util/JsonUtil';
import { ArrowRightOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const BuildSkills = ({ skills, winOrLose, championId }) => {

  // 스킬 키 배열
  const key = ['Q', 'W', 'E', 'R'];
  // 선택한 챔피언 정보
  const champion = getChampionFullInfoById(championId);
  // 챔피언 스킬 QWE 만 가져옴
  const championSkill = champion.spells.slice(0, 3);
  // 챔피언 스킬 QWE 
  const championSkillMaxrank = championSkill.map((skill) => {
    return { id: skill.id, maxrank: skill.maxrank }
  });
  
  // skill master 순서
  let skillMasterOrder = [];
  
  skills.map((skill) => {
    // R 스킬 제외한 나머지 스킬만 체크
    if (skill.skillSlot !== 4) {
      championSkillMaxrank[skill.skillSlot - 1].maxrank -= 1;
      // maxrank에 도달하면
      if (championSkillMaxrank[skill.skillSlot - 1].maxrank === 0) {
        // skill master order에 push
        skillMasterOrder.push(championSkillMaxrank[skill.skillSlot - 1]);
      }
    }
  })

  // 순서가 모두 세팅되지 않았다면
  if (skillMasterOrder.length !== 3) {
    // maxrank 도달 순서 대로 오름차순으로 정렬
    championSkillMaxrank.sort((a, b) => a.maxrank - b.maxrank).map((skill) => {
      // 이미 push 된 skill을 제외한 나머지 skill push
      if (skill.maxrank !== 0) {
        skillMasterOrder.push(skill);
      }
    })
  }
  
  return (
    <Skill>
      <SkillMasterOrder>
        {
          skillMasterOrder.map((skill, idx) => {
            return (
              <React.Fragment key={`${skill.id}_fragment`}>
                <img key={skill.id} src={`/img/spell/${skill.id}.png`}/>
                { skillMasterOrder.length === idx + 1 ? null : <RightArrow key={skill.id + idx}/> }
              </React.Fragment>
            )
          })
        }
      </SkillMasterOrder>
      <SkillTable>
        <tbody>
          {
            key.map((k, idx) => {
              return (
                <tr key={k}>
                  <th scope="row" key={`${k + idx}`}>{k}</th>
                  {
                    skills.map((skill, i) => {
                      if (skill.skillSlot === idx + 1) {
                        return <SkillTd key={i} winOrLose={winOrLose}>{i + 1}</SkillTd>      
                      } else {
                        return <td key={i}></td>
                      }
                    })
                  }
                </tr>
              );
            })
          }
        </tbody>
      </SkillTable>
    </Skill>
  );
};

export default BuildSkills;

const Skill = styled.div`
  padding: 1rem;
`;

const SkillMasterOrder = styled.ol`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  & img {
    width: 10%;
  }
`;

const RightArrow = styled(ArrowRightOutlined)`
  padding: 0 .5rem;
`;

const SkillTable = styled.table`
  width: 100%;

  & td, th {
    width: 5.5%;
    padding: .8rem 0;
    border: 1px solid #e5e5e5;
    text-align: center;
  }
`;

const SkillTd = styled.td`
  ${props => {
    if (props.winOrLose === '승') {
      return `background-color: #339af0;`;
    } else {
      return `background-color: #e03131;`;
    }
  }}
  color: #ffffff;
`;