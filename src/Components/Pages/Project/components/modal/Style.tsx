import { ReactComponent as Close } from "@/assets/svg/closeAll.svg";
import { ReactComponent as Delete } from "@/assets/svg/deleteMap.svg";
import Box from "@/Components/Common/Core/Box";
import { BtnComponent } from "@/Components/Common/Core/Button";
import Checkbox from "@/Components/Common/Core/Input/Checkbox";
import Select from "@/Components/Common/Core/Input/Select";
import TextField from "@/Components/Common/Core/Input/TextFaild";
import Typography from "@/Components/Common/Core/Typography";
import { styled } from "styled-components";

const FileName = styled(TextField)`
  width: 250px;
  background: ${({ theme }) => theme.palette.neutral[0]};
  border-color: ${({ theme }) => theme.palette.neutral[300]};
`;
const CheckboxRadio = styled(Checkbox)`
  .form-check-input[type="radio"] {
    width: 16px !important;
    height: 16px !important;
  }
`;
const BoxContainer = styled(Box)`
  margin: 25px 0 15px;
`;
const BoxMain = styled(Box)`
  margin: 15px 0;
`;
const CloseIcon = styled(Close)`
  & > path {
    fill: black;
  }
`;
const DeleteIcon = styled(Delete)`
  width: 20px;
  height: 20px;
  & > path {
    fill: ${({ theme }) => theme.palette.red.dark};
  }
`;

const DivInput = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  /* border-bottom: 1px solid ${({ theme }) => theme.palette.primary[500]}; */
  padding: 10px 18px;
  /* border-radius: 18px; */
`;

const BoxHeader = styled(Typography)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 15px 20px 10px;
  background-color: ${({ theme }) => theme.palette.primary[900]};
  border-radius: 24px 24px 0 0;
`;
const TextState = styled(Typography)`
  font-size: 14px;
  margin: 0 0 0 10px;
  color: ${({ theme }) => theme.palette.neutral[900]};
`;
const Text = styled(Typography)`
  font-size: 15px;
  color: ${({ theme }) => theme.palette.neutral[900]};
  font-weight: 700;
  white-space: nowrap;
`;
const TextHeader = styled(Box)`
  font-size: 16px;
  color: ${({ theme }) => theme.palette.neutral[0]};
  margin: 0;
`;
const BoxInput = styled(Box)`
  width: 250px;
  /* display: flex; */
  & > p {
    margin: 0;
    padding: 0;
    font-size: 14px;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    width: 100% !important;
  }
`;
const BoxSelectAndInput = styled(Box)`
  display: flex;
  align-items: start;
  justify-content: space-between;
  margin-right: 10px;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;
const BoxCheckbox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: start;
  margin-top: 15px;
`;
const CheckboxC = styled(Box)`
  display: flex;
  align-items: center;
  margin: 15px;
  width: 289px;
  @media (max-width: 768px) {
    width: 100% !important;
  }
`;
const BoxRadio = styled(Box)`
  display: flex;
  align-items: center;
`;
const Radio = styled(Box)`
  display: flex;
  align-items: center;
  margin: 5px;
`;
const RadioText = styled(Typography)`
  margin: 0 2px;
  font-size: 14px;
  padding-top: 3px;
`;
const Submit = styled(BtnComponent)`
  background-color: ${({ theme }) => theme.palette.primary[900]};
  color: ${({ theme }) => theme.palette.neutral[0]};
  width: 124px !important;
`;

const SelectStyle = styled(Select)`
  width: 160px !important;
  @media (max-width: 768px) {
    width: 100% !important;
  }
`;
const SelectFilter = styled(Select)`
  margin: 0 !important;
  width: 200px !important;
  @media (max-width: 768px) {
    margin: 10px 0 !important;
    width: 100% !important;
  }
`;
const SelectStyleSec = styled(Select)`
  margin: 0 !important;
  width: 250px !important;
  @media (max-width: 768px) {
    margin: 10px 0 !important;
    width: 100% !important;
  }
`;
const BoxClose = styled(Box)`
  border: 1px solid ${({ theme }) => theme.palette.neutral[200]};
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const TextAria = styled.textarea`
  margin: 10px 0 0;
  display: flex;
  width: 100%;
  height: 146px;
  max-height: 146px;
  padding: 12px 12px 10px 12px;
  justify-content: center;
  align-items: flex-start;
  border-radius: 24px;
  border: 1px solid ${({ theme }) => theme.palette.neutral[200]};
  background: ${({ theme }) => theme.palette.neutral[0]};
`;

const BoxInputContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  gap: 20px;

  @media (max-width: 420px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

export const TableHead = styled.thead`
  background-color: #f2f2f2;
`;

export const TableRow = styled.tr`
  border-bottom: 1px solid #ddd;
`;

export const TableCell = styled.td`
  padding: 5px 0;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 24px;
`;

export const TableHeaderCell = styled.th`
  padding: 7px 0;
  background-color: #0b233f;
  color: white;
  text-align: center;
  font-size: 13px;
`;

export const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  color: red;
  cursor: pointer;
  &:hover {
    color: darkred;
  }
`;

export const DivUpload = styled.div`
  & > .alert {
    background: ${({ theme }) => theme.palette.neutral[200]};
    color: ${({ theme }) => theme.palette.primary[900]};
    margin-top: 20px;
    font-weight: 600;
    font-size: 14px;
    display: flex;
    align-items: center;
  }

  & > .main {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    margin-top: 50px;

    & > span {
      width: 100%;
      color: ${({ theme }) => theme.palette.red.main};
      text-align: center;
      margin: 15px 0 0 0;
      font-weight: 700;
      font-size: 17px;
    }

    & > div {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 170px;
      height: 170px;
      background: ${({ theme }) => theme.palette.neutral[200]};
      color: ${({ theme }) => theme.palette.primary[900]};
      border-radius: 16px;

      & > svg {
        width: 100px;
        height: 100px;
        margin-left: 10px;
        margin-top: 15px;
      }

      & > p {
        margin: 15px 0 0 0;
        font-weight: 700;
        font-size: 18px;
      }

      &:hover {
        background: ${({ theme }) => theme.palette.neutral[300]};
        cursor: pointer;
      }
    }

    & .Uploaded {
      position: relative;

      & > span {
        position: absolute;
        top: -10px;
        left: -10px;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: #a80000;
        display: flex;
        justify-content: center;
        align-items: center;
        & > svg > path {
          fill: white;
        }
      }
    }
  }

  & > .footer {
    display: flex;
    justify-content: end;
    align-items: center;
    margin-top: 50px;
  }
`;

export {
  BoxCheckbox,
  BoxClose,
  BoxContainer,
  BoxHeader,
  BoxInput,
  BoxInputContainer,
  BoxMain,
  BoxRadio,
  BoxSelectAndInput,
  CheckboxC,
  CheckboxRadio,
  CloseIcon,
  DeleteIcon,
  DivInput,
  FileName,
  Radio,
  RadioText,
  SelectFilter,
  SelectStyle,
  SelectStyleSec,
  Submit,
  Text,
  TextAria,
  TextHeader,
  TextState,
};
