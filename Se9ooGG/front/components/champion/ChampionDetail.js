import React from 'react';
import ChampionSpells from './ChampionSpells';
import ChampionStats from './ChampionStats';
import styled from 'styled-components';

const ChampionDetail = ({ champion }) => {
  // champion stat 정보
  const stats = champion.stats;
  const spells = champion.spells;

  return (
    <>
      <Info>
        <Feature>
          <img src={`/img/champion/${champion.id}.png`} alt={`${champion.id}-img`} />
        </Feature>
        <Definition>
          <Tags>
            {champion.tags.map((tag, idx) => {
              return <span key={idx}>{tag}</span>;
            })}
          </Tags>
          <h1>{champion.name}</h1>
          <strong>{champion.title}</strong>
          <p>{champion.blurb}</p>
        </Definition>
      </Info>
      <section>
        <Contents>
          <ChampionSpells spells={spells} />
          <ChampionStats stats={stats} />
        </Contents>
        <Contents>
          <article>tip</article>
          <article>comments</article>
        </Contents>
      </section>
      <section>skins</section>
    </>
  );
};

export default ChampionDetail;

const Info = styled.section`
  background-color: #ffffff;
  border: 1px solid rgba(206, 212, 218, 0.5);
  margin-bottom: 1rem;
  padding: 1rem;

  @media ${(props) => props.theme.tablet} {
    display: flex;
  }
`;

const Feature = styled.div`
  margin: 0 auto 1rem;

  & img {
    width: 12rem;
    margin: 0 auto;
  }

  @media ${(props) => props.theme.tablet} {
    width: 30%;
    margin: 0 auto;
  }
`;

const Definition = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;

  & h1 {
    font-weight: 700;
    font-size: 1.6rem;
    line-height: 1.5;
    margin-bottom: 0.5rem;
  }

  & strong {
    font-size: 1.1rem;
    color: #868e96;
    margin-bottom: 0.5rem;
    line-height: 1.5;
  }

  & p {
    font-size: 1.2rem;
    font-style: italic;
    line-height: 1.5;
  }

  @media ${(props) => props.theme.tablet} {
    width: 70%;
    align-items: flex-start;
  }
`;

const Tags = styled.div`
  display: flex;
  margin-bottom: 0.5rem;

  & span {
    background-color: #dee2e6;
    margin: 0 0.5rem;
    padding: 0.5rem;
    border: 1px solid #ced4da;
  }

  @media ${(props) => props.theme.tablet} {
    & span:first-child {
      margin: 0 0.5rem 0 0;
    }
  }
`;

const Contents = styled.div`
  display: block;

  & article {
    background-color: #ffffff;
    border: 1px solid rgba(206, 212, 218, 0.5);
    margin-bottom: 1rem;
  }

  @media ${(props) => props.theme.tablet} {
    display: flex;
    justify-content: space-between;

    & article {
      width: 49%;
    }
  }
`;
