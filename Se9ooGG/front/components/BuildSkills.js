import React from 'react';
import styled from 'styled-components';

const BuildSkills = ({ skills, winOrLose }) => {

  // 스킬 키 배열
  const key = ['Q', 'W', 'E', 'R'];

  return (
    <Skill>
      <SkillOrder>

      </SkillOrder>
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

const SkillOrder = styled.ol`
  display: flex;
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