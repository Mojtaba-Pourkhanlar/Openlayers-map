import Box from "@/Components/Common/Core/Box";
import { BtnComponent } from "@/Components/Common/Core/Button";
import Select from "@/Components/Common/Core/Input/Select";
import TextFaild from "@/Components/Common/Core/Input/TextFaild";
import Typography from "@/Components/Common/Core/Typography";
import { selectPoint } from "@/Constants";
import loc from "@/assets/png/newPoint.png";
import { ReactComponent as Bottom } from "@/assets/svg/bottom.svg";
import { ReactComponent as Menu } from "@/assets/svg/menu.svg";
import { Fill, Icon, Stroke, Style } from "ol/style";
import CircleStyle from "ol/style/Circle";
import { styled } from "styled-components";

const BoxTable = styled(Box)`
  display: flex;
  margin: -7px 0 0 0;
  @media (max-width: 1110px) {
    margin: -17px 0 0 0;
  }

`;
const BoxBtnTooltip = styled(Box)`
  display: flex;
  align-items: center;
  margin: 0 10px 14px 0;
  width: 152px;
  justify-content: space-between;
`;

const BoxSM = styled(Box)`
  display: block;
  margin-top: 16px;
`;

const BoxBTNGroup = styled(Box)`
  margin: -3px 0 -6px 3px;
`;

const BoxHeader = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// Openlayers Style:
export const defaultStyle = new Style({
  image: new Icon({
    src: loc,
    anchor: [0.5, 0.8],
    width: 14,
  }),
  stroke: new Stroke({
    color: "blue",
    width: 2,
  }),
  fill: new Fill({
    color: "rgba(0, 0, 255, 0.1)",
  }),
});

const pointStyle = (icon: any) => {
  const getPointStyle: string | any = localStorage.getItem("custom-point");
  return new Style({
    fill: new Fill({
      color: "rgba(255, 176, 32, 0.5)",
    }),
    stroke: new Stroke({
      color: "#FFB020",
      width: 3,
    }),
    image: new CircleStyle({
      radius: 7,
      fill: new Fill({ color: "#FFB020" }),
      stroke: new Stroke({ color: "black", width: 1 }),
    }),
  });
};

const pointStyleCustom = ({ isType }: { isType: boolean }) => {
  return new Style({
    stroke: new Stroke({
      color: "#ff8420",
      width: 2,
    }),
    fill: new Fill({
      color: "rgba(90, 152, 219, 0.8)",
    }),
    image: new CircleStyle({
      radius: 5,
      stroke: new Stroke({
        color: isType ? "#ff2020" : "#00ff2a",
      }),
      fill: new Fill({
        color: isType ? "#ff2020" : "#00ff2a",
      }),
    }),
  });
};

const lineStyle = new Style({
  stroke: new Stroke({
    color: "#5AC4B4",
    width: 2,
  }),
  fill: new Fill({
    color: "rgba(90, 152, 219, 0.1)",
  }),
});
const pointNewStyle = new Style({
  image: new CircleStyle({
    radius: 5,
    stroke: new Stroke({
      color: "rgba(0, 0, 0)",
    }),
    fill: new Fill({
      color: "rgba(0, 0, 0)",
    }),
  }),
});
const lineStyleMeasure = new Style({
  stroke: new Stroke({
    color: "#dfbe02",
    width: 2,
  }),
  fill: new Fill({
    color: "#dfbe02",
  }),
});

const measurelineStyle = new Style({
  stroke: new Stroke({
    color: "#2094FF",
    width: 2,
  }),
  fill: new Fill({
    color: "rgba(90, 152, 219, 0.1)",
  }),
  image: new CircleStyle({
    radius: 5,
    stroke: new Stroke({
      color: "#2094FF",
    }),
    fill: new Fill({
      color: "#2094FF",
    }),
  }),
});

const polygonStyle = new Style({
  fill: new Fill({
    color: "rgba(90, 152, 219, 0.1)",
  }),
  stroke: new Stroke({
    color: "#2094FF",
    width: 2,
  }),
});

const circleStyleD = new Style({
  fill: new Fill({
    color: "rgba(255, 0, 0, 0.1)",
  }),
  stroke: new Stroke({
    color: "red",
    width: 2,
  }),
});

