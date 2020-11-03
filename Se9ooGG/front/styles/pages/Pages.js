import styled from 'styled-components';
import { Input } from 'antd'

// PageTitle
export const PageTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
`;

// index
export const HomeContainer = styled.div`
  width: 100%;
  margin: 0;
  padding: 0;
`;

export const MainLogoImg = styled.img`
  max-width: 100%;
  height: auto;
  padding: 70px 10%;
`;

export const UserSearchInput = styled(Input.Search)`
  max-width: 100%;
  padding: 0 10%;

  & ::placeholder {
    font-size: 1.2rem;
  }
`;