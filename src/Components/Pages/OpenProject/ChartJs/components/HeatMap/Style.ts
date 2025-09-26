import { BtnComponent } from "@/Components/Common/Core/Button";
import styled from "styled-components";

export const HeatMapContainer = styled.div<{
  $dividerRatio: number;
  $isDragging: boolean;
  $counts: any;
}>`
  display: flex;
  align-items: start;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;

  .canvasContainer {
    position: relative;
    width: 100%;
    margin: 7px 0;
    user-select: none;

    .LeftCounter {
      position: absolute;
      top: -10px;
      font-size: 13px;
      font-weight: bolder;
      left: ${({ $counts, $dividerRatio }) =>
        String($counts.left).length > 1
          ? `calc(${$dividerRatio * 100}% - 35px)`
          : `calc(${$dividerRatio * 100}% - 25px)`};
    }

    .RightCounter {
      position: absolute;
      top: -10px;
      font-size: 13px;
      font-weight: bolder;
      left: ${({ $dividerRatio }) => `calc(${$dividerRatio * 100}% - -15px)`};
    }

    .main {
      background: transparent;
      position: relative;
      z-index: 1000;
      width: 100%;

      & > canvas {
        display: block;
        z-index: 150;
        width: 100%;
        height: 60px;
        aspect-ratio: unset;
      }

      & > .bgCanvas {
        position: absolute;
        top: 20px;
        right: 0;
        background: #ccc;
        border: 1px solid #9e9e9e;
        width: 100%;
        height: 40px;
        z-index: -1;
      }

      & > .ArrowLeft {
        position: absolute;
        top: 20px;
        color: blue;
        cursor: pointer;
        z-index: -1;
      }

      & > .lineContainer {
        position: absolute;
        top: 0;
        left: ${({ $dividerRatio }) => `${$dividerRatio * 100}%`};
        height: 100%;
        width: 2px;
        display: flex;
        flex-direction: column;
        align-items: center;

        & > .circleBlack {
          width: 18px;
          height: 18px;
          background: black;
          border-radius: 50%;
          cursor: ${({ $isDragging }) => ($isDragging ? "grabbing" : "grab")};
        }
        & > .line {
          height: 68%;
          width: 2px;
          background: black;
        }
      }
    }

    .currentPoint {
      position: absolute;
      top: 62px;
      left: ${({ $dividerRatio }) => `calc(${$dividerRatio * 100}% - 18px)`};
      font-weight: bolder;
      font-size: 13px;
      background: #fff;
      z-index: 100;
    }

    & > .hrmsMin {
      position: absolute;
      top: 60px;
      left: 0;
      font-weight: bolder;
      font-size: 12px;
    }
    & > .hrmsMax {
      position: absolute;
      top: 60px;
      right: 0;
      font-weight: bolder;
      font-size: 12px;
    }
  }

  @media (max-width: 1700px) {
    flex-direction: column;
    align-items: start;
  }
`;
export const BTNMap = styled(BtnComponent)`
  background: transparent;
  /* background: ${({ theme }) => theme.palette.secondary[800]}; */
  color: ${({ theme }) => theme.palette.primary[900]} !important;
  font-size: 14px;
  width: 40px !important;
  height: 40px !important;
  border-radius: 12px !important;
`;
export const MapContainer = styled.div<{
  $isHeight: number;
  $currentMode: string;
}>`
  position: relative;
  .popupMain {
    height: ${({ $isHeight }) => ($isHeight ? `${$isHeight}px` : "500px")};
  }
  .mapLable {
    background: rgba(0, 0, 0, 0.6);
    border-radius: 5px;
    padding: 2px 5px;
    position: absolute;
    top: 5px;
    right: 5px;
    height: auto;
    width: ${({ $currentMode }) =>
      $currentMode === "systems" || $currentMode === "loggingMode"
        ? "140px"
        : "100px"};

    & > .lable {
      display: flex;
      align-items: center;
      justify-content: end;

      & > p {
        color: #fff;
        margin: 0;
        padding: 2px 0 0 0;
      }

      & > div {
        width: 20px;
        height: 20px;
      }
    }
  }
`;