//.............
const BoxIcon = styled(Box)<{ isbgcolor: string }>`
  background-color: ${({ isbgcolor, theme }) =>
    isbgcolor === "true" ? theme.palette.secondary[300] : "transparent"};
  padding: 4px 6px;
  border-radius: 10px;
  cursor: pointer;
  margin-right: 10px;
`;
const BaxControl = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: end;
  flex-direction: row-reverse;
`;

const BoxLayer = styled(Box)<{ open: boolean }>`
  background-color: ${({ theme }) => theme.palette.neutral[0]};
  color: ${({ theme }) => theme.palette.neutral[900]};
  width: 242px;
  height: ${({ open }) => (open ? "192px" : "48px")};
  border-radius: 24px;
  padding: 12px;
  transition: height 0.4s ease;
  box-shadow: 0px 4px 13px 0px rgba(0, 0, 0, 0.25);

  @media (max-width: 834px) {
    width: 150px;
  }

  @media (max-width: 600px) {
    width: ${({ open }) => (open === true ? "192px" : "40px")};
    height: ${({ open }) => (open === true ? "192px" : "40px")};
    padding: 8px 7px 8px 8px;
    transition: width ${({ open }) => (open ? "0.1s" : "0.9s")} ease,
      height ${({ open }) => (open ? "0.9s" : "0.1s")} ease;
  }
`;

const BoxInput = styled(Box)`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const BoxInputTest = styled(Box)`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const BoxInputDetail = styled(Box)<{ open: boolean }>`
  opacity: ${({ open }) => (open ? "1" : "0")};
  cursor: pointer;
  flex-direction: column;
  justify-content: space-between;
  align-items: space-between;
  transition: opacity 0.7s ease;
`;
const LayerStyle = styled(Box)`
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 1;

  @media (max-width: 600px) {
    top: 6px;
    right: 5px;
  }
`;
const DrawerStyle = styled(Box)`
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 1;

  @media (max-width: 600px) {
    top: 5px;
    left: 7px;
  }
`;
const ShowItemsStyle = styled(Box)<{ $isColumn: boolean }>`
  display: flex;
  flex-direction: ${({ $isColumn }) => ($isColumn ? "column" : "row-reverse")};
  align-items: center;

  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ShowAlertStyle = styled.p<{ $show: boolean }>`
  display: ${({ $show }) => ($show ? "flex" : "none")};
  position: absolute;
  top: 70px;
  left: 30px;
  background-color: ${({ theme }) => theme.palette.yellow.light};
  color: ${({ theme }) => theme.palette.yellow.dark};
  z-index: 100;
  padding: 10px 20px;
  border-radius: 0 10px 10px 10px;
  font-weight: 600;

  @media (max-width: 1200px) {
    border-radius: 10px;
    top: 30px;
    left: 80px;
  }
`;

const Hr = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.palette.secondary[500]};
  margin: 16px 0;
`;
const TextStyle = styled(Typography)`
  font-size: 14px;
  margin: 0 12px;
`;
export const TextLayerStyle = styled(Typography)<{ $isOpen: boolean }>`
  font-size: 14px;
  margin: 0 12px;

  @media (max-width: 600px) {
    display: ${({ $isOpen }) => ($isOpen ? "flex" : "none")};
  }
`;
export const ShowDesktop = styled(Box)`
  display: flex;
  @media (max-width: 600px) {
    display: none;
  }
`;
export const BoxNameCoordinate = styled(Box)`
  display: flex;
  align-items: center;
  @media (max-width: 600px) {
    justify-content: start;
  }
`;
const BoxName = styled(Box)`
  display: flex;
  align-items: center;
`;
const MenuIcon = styled(Menu)`
  path {
    fill: ${({ theme }) => theme.palette.neutral[900]};
    stroke: ${({ theme }) => theme.palette.neutral[900]};
  }
`;
const BottomIcon = styled(Bottom)`
  width: 24px;
  height: 24px;
  path {
    fill: ${({ theme }) => theme.palette.neutral[900]};
    stroke: ${({ theme }) => theme.palette.neutral[900]};
  }
