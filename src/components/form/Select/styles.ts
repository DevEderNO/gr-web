import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  label {
    color: #6c6c80;
    margin-top: 10px;
    margin-left: 5px;
  }

  select {
    display: flex;
    align-items: center;
    background: #fff;
    border-width: 2px;
    border-style: solid;
    border-color: #f4ede8;
    border-radius: 8px;
    padding: 18px 24px;
    width: 100%;
    color: #ff9000 !important;
    font-family: 'Poppins', sans-serif;
  }
`;
