import Box from "@/Components/Common/Core/Box";
import { Modal } from "@/Components/Common/Core/Modal";
import Typography from "@/Components/Common/Core/Typography";
import { styled } from "styled-components";

const ModalContainer = styled(Modal)`
  padding-right: 0px !important;
  .modal-content {
    border-radius: 24px;
  }
`;

const ModalContainerTable = styled(Modal)`
  padding-right: 0px !important;
  @media (max-width: 480px) {
    padding-top: 14px;
  }
  .modal-dialog {
    width: 620px !important;
    height: 640px !important;
    max-width: none;
    @media (max-width: 768px) {
      width: 450px !important;
      margin: auto !important;
    }
    @media (max-width: 480px) {
      width: 100% !important;
      margin: 0 !important;
    }
  }
  .modal-content {
    border-radius: 24px;
    @media (max-width: 480px) {
      border-radius: 0px;
    }
  }
`;

const ModalContainerViewSpecifications = styled(Modal)`
  padding-right: 0px !important;
  @media (max-width: 480px) {
    padding-top: 14px;
  }
  .modal-dialog {
    width: 827px !important;
    height: 640px !important;
    max-width: none;
    @media (max-width: 990px) {
      width: 500px !important;
      margin: auto !important;
    }
    @media (max-width: 480px) {
      width: 100% !important;
      margin: 0 !important;
    }
  }
  .modal-content {
    border-radius: 24px;
    @media (max-width: 480px) {
      border-radius: 0px;
    }
  }
`;

const BoxClose = styled(Box)`
  border: 1px solid ${({ theme }) => theme.palette.neutral[300]};
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const TextHeader = styled(Typography)`
  font-size: 16px;
  color: ${({ theme }) => theme.palette.neutral[0]};
  margin: 0;
`;

const BoxHeader = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 15px 20px 10px;
  background-color: ${({ theme }) => theme.palette.primary[900]};
  border-radius: 24px 24px 0 0;
`;

const BoxMain = styled(Box)`
  display: flex;
  align-items: start;
  justify-content: space-between;
  max-height: 425px;
  overflow-y: auto;
  width: 100%;
  padding: 5px 0 20px 10px;
  direction: ltr;
  margin: 0 7px 0 0 !important;

  &::-webkit-scrollbar {
    height: 3px;
    width: 7px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 24px;
    background-color: ${({ theme }) => theme.palette.neutral[300]};
  }
  &::-webkit-scrollbar-track {
    border-radius: 24px;
    background-color: ${({ theme }) => theme.palette.neutral[100]};
  }

  @media (max-width: 480px) {
    flex-direction: column;
    max-height: 100%;
  }
`;
const BoxContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;

  @media (max-width: 480px) {
    height: 100vh !important;
  }
`;
const BoxCheckbox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: start;
`;
const BoxCheckboxChild = styled(Box)`
  display: flex;
  align-items: start;
  justify-content: start;
  flex-direction: column;
`;

const BoxSelectAll = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: start;
  width: 100%;
  padding: 20px 20px 15px;
`;

const BoxFooter = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 0 10px;
`;

const BoxView = styled(Box)`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 20px 20px;
  &::-webkit-scrollbar {
    height: 3px;
    width: 3px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 24px;
    background-color: ${({ theme }) => theme.palette.neutral[300]};
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  @media (max-width: 990px) {
    flex-direction: column;
    max-height: 600px;
    overflow-y: auto;
  }
`;

const BoxCard = styled(Box)`
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.palette.neutral[100]};
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
`;

const BoxCardChild = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: column;
  width: 180px;
  padding: 9px 0;
  color: ${({ theme }) => theme.palette.neutral[600]};

  @media (max-width: 480px) {
    width: 120px;
  }
`;

const BoxCardChildRes = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: column;
  padding: 7px 0;
  width: calc(100% - 180px);

  @media (max-width: 480px) {
    width: calc(100% - 120px);
  }
`;

const BoxEvaluContainer = styled(Box)`
  display: flex;
  div {
    /* width: 130px !important; */
    div {
      /* width: 130px !important; */
    }
  }

  #newSelect {
    margin: 7px 0 0 10px;
    button {
      padding: 10px 15px;
      width: 130px !important;
      height: 40px !important;
      img {
        margin: 0px !important;
      }
    }
  }
  #newSelectMode {
    margin: 7px 0 0 10px;
    button {
      padding: 10px 15px;
      width: 130px !important;
      height: 40px !important;
      img {
        margin: 0px !important;
      }
    }
  }
  #modeSelect {
    margin: 1px 0 0 10px;
    button {
      padding: 10px 15px;
      width: 130px !important;
      height: 40px !important;
      img {
        margin: 0px !important;
      }
    }
  }

  #submit {
    margin: 8px 10px 0 0;
    button {
      height: 40px !important;
      color: ${({ theme }) => theme.palette.neutral[900]} !important;
      border: none !important;
      background-color: ${({ theme }) =>
        theme.palette.secondary[900]} !important;
      font-weight: 600;
    }
  }
`;