`;
const BoxIconMap = styled(Box)`
  width: 216px;
  height: 48px;
  border-radius: 24px;
  background: ${({ theme }) => theme.palette.neutral[0]};
  box-shadow: 0px 4px 13px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  bottom: 16px;
  left: 16px;
  z-index: 100;
  padding: 0 16px;
  cursor: pointer;

  @media (max-width: 600px) {
    width: 160px;
    height: 32px;
    border-radius: 24px;
    bottom: 10px;
    left: 6px;
    padding: 0 6px;
  }
`;

const Plus = styled.span`
  position: absolute;
  left: 8.5px;
  bottom: 5.5px;
`;

const MapIconContainer = styled.div<{ open: boolean }>`
  background: ${({ open, theme }) =>
    open === true ? theme.palette.secondary[300] : "transparent"};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 5px;
`;

const MapBox = styled.div<{ open: boolean; cursor: string }>`
  position: relative;
  width: 100%;
  height: calc(100vh - 165px);
  overflow: hidden;
  cursor: ${({ cursor }) =>
    cursor === "Circle" ||
    cursor === "Polygon" ||
    cursor === "LineString" ||
    cursor === "Point" ||
    cursor === "circleThreePoint"
      ? "crosshair"
      : ""};
  canvas {
    border-radius: 16px;
  }
  .ol-viewport {
    .ol-overlaycontainer-stopevent {
      .ol-control {
        display: none;
      }
      .ol-zoom {
        display: none;
      }
      .ol-rotate {
        .ol-rotate-reset {
          display: none;
        }
      }
      .custom-rotate-control {
        .custom-rotate-control-reset {
          display: none;
        }
      }
      .ol-attribution {
        display: none;
      }
      .custom-fullscreen-control {
        button {
          display: none;
        }
      }
    }
  }
`;

const TableSetting = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: -7px 0 0 0;
  @media (max-width: 1110px) {
    margin: -17px 0 0 0;
  }
`;

const BoxBTN = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
const BoxBTNSec = styled(Box)`
  margin-top: 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  @media (max-width: 790px) {
    display: none;
  }
`;
const BoxBTNSecXS = styled(Box)`
  margin-top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  @media (min-width: 790px) {
    display: none;
  }
`;

const TableSelectSM = styled(Select)`
  margin: 0;
  white-space: nowrap;
  width: 162px !important;
  @media (max-width: 790px) {
    width: 97% !important;
  }
  @media (max-width: 390px) {
    font-size: 12px;
  }
`;

const TableSettingSM = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  @media (max-width: 790px) {
    flex-direction: column;
  }
  @media (min-width: 1111px) {
    display: none;
  }
`;

const SearchInput = styled(TextFaild)`
  margin: 2px 0 -10px 0px;
  background: ${({ theme }) => theme.palette.neutral[0]};
  border-color: ${({ theme }) => theme.palette.neutral[200]};
  width: 250px !important;
  @media (max-width: 768px) {
    width: 180px !important;
  }
  @media (max-width: 908px) {
    width: 180px !important;
  }
`;
const BTNFilter = styled(BtnComponent)`
  margin: 0 15px -4px 8px;
  background: ${({ theme }) => theme.palette.secondary[300]};
  color: ${({ theme }) => theme.palette.primary[900]} !important;
  font-size: 14px;
  display: flex;
  width: 90px !important;
  padding: 0 10px !important;
  height: 44px !important;
  p {
    width: max-content;
  }
  @media (max-width: 768px) {
    margin: -7px 0 0 0px;
  }
`;
const BTNAssessment = styled(BtnComponent)`
  margin: 0 15px -2px 8px;
  background: ${({ theme }) => theme.palette.secondary[300]};
  color: ${({ theme }) => theme.palette.primary[900]} !important;
  font-size: 14px;
  display: flex;
  width: 150px !important;
  padding: 0 10px !important;
  height: 48px !important;
  p {
    width: max-content;
  }
  @media (max-width: 768px) {
    margin: -7px 0 0 0px;
  }
`;
const BTNSetting = styled(BtnComponent)`
  background: ${({ theme }) => theme.palette.secondary[300]};
  color: ${({ theme }) => theme.palette.primary[900]} !important;
  font-size: 14px;
  width: 45px !important;
`;
const BTNSettingXS = styled(BtnComponent)`
  margin-top: 0px;
  background: ${({ theme }) => theme.palette.secondary[300]};
  color: ${({ theme }) => theme.palette.primary[900]} !important;
  padding: 12px 0;
  font-size: 14px;
  width: 195px;
  @media (max-width: 390px) {
    font-size: 13px;
  }
