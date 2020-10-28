import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;

  @media ${props => props.theme.laptop} {
    max-width: 1024px;
    margin: 0 auto;
  }
`;

export const DesktopNav = styled.nav`
  display: none;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  padding: 1rem;
  border-bottom: 1px solid #e5e5e5;
  background-color: #ffffff;
  z-index: 9999;

  & h1 {
    width: 20%;
    font-size: 2rem;
  }

  & ul {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 80%;
  }

  & li {
    padding: 0 2rem;
  }

  @media ${props => props.theme.laptop} {
    display: flex;
  }
`;

export const ContentContainer = styled.section`
  padding: 1rem 1rem 71px;

  @media ${props => props.theme.laptop} {
    padding: 80px 1rem 1rem;
  }
`;

export const MobileFooter = styled.footer`
  display: block;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;

  & ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff;
    border-top: 1px solid #e5e5e5;
    padding: 1rem 0;
    z-index: 9999;
  }

  & li {
    width: 20%;
    text-align: center;
  }

  & a {
    display: block;
    padding: 1.5rem 1rem;
    font-size: 2rem;
  }

  @media ${props => props.theme.laptop} {
    display:none;
  }
`;