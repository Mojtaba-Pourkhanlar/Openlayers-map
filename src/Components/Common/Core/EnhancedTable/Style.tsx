import { styled } from "styled-components";
import Box from "../Box";
import Typography from "../Typography";

const StyledTableWrapper = styled.div`
  position: relative;
  max-height: 570px;
  scrollbar-width: none; /* For Firefox */
  scrollbar-color: ${({ theme }) =>
    `${theme.palette.neutral[300]} !important`}; /* For Firefox */

  overflow-x: auto !important;
  &::-webkit-scrollbar {
    height: 3px;
    display: none;
    width: 3px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 24px;
    background-color: ${({ theme }) => theme.palette.neutral[50]};
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar-button {
    margin-bottom: 10px;
  }
`;

const BoxHeaderSec = styled(Box)`
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 623px) {
    flex-direction: column;
    align-items: space-between;
    justify-content: space-between;
  }
`;
const StyledTable = styled.table`
  margin: 0px 0 125px;
  border-collapse: collapse;
  width: 100%;
  overflow: auto;
  opacity: 0;
  transform: translateY(-20px);
  transition: opacity 0.8s ease, transform 0.5s ease;

  &.fade-in {
    opacity: 1;
    transform: translateY(0);
  }
  &.fade-off {
    opacity: 1;
    transform: translateY(0);
  }
  thead {
    height: 48px;
    position: sticky;
    top: -1px;
    background-color: ${({ theme }) => theme.palette.neutral[50]};
    z-index: 1 !important;
    tr {
      td {
        font-size: 14px;
        text-align: center;
        cursor: pointer;
      }
    }
  }

  tbody {
    tr {
      height: 46px;
      font-size: 14px;
      border-width: 1px;
      border-color: ${({ theme }) => theme.palette.neutral[100]};
      border-right: none;
      border-left: none;
      &:nth-child(odd) {
        background-color: ${({ theme }) => theme.palette.neutral[0]};
      }
      &:nth-child(even) {
        background-color: ${({ theme }) => theme.palette.primary[50]};
      }
      &:hover {
        background-color: ${({ theme }) => theme.palette.neutral[200]};
        .isHover {
          background-color: ${({ theme }) => theme.palette.neutral[200]};
        }
      }
    }
    td {
      padding: 10px 0;
      text-align: center;
      color: ${({ theme }) => theme.palette.neutral[900]};
    }
  }
`;

const StyledPagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  direction: ltr;
  button {
    border: none;
    cursor: pointer;
    margin: 0 5px;
  }
`;

const StyledRecorde = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 1110px) {
    margin: 0 0 10px 0;
  }
  @media (max-width: 623px) {
    justify-content: space-between;
    width: 100%;
  }
`;
const TextRecorde = styled(Typography)`
  padding-top: 19px;
  color: ${({ theme }) => theme.palette.neutral[400]};
  font-size: 14px;
  @media (max-width: 768px) {
    width: 100px;
  }
`;

const SelectContainer = styled.div`
  width: 1px;
  height: 32px;
  margin: 0 12px;
  background: ${({ theme }) => theme.palette.secondary[200]};
`;

const THStyle = styled.th`
  background: #28405a;
  color: ${({ theme }) => theme.palette.neutral[0]};
  text-align: right;
  border-radius: 0 16px 0 0;
  & > div {
    margin-right: 10px;
  }
`;
const TDStyle = styled.td`
  background: #28405a;
  color: ${({ theme }) => theme.palette.neutral[0]};
  width: 80px;
`;

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5px;
`;

const THead = styled.td`
  &:last-child {
    height: 38px;
    position: sticky;
    border-collapse: collapse;
    background: #cde5e5;
    top: -2px;
    left: 0;
    cursor: no-drop;
  }
`;
const TBody = styled.td<{ $column: any; $index: number }>`
  &:last-child {
    background: ${({ $index }) => ($index % 2 === 1 ? "#F3F4F6" : "#fff")};
    position: ${({ $column }) =>
      $column?.id !== "actions" && "sticky !important"};
    border-collapse: ${({ $column }) =>
      $column?.id !== "actions" && "collapse !important"};
    top: ${({ $column }) => $column?.id !== "actions" && " -2px !important"};
    left: ${({ $column }) => $column?.id !== "actions" && " 0 !important"};
    box-shadow: 0px 0px 20px -13px #000;
    height: 40px;
    z-index: 0;
  }
`;
const TBodyImage = styled.tr<{ $isPoint: boolean }>`
  position: relative;
  height: 400px !important;
  & > td {
    position: absolute;
    background-color: transparent;
    top: 10px;
    left: 50%;
    transform: ${({ $isPoint }) =>
      $isPoint ? "translate(-50%, 10px)" : "translate(-40%, 10px)"};
    margin: 50px auto 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    & > p {
      color: ${({ theme }) => theme.palette.primary[900]};
      font-weight: 900;
      font-size: 22px;
      text-align: center;
      margin: ${({ $isPoint }) => ($isPoint ? "0" : "0 90px 0 0")};
    }
    & > div {
      width: ${({ $isPoint }) => ($isPoint ? "85%" : "45%")};
      margin: ${({ $isPoint }) => ($isPoint ? "0" : "0 90px 0 0")};
      height: 2px;
      background-color: #380808;
      box-shadow: 0px 8px 20px 1px #500202;
    }
  }

  &:hover {
    background-color: transparent !important;
  }
`;
export {
  StyledTableWrapper,
  StyledTable,
  StyledPagination,
  StyledRecorde,
  BoxHeaderSec,
  TextRecorde,
  SelectContainer,
  THStyle,
  TDStyle,
  PageContainer,
  THead,
  TBody,
  TBodyImage,
};