`;

const TableSelect = styled(Select)`
  margin: 0 8px 0 0;
  width: 162px !important;
  white-space: nowrap;
`;
const BtnPoint = styled(BtnComponent)`
  background: ${({ theme }) => theme.palette.secondary[100]};
  color: ${({ theme }) => theme.palette.neutral[400]} !important;
  border-radius: 24px;
  width: 98px !important;
  height: 32px !important;
  @media (max-width: 368px) {
    width: 70px !important;
  }
`;
const BtnPointContainer = styled(Box)`
  margin-top: -18px;
  margin-right: 8px;
`;
const NameProject = styled(Box)`
  display: flex;
  align-items: center;
  background: #deeff7;
  border-radius: 14px;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.25);
  padding: 8px 20px;
  border: 1px solid #ccc;
  @media (max-width: 768px) {
    padding: 25px 0 0 0;
  }
`;
const Header = styled(Box)`
  margin: 15px 0 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
// Tile
const BoxClose = styled(Box)`
  position: absolute;
  top: 12px;
  left: -13px;
  cursor: pointer;
  background: ${({ theme }) => theme.palette.neutral[0]};
  border-radius: 24px;
  box-shadow: 0px 4px 13px 0px rgba(0, 0, 0, 0.25);
`;
const BoxOpen = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 5px 5px 0;
  background: ${({ theme }) => theme.palette.neutral[0]};
  height: 48px;
  width: 48px;
  border-radius: 24px;
  cursor: pointer;

  @media (max-width: 600px) {
    background: transparent;
    padding: 0px 0px 12px 10px;
    width: 28px;
    height: 28px;
  }
`;
const BoxTile = styled(Box)<{ $show: boolean }>`
  border-radius: 24px;
  background: ${({ theme }) => theme.palette.neutral[0]};
  box-shadow: 0px 4px 13px 0px rgba(0, 0, 0, 0.25);
  width: ${({ $show }) => ($show ? "302px" : "48px")};
  transition: width 0.5s ease;
  display: flex;
  height: 48px;
  align-items: center;

  @media (max-width: 600px) {
    width: 40px;
    justify-content: space-between;
    flex-direction: column-reverse;

    height: ${({ $show }) => ($show ? "305px" : "40px")};
    transition: height 0.5s ease;
    align-items: end;
  }
`;
const BoxTextTile = styled(Box)<{ $show: boolean }>`
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  display: ${({ $show }) => ($show ? "flex" : "none")};
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 1px 10px 0px;
  width: 100%;
  position: relative;
  transition: opacity 0.7s ease;

  @media (max-width: 600px) {
    height: 100%;
    padding: 10px 3px;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;
  }
`;

const TextTile = styled(Typography)<{ $active: boolean }>`
  font-size: 16px;
  margin: 0 !important;
  border-radius: 18px;
  background: ${({ $active, theme }) =>
    $active ? theme.palette.secondary[300] : "transparent"};
  padding: 3px 7px 0;

  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

const TileStyle = styled(Box)`
  position: absolute;
  bottom: 16px;
  right: 16px;
  z-index: 1;

  @media (max-width: 600px) {
    bottom: 6px;
    right: 6px;
  }
`;
const BoxInputContainer = styled(Box)`
  display: flex;
  align-items: center;
  position: relative;

  @media (max-width: 600px) {
    display: none;
  }
`;

