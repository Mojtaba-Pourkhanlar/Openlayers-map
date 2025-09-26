import { GridCol } from "@/Components/Common/Core/Grid";
import TextInputRHF from "@/Components/Common/Core/Input/TextFaild/New";
import styled from "styled-components";

export const GridItemLeft = styled(GridCol)`
  padding: 0 !important;
  display: block;
  & > #image-Container {
    height: 100vh;
    background: ${({ theme }) => theme.palette.primary[900]};
    width: 100%;
    text-align: center;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & > img {
      width: 100%;
      height: 84%;
      position: absolute;
      bottom: 0%;
      padding-left: 50px;
    }
    & > p {
      font-size: 48px;
      background: linear-gradient(
        90deg,
        #acd6ec 3.65%,
        rgba(172, 214, 236, 0) 125.58%
      );
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      position: absolute;
      top: 7%;
    }
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

export const GridItemRight = styled(GridCol)`
  & > #number-Container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100vh;

    & > div:first-child {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      & > p {
        font-size: 24px;
        line-height: 24px;
        font-weight: 400;
        letter-spacing: 0.1px;
        font-style: normal;
        margin: 16px 0 5px !important;
        color: ${({ theme }) => theme.palette.neutral[900]};
        @media (max-width: 868px) {
          font-size: 20px;
        }
        @media (max-width: 768px) {
          font-size: 16px;
        }
      }
      & > p:last-child {
        font-size: 14px;
        line-height: 24px;
        font-weight: 400;
        letter-spacing: 0.1px;
        font-style: normal;
        color: ${({ theme }) => theme.palette.neutral[300]};
        margin-bottom: 30px !important;
        @media (max-width: 768px) {
          font-size: 12px;
        }
      }

      @media (max-width: 850px) {
        padding: 0 20px;
      }
    }

    & > form {
      & input {
        text-align: end;
      }
      & > button {
        margin: 35px 0 48px !important;
        width: 380px;

        @media (max-width: 868px) {
          width: 320px;
        }
        @media (max-width: 768px) {
          width: 280px;
        }
      }
    }

    & > div {
      display: flex;
      align-items: center;
      cursor: pointer;
      & > p {
        font-size: 14px;
        font-weight: 400;
        line-height: 24px;
        letter-spacing: 1px;
        margin-right: 8px;
        color: ${({ theme }) => theme.palette.primary[600]};
      }
    }
  }

  & > #OtpCode-Container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100vh;

    & > div:first-child {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      & > div {
        display: flex;
        align-items: center;
        cursor: pointer;
        margin: 16px 0 !important;

        & > svg > path {
          fill: ${({ theme }) => theme.palette.primary[900]};
        }

        & > p {
          margin-right: 15px;
          font-size: 24px;
          line-height: 24px;
          font-weight: 400;
          letter-spacing: 0.1px;
          font-style: normal;
          color: ${({ theme }) => theme.palette.neutral[900]};
          @media (max-width: 868px) {
            font-size: 20px;
          }
          @media (max-width: 768px) {
            font-size: 16px;
          }
        }
      }
      & > p:last-child {
        font-size: 14px;
        line-height: 24px;
        font-weight: 400;
        letter-spacing: 0.1px;
        font-style: normal;
        color: ${({ theme }) => theme.palette.neutral[300]};
        margin-bottom: 30px !important;
        @media (max-width: 768px) {
          font-size: 12px;
        }
      }

      @media (max-width: 850px) {
        padding: 0 20px;
      }
    }

    & > form {
      display: block;
      direction: ltr;
      & > div {
        width: 100%;
        display: flex;
        justify-content: center;
      }

      & > p {
        margin: 10px 0 10px 13px;
        & > span {
          margin: 10px 0 13px -10px !important;
          display: flex;
          justify-content: start;
          width: 100%;
          color: ${({ theme }) => theme.palette.primary[600]};
          font-size: 12px;
          cursor: pointer;
          font-weight: 900;
        }
      }

      & > button {
        margin: 25px 0 48px !important;
        width: 380px;

        @media (max-width: 868px) {
          width: 320px;
        }
        @media (max-width: 768px) {
          width: 280px;
        }
      }
    }

    & > div {
      display: flex;
      cursor: pointer;
      & > p {
        font-size: 14px;
        font-weight: 400;
        line-height: 24px;
        letter-spacing: 1px;
        margin-right: 8px;
        color: ${({ theme }) => theme.palette.primary[600]};
      }
    }
  }

  & > #change-Container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100vh;

    & > div:first-child {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      & > p {
        font-size: 24px;
        line-height: 24px;
        font-weight: 400;
        letter-spacing: 0.1px;
        font-style: normal;
        margin: 16px 0 55px !important;
        color: ${({ theme }) => theme.palette.neutral[900]};
        @media (max-width: 868px) {
          font-size: 20px;
        }
        @media (max-width: 768px) {
          font-size: 16px;
        }
      }

      @media (max-width: 850px) {
        padding: 0 20px;
      }
    }

    & > form {
      & > button {
        & div {
          margin: 0;
        }

        margin: 0px 0 48px !important;
        width: 380px;

        @media (max-width: 868px) {
          width: 320px;
        }
        @media (max-width: 768px) {
          width: 280px;
        }
      }
    }

    & > div {
      display: flex;
      align-items: center;
      cursor: pointer;
      & > p {
        font-size: 14px;
        font-weight: 400;
        line-height: 24px;
        letter-spacing: 1px;
        margin-right: 8px;
        color: ${({ theme }) => theme.palette.primary[600]};
      }
    }
  }
`;

export const StyledInput = styled.input<{
  $error: boolean;
  $index: number;
}>`
  outline: none;
  border: ${({ $error }) => ($error ? "1px solid red" : "1px solid #A0A0A0")};
  margin-right: ${({ $index }) => ($index !== 4 ? "16px" : "0")};
  width: 60px;
  height: 60px;
  border-radius: 16px;
  font-size: 25px;
  text-align: center;
  transition: border-color 0.3s;
  background-color: ${({ theme }) => theme.palette.neutral[0]};
  color: ${({ theme }) => theme.palette.neutral[900]};
  @media (max-width: 870px) {
    width: 48px;
    margin-right: ${({ $index }) => ($index !== 4 ? "6px" : "0")};
    height: 48px;
    font-size: 20px;
  }
`;

export const FormStyle = styled.form`
  width: 380px;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  @media (max-width: 868px) {
    width: 350px;
  }
  @media (max-width: 768px) {
    width: 288px;
  }
`;
export const FormChangePassStyle = styled.form`
  width: 380px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  @media (max-width: 868px) {
    width: 350px;
  }
  @media (max-width: 768px) {
    width: 288px;
  }
`;

export const TextInputReg = styled(TextInputRHF)`
  display: flex;
  flex-direction: row-reverse;
  & input {
    /* text-align: left !important; */
    &::placeholder {
      text-align: right !important;
    }
  }
`;
