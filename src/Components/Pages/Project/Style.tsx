import Box from "@/Components/Common/Core/Box";
import { BtnComponent } from "@/Components/Common/Core/Button";
import Select from "@/Components/Common/Core/Input/Select";
import { keyframes, styled } from "styled-components";
import TextFaild from "@/Components/Common/Core/Input/TextFaild";

const BoxHeader = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 36px;
`;

const AddIcon = styled.div`
  border-radius: 31px;
  background: ${({ theme }) => theme.palette.secondary[300]};
  padding: 6px;
  margin: 0px 8px 0;
  flex-shrink: 0;
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

const BoxBtn = styled(Box)`
  display: flex;
  align-items: center;
  @media (max-width: 623px) {
    display: none;
  }
`;
const BoxSelect = styled(Box)`
  display: none;
  @media (max-width: 623px) {
    display: flex;
  }
`;
const BoxTable = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100% !important;

  @media (max-width: 623px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
const BoxList = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100% !important;
  margin-top: "";

  @media (max-width: 623px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
const BtnUpload = styled(BtnComponent)<{ $isactive: boolean }>`
  color: ${({ $isactive, theme }) =>
    $isactive
      ? theme.palette.neutral[300]
      : theme.palette.primary[900]} !important;
  background: ${({ theme }) => theme.palette.secondary[300]} !important;
  font-size: 14px !important;
  margin: 0 10px !important;
  width: 45px !important;
  div > svg > path {
    fill: ${({ $isactive, theme }) =>
      $isactive
        ? theme.palette.neutral[300]
        : theme.palette.primary[900]} !important;
    stroke: ${({ $isactive, theme }) =>
      $isactive
        ? theme.palette.neutral[300]
        : theme.palette.primary[900]} !important;
  }
`;
const BtnDownload = styled(BtnComponent)`
  background: ${({ theme }) => theme.palette.secondary[300]};
  font-size: 14px;
  color: ${({ theme }) => theme.palette.primary[900]} !important;
  width: 45px !important;
`;
const BtnDelete = styled(BtnComponent)<{ $isactive: boolean }>`
  color: ${({ $isactive, theme }) =>
    $isactive
      ? theme.palette.neutral[300]
      : theme.palette.primary[900]} !important;
  background: ${({ theme }) => theme.palette.secondary[300]} !important;
  width: 45px !important;
  font-size: 14px !important;
`;
const SelectStyle = styled(Select)`
  margin-top: -10px;
  width: 160px;
`;

const ProjectPage = styled(Box)`
  display: flex;
  align-items: center;
  width: 280px;
  margin-right: 20px;
`;
const ProjectPageName = styled.h1`
  font-size: 25px;
  color: ${({ theme }) => theme.palette.primary[900]};
  font-weight: 700;
  text-shadow: #888787 1px 0 10px;
`;
const BtnUploadFile = styled(BtnComponent)`
  font-size: 14px;
  background: ${({ theme }) => theme.palette.secondary[300]};
  color: ${({ theme }) => theme.palette.primary[900]} !important;
`;
const ActionSelect = styled(Select)`
  margin-top: -10px !important;
  width: 170px !important;
`;
const SearchInput = styled(TextFaild)`
  margin: 0 0 0 8px !important;
  background: ${({ theme }) => theme.palette.neutral[0]};
  border-color: ${({ theme }) => theme.palette.neutral[200]};
  width: 270px !important;
`;
const BtnFilter = styled(BtnComponent)`
  font-size: 14px;
  background: ${({ theme }) => theme.palette.secondary[300]};
  color: ${({ theme }) => theme.palette.primary[900]} !important;
  width: 92px !important;
  margin: -8px 0 0 8px !important;
  height: 48px !important;
`;
const BtnProject = styled(BtnComponent)`
  font-size: 14px;
  background: ${({ theme }) => theme.palette.secondary[300]};
  color: ${({ theme }) => theme.palette.primary[900]} !important;
  width: 45px !important;
  margin: -13px 8px 0 0 !important;
  height: 48px !important;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(20px);
  }
`;

const AnimatedBox = styled.div<{ isVisible: boolean }>`
  animation: ${({ isVisible }) => (isVisible ? fadeIn : fadeOut)} 0.5s
    ease-in-out forwards;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  padding: 30px;
  box-sizing: border-box;
  background-color: #F6F6F6;
  height: 70vh;
  overflow: auto;
  /* box-shadow: 0px 4px 13px 0px rgba(0, 0, 0, 0.25); */
  border-radius: 16px;

  &::-webkit-scrollbar {
    height: 3px;
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 24px;
    background-color: #888888;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  /* &::-webkit-scrollbar-button {
    margin: 10px;
  } */

  @media (max-width: 1330px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 1010px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
  @media (min-width: 1440px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (min-width: 1650px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

export {
  BoxHeader,
  AddIcon,
  BoxHeaderSec,
  BoxBtn,
  BoxSelect,
  BtnUpload,
  BtnDownload,
  BtnDelete,
  SelectStyle,
  BoxTable,
  ProjectPage,
  ProjectPageName,
  BtnUploadFile,
  ActionSelect,
  SearchInput,
  BtnFilter,
  BtnProject,
  BoxList,
  AnimatedBox,
  CardGrid,
};