export const BoxTileContainer = styled(Box)<{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 8px 0;

  img {
    width: 33px;
    height: 33px;
    border-radius: 12.5px;
    border: ${({ $active }) => ($active ? "2px solid red" : "none")};
  }
  p {
    background: "";
    margin: 0;
    padding: 0;
    font-size: 12px;
  }

  @media (min-width: 600px) {
    img {
      display: none;
    }
    p {
      font-size: 16px;
      margin: 0 !important;
      border-radius: 18px;
      background: ${({ $active, theme }) =>
        $active ? theme.palette.secondary[300] : "transparent"};
      padding: 3px 7px 0;
    }
  }
`;

export const BoxInputContainerSMNEW = styled(Box)`
  display: flex;
  align-items: center;
  position: relative;
  direction: ltr;
  @media (min-width: 600px) {
    display: none;
  }
`;

const BoxSearch = styled(Box)<{ $show: boolean }>`
  margin-right: 10px;
  z-index: 0;
  border-radius: 24px;
  background: ${({ theme }) => theme.palette.neutral[0]};
  box-shadow: 0px 4px 13px 0px rgba(0, 0, 0, 0.25);
  height: 48px;
  width: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  @media (max-width: 600px) {
    display: none;
  }
`;
export const BoxSearchSMNEW = styled(Box)<{ $show: boolean }>`
  position: absolute;
  left: 10px;
  top: 5px;
  z-index: 10;
  border-radius: 24px;
  background: ${({ $show, theme }) => ($show ? "" : theme.palette.neutral[0])};
  box-shadow: ${({ $show }) =>
    $show ? "" : "0px 4px 13px 0px rgba(0, 0, 0, 0.25)"};
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  @media (min-width: 600px) {
    display: none;
  }
`;
const InputTextSearch = styled(Box)<{ $show: boolean }>`
  background: ${({ theme }) => theme.palette.neutral[0]};
  box-shadow: 0px 4px 13px 0px rgba(0, 0, 0, 0.25);
  width: ${({ $show }) => ($show ? "240px" : "0")};
  transition: width 0.5s ease;
  z-index: ${({ $show }) => ($show ? "1" : "0")};
  border-radius: 24px;
  height: 48px;
  margin-right: 10px;

  @media (max-width: 600px) {
    width: ${({ $show }) => ($show ? "78%" : "0")};
    z-index: ${({ $show }) => ($show ? "1" : "0")};
    transition: width ${({ $show }) => ($show ? "0.9s" : "0.1s")} ease,
      z-index ${({ $show }) => ($show ? "0.9s" : "0.1s")} ease;
    margin-top: 6px;
    margin-right: 50px;
    margin-left: 8px;
    height: 40px;
    direction: rtl;
    position: absolute;
    top: 0px;
    left: 0px;
  }
`;

const Input = styled(TextFaild)`
  height: 48px;
  border: none !important;
  background: ${({ theme }) => theme.palette.neutral[0]};
  margin-top: -8px;
  @media (max-width: 600px) {
    height: 40px;
  }
`;

const BoxDrawings = styled(Box)<{ $isColumn: boolean }>`
  background: ${({ theme }) => theme.palette.neutral[0]};
  box-shadow: 0px 4px 13px 0px rgba(0, 0, 0, 0.18);
  width: ${({ $isColumn }) => ($isColumn ? "48px" : "339px")};
  height: ${({ $isColumn }) => ($isColumn ? "339px" : "48px")};
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ $isColumn }) => ($isColumn ? "15px 0" : "0 15px")};
  flex-direction: ${({ $isColumn }) => ($isColumn ? "column" : "row")};
  @media (max-width: 1200px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    width: 48px;
    height: 339px;
    padding: 15px 0;
  }
  @media (max-width: 600px) {
    padding: 10px 0;
    margin-top: 48px;
    width: 38px;
    height: 289px;
  }
`;

const BoxHR = styled.div<{ $isColumn: boolean }>`
  background: #acd6ec;
  width: ${({ $isColumn }) => ($isColumn ? "29px" : "1px")};
  height: ${({ $isColumn }) => ($isColumn ? "1px" : "29px")};

  @media (max-width: 1200px) {
    width: 29px;
    height: 1px;
  }
`;

const BoxDrawerActive = styled(Box)<{ $show: boolean }>`
  background: ${({ $show, theme }) =>
    $show ? theme.palette.secondary[300] : "transparent"};
  border-radius: 5px;
  padding: 3px;
  cursor: pointer;
`;

const BoxLayers = styled(Box)`
  display: flex;
  align-items: start;
  justify-content: start;
  width: 100%;

  @media (max-width: 600px) {
    align-items: start;
    justify-content: end;
    flex-direction: column;
  }
`;

const BoxLayersSM = styled(Box)`
  display: flex;
  align-items: start;
`;
const BoxSearchSM = styled(Box)`
  display: none;

  @media (max-width: 600px) {
    display: flex;
  }
`;
const BoxSearchMD = styled(Box)`
  display: flex;

  @media (max-width: 600px) {
    display: none;
  }
