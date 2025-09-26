import styled from "styled-components";

export const DivContainer = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.palette.primary[900]};
  overflow: hidden;
  & > svg {
    width: 100%;
  }

  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 210px;
    position: absolute;
    bottom: 150px;
    margin: 0 auto;
    left: 50.2%;
    transform: translate(-50%, -50%);

    & > p {
      color: ${({ theme }) => theme.palette.primary[300]};
      font-size: 20px;
    }

    & > button {
      cursor: pointer;
      margin-top: 20px;
      font-weight: 600;
      background: ${({ theme }) => theme.palette.primary[300]};
      color: ${({ theme }) => theme.palette.primary[900]} !important;
      & > div {
        margin-left: 11px !important;
        width: 16px !important;
        height: 20px !important;
      }

      & > svg {
        width: 20px !important;
        height: 20px !important;
      }
    }
  }
`;
