import styled from 'styled-components';
import { Button, Input } from 'antd'

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
  padding: 70px 20%;
`;

export const UserSearchInput = styled(Input.Search)`
  max-width: 100%;
  padding: 0 10%;

  & ::placeholder {
    font-size: 1.2rem;
  }
`;

// community
export const PostSearchInput = styled(Input.Search)`
  margin: 1rem 0;

  & ::placeholder {
    font-size: 1.2rem;
  }
`;

export const PostAddBtn = styled(Button)`
  width: 100%;
  margin-bottom: 1rem;
`;

// comment
export const CommentHeader = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 30px;

  & svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 2rem;
    height: 2rem;
    cursor: pointer;
  }

  & h2 {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, 20%);
    font-size: 2rem;
  }
`;