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