import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const PrevButton = ({ onClick }) => {
  return <PrevSlideButton onClick={onClick} />;
};

const NextButton = ({ onClick }) => {
  return <NextSlideButton onClick={onClick} />;
};

const ChampionSkins = ({ championName, skins }) => {
  const options = {
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevButton />,
    nextArrow: <NextButton />,
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
  position: relative;
  width: 100%;
  padding: 1rem;
`;

const SkinImg = styled.img`
  width: 100%;
`;

const PrevSlideButton = styled(LeftOutlined)`
  position: absolute;
  top: 50%;
  left: 1%;
  font-size: 2rem;
  color: rgba(255, 255, 255, 0.5);
  z-index: 999;
  cursor: pointer;
`;

const NextSlideButton = styled(RightOutlined)`
  position: absolute;
  top: 50%;
  right: 1%;
  font-size: 2rem;
  color: rgba(255, 255, 255, 0.5);
  z-index: 999;
  cursor: pointer;
`;
