import styled, { css } from 'styled-components';
import Tooltip from '../../Tooltip';

interface IContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const LabelInput = styled.label`
  color: #6c6c80;
  margin-top: 10px;
  margin-left: 5px;
`;

export const Container = styled.div<IContainerProps>`
  display: flex;
  align-items: center;
  background: #fff;
  border-width: 2px;
  border-style: solid;
  border-color: #f4ede8;
  border-radius: 8px;
  padding: 18px 24px;
  width: 100%;
  font-size: 16px;

  > & + div {
    margin-top: 24px;
  }

  h1 {
    margin-bottom: 40px;
    font-weight: 600;
    font-size: 36px;
    line-height: 36px;
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      color: #ff9000;
      border-color: #ff9000;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #ff9000;
    `}

    textarea {
    flex: 1;
    background: transparent;
    border: 0;
    color: inherit;

    &::placeholder {
      color: #b7b7cc;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: #f4ede8;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
