import styled from 'styled-components';

export const Container = styled.div`
  background: #c72828;
  padding: 30px 0;

  img {
    width: 100%;
    max-width: 308px;
  }

  header {
    width: 100%;
    padding: 0 20px 160px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;

    nav {
      div {
        button {
          font-weight: 600;
          border-radius: 8px;
          border: 0;
          overflow: hidden;
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
      }
    }

    @media (max-width: 530px) {
      nav {
        div {
          button {
            .text {
              display: none;
            }
          }
        }
      }
    }

    @media (max-width: 430px) {
      justify-content: center;
      nav {
        div {
          button {
            margin-top: 20px;
            width: 100%;
            .text {
              display: flex;
            }
          }
        }
      }
    }
  }
`;