`;

const BoxContainer = styled(Box)`
  width: 100%;
  display: flex;
  align-items: start;
  justify-content: space-between;
`;

const BoxShowJson = styled(Box)<{ $isShow: boolean }>`
  position: relative;
  border-radius: 0;
  background: ${({ theme }) => theme.palette.neutral[0]};
  box-shadow: 0px 4px 13px 0px rgba(0, 0, 0, 0.25);
  width: ${({ $isShow }) => ($isShow ? "370px" : "0px")};
  transition: width 0.3s ease;
  display: flex;
  height: 74vh;
  align-items: center;

  & > .react-codemirror2 {
    scrollbar-width: thin !important;
    overflow-x: scroll !important;
  }

  & > div > div {
    background-color: ${({ theme }) => theme.palette.neutral[0]} !important;
    color: ${({ theme }) => theme.palette.primary[900]} !important;
    height: calc(100vh - 165px) !important;
    padding-top: 50px !important;

    &
      > .CodeMirror-scroll
      > .CodeMirror-sizer
      > div
      > .CodeMirror-lines
      > div
      > .CodeMirror-code
      > div {
      /* & > .CodeMirror-line {
        margin-left: 15px !important;
      } */

      & > .CodeMirror-gutter-wrapper > .CodeMirror-linenumber {
        text-align: center !important;
        width: 30px !important;
        color: ${({ theme }) => theme.palette.primary[900]} !important;
        border: 1px solid ${({ theme }) => theme.palette.red.light};
        border-bottom: none;
      }
    }

    & > .CodeMirror-scroll {
      z-index: 30 !important;
      & > .CodeMirror-sizer > div {
        left: 2px !important;
      }
    }
    & > .CodeMirror-vscrollbar {
      scrollbar-width: thin !important;
      width: 20px !important;
      z-index: 1500 !important;
    }

    & > .CodeMirror-scroll > .CodeMirror-gutters {
      background-color: ${({ theme }) => theme.palette.neutral[0]} !important;
      color: ${({ theme }) => theme.palette.red.light} !important;
    }

    @media (min-height: 700px) {
      height: 75vh;
    }
    @media (min-height: 750px) {
      height: 77vh;
    }
    @media (min-height: 800px) {
      height: 78vh;
    }

    @media (max-height: 910px) {
      & > .CodeMirror-scroll > .CodeMirror-sizer {
        width: 700px !important;
      }
    }
  }

  @media (max-width: 910px) {
    height: ${({ $isShow }) => ($isShow ? "80vh" : "0px")};
    width: ${({ $isShow }) => ($isShow ? "100%" : "0px")};
    transition: height 0.3s ease-in-out;
    margin-bottom: 20px;
  }
`;

const Copy = styled.div<{ $show: boolean }>`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1;
  background: ${({ theme }) => theme.palette.neutral[0]};
  border-radius: 4px;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  transition-duration: 400ms;
  clear: both;
  pointer-events: auto;
  transform: translate(0);
  display: ${({ $show }) => ($show ? "block" : "none")};
  transition: display 1s ease-in;

  &:hover {
    background: ${({ theme }) => theme.palette.neutral[300]};
  }

  & > button {
    background-color: transparent;
    border: 0;
    box-sizing: border-box;
    cursor: pointer;
    display: block;
    height: 29px;
    outline: none;
    overflow: hidden;
    padding: 0;
    width: 29px;
    & > span {
      color: rgb(107 114 128 / 1);
      font-weight: 900;
    }
  }
`;

const Download = styled.div<{ $show: boolean }>`
  position: absolute;
  top: 20px;
  right: 60px;
  z-index: 1;
  background: ${({ theme }) => theme.palette.neutral[0]};
  border-radius: 4px;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  transition-duration: 400ms;
  clear: both;
  pointer-events: auto;
  transform: translate(0);
  display: ${({ $show }) => ($show ? "block" : "none")};
  transition: display 1s ease-in;

  &:hover {
    background: ${({ theme }) => theme.palette.neutral[300]};
  }

  & > button {
    background-color: transparent;
    border: 0;
    box-sizing: border-box;
    cursor: pointer;
    display: block;
    height: 29px;
    outline: none;
    overflow: hidden;
    padding: 0;
    width: 29px;
    & > span {
      color: rgb(107 114 128 / 1);
      font-weight: 900;
    }
  }
