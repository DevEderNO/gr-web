import styled, { css } from 'styled-components';

interface IFoodPlateProps {
  available: boolean;
}

export const Container = styled.div<IFoodPlateProps>`
  background: #f0f0f5;
  border-radius: 0.8rem;
  display: flex;
  flex-direction: column;
  font-size: 1rem;

  header {
    background: #ffb84d;
    border-radius: 0.8rem 0.8rem 0 0;
    overflow: hidden;
    transition: 0.3s opacity;
    text-align: center;
    display: flex;
    max-height: 206px;

    ${props =>
      !props.available &&
      css`
        opacity: 0.3;
      `};

    img {
      pointer-events: none;
      width: 100%;
      user-select: none;
      object-fit: cover;
      object-position: center;
    }
  }

  section.body {
    padding: 2rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    font-size: 1rem;

    h2 {
      color: #3d3d4d;
    }

    > div {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      p {
        color: #3d3d4d;

        margin-top: 1.6rem;
      }

      .price {
        font-style: normal;
        font-size: 2rem;
        line-height: 3.4rem;
        color: #39b100;

        b {
          font-weight: 600;
        }
      }
    }
  }

  section.footer {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 2rem;
    background: #e4e4eb;
    border-radius: 0px 0px 0.8rem 0.8rem;

    div.icon-container {
      display: flex;

      button {
        background: #fff;
        padding: 1rem;
        border-radius: 0.8rem;
        display: flex;
        border: none;
        transition: 0.1s;

        svg {
          color: #3d3d4d;
        }

        & + button {
          margin-left: 0.6rem;
        }
      }
    }

    div.availability-container {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      margin-left: 3rem;
      justify-content: center;

      p {
        color: #3d3d4d;
        margin-right: 10px;
      }

      .switch {
        position: relative;
        display: inline-block;
        width: 8rem;
        height: 2.2rem;

        & input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #c72828;
          -webkit-transition: 0.4s;
          transition: 0.4s;
          border-radius: 1.6rem;

          &:before {
            position: absolute;
            content: '';
            height: 1.6rem;
            width: 4rem;
            left: 0.4rem;
            bottom: 0.3rem;
            background-color: white;
            -webkit-transition: 0.4s;
            transition: 0.4s;
            border-radius: 1rem;
          }
        }

        input:checked + .slider {
          background-color: #39b100;
        }

        input:focus + .slider {
          box-shadow: 0 0 0.1rem #2196f3;
        }

        input:checked + .slider:before {
          -webkit-transform: translateX(3.2rem);
          -ms-transform: translateX(3.2rem);
          transform: translateX(3.2rem);
        }
      }
    }
  }
`;
