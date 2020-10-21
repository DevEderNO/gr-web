import styled from 'styled-components';
import { Form as UnForm } from '@unform/web';

export const Form = styled(UnForm)`
  display: flex;
  flex-direction: column;
  padding: 15px 20px;

  > button {
    align-self: flex-end;
    margin-top: 24px;
    font-weight: 600;
    border-radius: 8px;
    border: 0;
    background: #39b100;
    color: #fff;

    display: flex;
    flex-direction: row;
    align-items: center;

    .text {
      padding: 16px 24px;
    }

    .icon {
      display: flex;
      padding: 16px 16px;
      background: #41c900;
      border-radius: 0 8px 8px 0;
      margin: 0 auto;
    }
  }
`;
