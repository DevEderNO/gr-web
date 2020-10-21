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

  span {
    color: #6c6c80;
    margin-top: 10px;
    margin-left: 5px;
  }

  > button {
    margin-top: 24px;
    align-self: flex-end;
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
  align-items: baseline;
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

export const ExtrasTable = styled.table`
  background: #fff;
  padding: 5px 10px;
  font-family: 'Poppins', sans-serif;
  color: #6c6c80;

  td {
    vertical-align: center;

    + td {
      margin-top: 5px;
    }
    svg {
      cursor: pointer;

      + svg {
        margin-left: 10px;
      }
    }
  }
`;

export const ButtonAddExtras = styled.button`
  width: max-content;
  font-weight: 600;
  border-radius: 3px;
  border: 0;
  background: #39b100;
  color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: hidden;

  .text {
    padding: 3px 12px;
  }

  .icon {
    display: flex;
    background: #41c900;
    padding: 3px;
    margin: 0 auto;
  }
`;