const BoxAndOr = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  #error {
    font-size: 14px;
    padding: 2px 1px 8px;
    color: red;
    font-weight: 600;
  }
`;
const BTNContainer = styled.div`
  background-color: ${({ theme }) => theme.palette.secondary[300]};
  width: 130px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  margin: 7px 0 0 10px;
`;

const ButtonFirst = styled.button<{ $operator: boolean }>`
  background-color: ${({ $operator, theme }) =>
    $operator ? theme.palette.secondary[900] : theme.palette.neutral[0]};
  border: none;
  cursor: pointer;
  border-radius: 0 24px 24px 0;
  width: 50px;
  margin: 0 1px;
  height: 44px;
  font-size: 23px;
  color: ${({ theme }) => theme.palette.neutral[600]};
`;
const ButtonSec = styled.button<{ $operator: boolean }>`
  background-color: ${({ $operator, theme }) =>
    $operator ? theme.palette.secondary[900] : theme.palette.neutral[0]};
  margin-left: -1px;
  border-top: none;
  border-bottom: none;
  border-right: 1px solid #757575;
  border-left: 1px solid #757575;
  cursor: pointer;
  border-radius: 0;
  width: 50px;
  font-size: 23px;
  height: 44px;
  color: ${({ theme }) => theme.palette.neutral[600]};
`;
const ButtonThird = styled.button<{ $operator: boolean }>`
  background-color: ${({ $operator, theme }) =>
    $operator ? theme.palette.secondary[900] : theme.palette.neutral[0]};
  margin: 0 2px 0 1px;
  border: none;
  cursor: pointer;
  border-radius: 24px 0 0 24px;
  width: 50px;
  height: 44px;
  font-size: 23px;
  color: ${({ theme }) => theme.palette.neutral[600]};
`;

const ButtonFMode = styled.button<{ $operator: boolean }>`
  background-color: ${({ $operator, theme }) =>
    $operator ? theme.palette.secondary[100] : "transparent"};
  border: none;
  cursor: pointer;
  border-radius: 0 16px 16px 0;
  width: 60px;
  margin: -4px 0 0;
  height: 40px;
  font-size: 23px;
  color: #000;
`;

const ButtonSMode = styled.button<{ $operator: boolean }>`
  background-color: ${({ $operator, theme }) =>
    $operator ? theme.palette.secondary[100] : "transparent"};
  margin: -4px 0 0 0;
  border: none;
  cursor: pointer;
  border-radius: 16px 0 0 16px;
  width: 60px;
  font-size: 23px;
  height: 40px;
  color: #000;
`;

const BoxShowItem = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid #ced3d9;
  margin: 2px 0px;
`;

const BoxFooterContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 0 10px;

  button {
    &:first-child {
      color: ${({ theme }) => theme.palette.primary[900]} !important;
      border: 1px solid ${({ theme }) => theme.palette.primary[900]} !important;
      background-color: ${({ theme }) => theme.palette.neutral[0]} !important;
      width: 112px !important;
      height: 38px !important;
      padding: 0 !important;
    }
    &:last-child {
      color: ${({ theme }) => theme.palette.neutral[0]} !important;
      border: 1px solid ${({ theme }) => theme.palette.primary[900]} !important;
      background-color: ${({ theme }) => theme.palette.primary[900]} !important;
      width: 112px !important;
      height: 38px !important;
      padding: 0 !important;
    }
  }
`;

const DivShowList = styled.div`
  .ItemAdded {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ${({ theme }) => theme.palette.neutral[300]} !important;
    width: 100%;
    margin: 5px 0;
    div {
      svg {
        &:first-child {
          path {
            fill: orange;
          }
        }
        &:last-child {
          path {
            fill: red;
          }
        }
      }
    }
  }
`;

const MainContainer = styled.div`
  margin: 10px 0;
  max-height: 350px;
  min-height: 100px;
`;
const DivList = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  width: 100%;
`;

export {
  ModalContainer,
  MainContainer,
  DivList,
  BoxHeader,
  BoxMain,
  BoxView,
  ModalContainerViewSpecifications,
  BoxClose,
  TextHeader,
  BoxCheckbox,
  BoxCard,
  BoxShowItem,
  BoxCheckboxChild,
  ModalContainerTable,
  BoxCardChildRes,
  BoxContainer,
  BoxFooter,
  BoxSelectAll,
  BoxCardChild,
  BoxEvaluContainer,
  BoxAndOr,
  ButtonFirst,
  ButtonSec,
  ButtonThird,
  BTNContainer,
  ButtonFMode,
  ButtonSMode,
  BoxFooterContainer,
  DivShowList,
};