`;

const ShowGeoJson = styled(Box)`
  position: absolute;
  bottom: 150px;
  right: 0;
  z-index: 1;
  @media (max-width: 910px) {
    bottom: 0px;
    right: 65px;
  }
`;

const CRNLocation = styled(Box)`
  position: absolute;
  bottom: 80px;
  left: 25px;
  z-index: 1;
  padding: 8px 10px;
  border-radius: 50%;
  background: #deeff7;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  /* @media (max-width: 910px) {
    bottom: 50px;
    left: 5px;
  } 
   */
`;

const BoxOpenGeoJson = styled(Box)<{ $isShow: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 5px 5px 0;
  background: ${({ theme }) => theme.palette.neutral[0]};
  height: 48px;
  width: 48px;
  box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.25);
  border-radius: 24px 0 0 24px;
  cursor: pointer;
  & > svg {
    transform: ${({ $isShow }) =>
      $isShow ? "rotate(90deg)" : "rotate(-90deg)"};
  }
  @media (max-width: 910px) {
    border-radius: 24px 24px 0 0;
    & > svg {
      margin-right: 5px;
      transform: ${({ $isShow }) =>
        $isShow ? "rotate(0deg)" : "rotate(-180deg)"};
    }
  }
  @media (max-width: 600px) {
    width: 38px;
    height: 38px;
  }
`;

const Customstyle = styled(Box)<{ $isShow: boolean }>`
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  padding: 0 5px 5px 0;
  background: #deeff7;
  height: 44px;
  width: 44px;
  border-radius: 50%;
  z-index: 1000;
  left: 23px;
  bottom: 180px;
  box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.25);

  & > .icon-style {
    cursor: pointer;
  }

  & > .mainContainer {
    display: ${({ $isShow }) => ($isShow ? "flex" : "none")};
    transition: display 1.5s ease;
    position: absolute;
    left: 50px;
    width: 60px;
    height: 290px;
    bottom: 44px;
    border-radius: 8px 8px 8px 0;
    align-items: start;
    justify-content: center;
    background: #cccc;

    & > div {
      display: flex;
      align-items: start;
      justify-content: center;
      flex-direction: column;
      & > p {
        margin-top: 12px;
        margin-bottom: 8px;
        font-weight: 600;
      }
    }
  }
`;

const BtnContainer = styled(Box)`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  padding: 8px 0 8px 10px;
  border-radius: 14px;
  background: #fff;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.25);
  margin-top: 0;
`;

export {
  BaxControl,
  BottomIcon,
  BoxBTN,
  BoxBTNGroup,
  BoxBTNSec,
  BoxBTNSecXS,
  BoxClose,
  BoxContainer,
  BoxDrawerActive,
  BoxDrawings,
  BoxHeader,
  BoxHR,
  BoxIcon,
  BoxIconMap,
  BoxInput,
  BoxInputContainer,
  BoxInputDetail,
  BoxInputTest,
  BoxLayer,
  BoxLayers,
  BoxLayersSM,
  BoxName,
  BoxOpen,
  BoxOpenGeoJson,
  BoxSearch,
  BoxSearchMD,
  BoxSearchSM,
  BoxShowJson,
  BoxSM,
  BoxTable,
  BoxTextTile,
  BoxTile,
  BTNAssessment,
  BtnContainer,
  BTNFilter,
  BtnPoint,
  BtnPointContainer,
  BTNSetting,
  BTNSettingXS,
  circleStyleD,
  Copy,
  CRNLocation,
  Customstyle,
  Download,
  DrawerStyle,
  Header,
  Hr,
  Input,
  InputTextSearch,
  LayerStyle,
  lineStyle,
  lineStyleMeasure,
  MapBox,
  MapIconContainer,
  measurelineStyle,
  MenuIcon,
  NameProject,
  Plus,
  pointNewStyle,
  pointStyle,
  pointStyleCustom,
  polygonStyle,
  SearchInput,
  ShowAlertStyle,
  ShowGeoJson,
  ShowItemsStyle,
  TableSelect,
  TableSelectSM,
  TableSetting,
  TableSettingSM,
  TextStyle,
  TextTile,
  TileStyle,
  BoxBtnTooltip,
};
