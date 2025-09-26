import Box from "@/Components/Common/Core/Box";
import {
  GridContainerNew,
  GridItemNew,
} from "@/Components/Common/Core/Grid/New";
import styled from "styled-components";

export const Container = styled(GridContainerNew)`
  .detail {
    position: relative;
    border: 1px solid #ccc;
    /* height: 290px; */
    width: 100%;
    border-radius: 16px;
    & > .title {
      position: absolute;
      top: -18px;
      left: 41%;
      border-radius: 12px;
      border: 1px solid #ccc;
      padding: 5px 10px;
      background-color: #fff;
    }
    & > div {
      margin-top: 50px;
    }
  }
  & > div {
    margin-top: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
export const List = styled(Box)<{ $index: number }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 15px 0;
  background-color: ${({ $index }) => ($index % 2 === 0 ? " #ccc" : "#fff")};

  & > .name {
    font-size: 18px;
  }
  & > div > .span {
    color: #616161;
    padding: 3px 0 0 15px;
    font-size: 14px;
  }
`;
export const BoxChart = styled(Box)<{ $test: boolean }>`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 300px;

  .length {
    margin: 0;
    padding: 0;
    position: absolute;
    top: 120px;
    left: -20px;
    transform: rotate(-90deg);
    font-size: 16px;

    @media (max-width: 1780px) {
      left: -35px;
    }
    @media (max-width: 1580px) {
      left: -0px;
    }
  }
/* 
  & > div > div > div > svg > g > g:nth-child(2) {
    g:first-child > text {
      font-size: ${({ $test }) =>
        $test ? "13px !important" : "11px !important"};
      font-weight: 500 !important;
      font-family: Arial !important;
    }
  } */
`;
export const PNoData = styled.div`
  & > p {
    color: ${({ theme }) => theme.palette.primary[900]};
    font-weight: 900;
    font-size: 22px;
    text-align: center;
    margin: 20px 0 0 0;
  }
  & > div {
    width: 200px;
    margin: 20px 0 0 0;
    height: 2px;
    background-color: #380808;
    box-shadow: 0px 8px 20px 1px #500202;
  }
`;

export const ChartContainerStyle = styled.div`
  background: rgb(255, 255, 255);
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  border: 1px solid #cfcfd0;
`;

export const GridContainerNewStyle = styled(GridContainerNew)`
  margin: 0 -20px 0 0;
  @media (max-width: 1200px) {
    margin: 0 -14px 0 0;
  }
`;
export const GridItemNewStyle = styled(GridItemNew)`
  @media (max-width: 1200px) {
    padding: 0 15px 0 6px;
  }
`;
export const GridItemNewStyleSec = styled(GridItemNew)`
  @media (max-width: 1200px) {
    padding: 18px 15px 0 6px;
  }
`;
