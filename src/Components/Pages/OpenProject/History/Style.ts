import Box from "@/Components/Common/Core/Box";
import { BtnComponent } from "@/Components/Common/Core/Button";
import Select from "@/Components/Common/Core/Input/Select";
import TextField from "@/Components/Common/Core/Input/TextFaild";
import styled from "styled-components";

export const BoxTable = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 25px;
  @media (max-width: 1110px) {
    margin: -17px 0 15px 0;
  }
`;
export const BoxContainer = styled(Box)`
  margin: 0 0 15px;
`;
export const BoxBTNGroup = styled(Box)`
  margin: 0px 0 0 3px;
`;
export const BoxMain = styled(Box)`
  margin: 15px 0;
`;
export const BoxInputContainer = styled(Box)`
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
export const FileName = styled(TextField)`
  width: 289px;
  background: ${({ theme }) => theme.palette.neutral[0]};
  border-color: ${({ theme }) => theme.palette.neutral[300]};
`;
export const SelectFilter = styled(Select)`
  width: 200px !important;
  margin: 0 0 0 10px !important;
  @media (max-width: 768px) {
    margin: 10px 0 !important;
    width: 100% !important;
  }
`;
export const SelectFilterFormat = styled(Select)`
  width: 210px !important;
  margin: 0 0 0 10px !important;
  @media (max-width: 768px) {
    margin: 10px 0 !important;
    width: 100% !important;
  }
`;
export const Submit = styled(BtnComponent)`
  background-color: ${({ theme }) => theme.palette.primary[900]};
  color: ${({ theme }) => theme.palette.neutral[0]};
  width: 124px !important;
`;

export const DivDetail = styled.div`
  width: 350px;
  height: 500px;
  margin: 25px 0;
  border: 1px solid #a0a0a0;
  position: relative;
  border-radius: 0 12px 12px 0;
  overflow: auto;
`;

export const DivDetailBefore = styled.div`
  width: 350px;
  height: 500px;
  margin: 25px 0;
  position: relative;
  border-radius: 12px 0 0 12px;
  overflow: auto;
  border: 1px solid #a0a0a0;
  border-right: none;
`;
export const DivDetailMap = styled.div`
  width: 350px;
  height: 500px;
  margin: 25px 0;
  border: 1px solid #a0a0a0;
  position: relative;
  border-radius: 0;
  overflow: hidden;
`;
export const DivDetailMapContainer = styled.div`
  width: 350px;
  height: 235px;
  position: relative;
  border-radius: 0;
  overflow: hidden;
`;

export const Title = styled.p`
  text-align: center;
  border: 1px solid #a0a0a0;
  width: fit-content;
  position: absolute;
  top: -10px;
  left: 51%;
  transform: translate(-50%, 50%);
  background-color: ${({ theme }) => theme.palette.neutral[0]};
  padding: 5px 10px;
  border-radius: 12px;
  z-index: 1;
`;

export const MapDiv = styled.div`
  max-height: 465px;
  margin: 30px 0 0 3px;
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
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
`;
export const BoxView = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 2px 0 20px 0px;
  @media (max-width: 990px) {
    flex-direction: column;
    max-height: 600px;
    overflow-y: auto;
  }
`;

export const BoxCard = styled(Box)`
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
`;

export const BoxCardChild = styled(Box)<{ $index: number }>`
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: column;
  width: 150px;
  padding: 9px 0;
  color: ${({ theme }) => theme.palette.neutral[600]};
  /* border-radius: ${({ $index }) =>
    $index === 0 ? "12px 12px 0 0" : $index === 15 ? "0 0 12px 12px" : "0"}; */
  background-color: ${({ theme, $index }) => theme.palette.neutral[100]};

  @media (max-width: 480px) {
    width: 120px;
  }
`;

export const BoxCardChildRes = styled(Box)<{ $color: string }>`
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: column;
  padding: 7px 0;
  width: calc(100% - 160px);
  background-color: ${({ theme, $color }) => $color ?? "transparent"};

  @media (max-width: 480px) {
    width: calc(100% - 120px);
  }
`;

export const BoxShowItem = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid #ced3d9;
  padding: 2px 0px;
  cursor: pointer;
`;

export const BoxMoltiPoint = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 74vh;
  margin-top: 30px;
  @media (min-height: 700px) {
    height: 75vh;
  }
  @media (min-height: 750px) {
    height: 77vh;
  }
  @media (min-height: 800px) {
    height: 78vh;
  }
  @media (min-height: 850px) {
    height: 80vh;
  }
`;

export const MapContainer = styled(Box)`
  position: relative;
`;
export const BoxText = styled(Box)`
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  & > p:first-child {
    margin: 0;
    width: 80px;
  }
  & > p:last-child {
    margin: 0 10px 0 0;
    text-decoration-line: line-through;
    color: #c0c2c5;
  }
`;
