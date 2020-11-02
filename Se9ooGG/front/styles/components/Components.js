import styled from 'styled-components';
import { Form } from 'antd';

// common
export const ErrorMessage = styled.div`
  color: #e03131;
`;

// LoginForm
export const FormContainer = styled(Form)`
  padding: 3rem 0;
`;

export const InputContainer = styled.div`
  margin-bottom: 1rem;

  & label {
    display: block;
    padding-bottom: .5rem;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

// UserProfile
export const UserProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: #ffffff;
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 1rem;

  & img {
    display: block;
    width: 30%;
    height: 30%;
    margin-bottom: 1rem;
    border-radius: 999px;
    padding: 1rem;
  }

  & button {
    width: 100%;
  }
`;

export const UserNickname = styled.strong`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

export const UserInfo = styled.dl`
  display: flex;
  width: 100%;
  font-size: 1.3rem;
  margin-bottom: 3rem;
  
  & div {
    flex-grow: 1;
    flex-basis: 30%;
    padding: 0 1rem;
    border-right: 1px solid #e5e5e5;
  }

  & div:last-child {
    border-right: none;
  }

  & dt {
    text-align: center;
    margin-bottom: 1rem;
  }

  & dd {
    text-align: center;
  }
`;