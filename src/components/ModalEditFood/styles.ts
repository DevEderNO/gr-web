import styled, { css } from 'styled-components';
import { Form as Unform } from '@unform/web';

interface IColumnProps {
  width?: string;
}

export const Form = styled(Unform)`
  padding: 48px 40px;
  display: flex;
  flex-direction: column;

  h1 {
    font-weight: 600;
    font-size: 36px;
    line-height: 36px;
    margin-bottom: 20px;
  }

  button {
    margin-top: 24px;
    align-self: flex-end;
  }

  span {
    color: #6c6c80;
    margin-top: 10px;
  }

  button {
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

export const Row = styled.div`
  display: flex;
  width: 100%;
`;

export const Column = styled.div<IColumnProps>`
  display: flex;
  flex-direction: column;

  ${props =>
    props.width &&
    css`
      width: ${props.width};
    `}

  + div {
    margin-left: 10px;
  }
`;
