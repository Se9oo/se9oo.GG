import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';

const ChampionSkins = ({ championName, skins }) => {
  const options = {
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <article>
      <SubTitle>스킨</SubTitle>
      <SliderWrapper>
        <Slider {...options}>
          {skins.map((skin) => {
            return (
              <div key={skin.id}>
                <SkinImg
                  key={`${skin.id}_${skin.num}`}
                  src={`/img/champion/splash/${championName}_${skin.num}.jpg`}
                  alt={`champion-skin-img`}
                />
              </div>
            );
          })}
        </Slider>
      </SliderWrapper>
    </article>
  );
};

export default ChampionSkins;

const SubTitle = styled.h2`
  display: block;
  margin-bottom: 1rem;
  padding: 1rem;
  border-bottom: 1px solid rgba(206, 212, 218, 0.5);
  font-size: 1.2rem;
`;

const SliderWrapper = styled.div`
  width: 100%;
  padding: 1rem;
`;

const SkinImg = styled.img`
  width: 100%;
`;
