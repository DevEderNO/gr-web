import styled from 'styled-components';

export const FoodsContainer = styled.div`
  width: 100%;
  padding: 2rem;
  margin-top: -10rem;

  display: grid;
  justify-content: center;

  grid-template-columns: repeat(auto-fit, minmax(auto, 23rem));
  grid-gap: 1.6rem;
`;
