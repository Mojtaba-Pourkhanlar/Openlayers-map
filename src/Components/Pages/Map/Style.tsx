import Box from "@/Components/Common/Core/Box";
import Typography from "@/Components/Common/Core/Typography";
import { styled } from "styled-components";

// Define the styles object
const styles: any = {
  Point: {
    "circle-radius": 5,
    "circle-fill-color": "red",
  },
  LineString: {
    "circle-radius": 5,
    "circle-fill-color": "red",
    "stroke-color": "yellow",
    "stroke-width": 2,
  },
  Polygon: {
    "circle-radius": 5,
    "circle-fill-color": "red",
    "stroke-color": "yellow",
    "stroke-width": 2,
    "fill-color": "rgba(90, 152, 219, 0.1)",
  },
  Circle: {
    "circle-radius": 5,
    "circle-fill-color": "red",
    "stroke-color": "blue",
    "stroke-width": 2,
    "fill-color": "rgba(255, 0, 0, 0.1)",
  },
};

const Lable = styled(Typography)`
  font-size: 14px;
  color: ${({ theme }) => theme.palette.primary[900]};
  margin: 0;
  font-weight: 600;
`;
const Value = styled(Typography)`
  font-size: 14px;
  color: ${({ theme }) => theme.palette.primary[600]};
  margin: 0;
  font-weight: 600;
`;
const BoxItems = styled(Box)`
  margin: 6px 0 0 0;
  direction: ltr;
  padding: 0px 5px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 53px;
`;
const BoxItemsLable = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 89%;
  justify-content: space-between;
`;
const BoxHeader = styled(Box)<{ $type: boolean }>`
  background: ${({ theme }) => theme.palette.primary[900]};
  width: 100%;
  height: 48px;
  border-radius: ${({ $type }) => ($type ? "24px 24px 0 0" : "24px")};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;

  div > svg > path {
    fill: ${({ theme }) => theme.palette.neutral[0]};
  }
  div > svg > circle {
    stroke: ${({ theme }) => theme.palette.neutral[0]};
  }
`;
const HeaderText = styled(Typography)`
  font-size: 16px;
  color: ${({ theme }) => theme.palette.neutral[0]};
  margin: 5px 0 0;
`;
const BoxContainer = styled(Box)<{ open: boolean }>`
  position: absolute;
  right: 15px;
  top: ${(props) => (props.open === true ? "225px" : "80px")};
  background: ${({ theme }) => theme.palette.neutral[50]};
  box-shadow: 0px 4px 13px 0px rgba(0, 0, 0, 0.25);
  border-radius: 24px;
  cursor: pointer;
  width: 242px;
  height: auto;
  transition: top 0.4s ease;
`;
const EditBax = styled(Box)<{ $isColumn: boolean }>`
  background-color: ${({ theme }) => theme.palette.neutral[0]};
  width: 48px;
  height: 48px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0px 4px 13px 0px rgba(0, 0, 0, 0.18);
  margin: ${({ $isColumn }) => ($isColumn ? "5px" : "0 5px")};

  @media (max-width: 1200px) {
    margin: 5px;
    width: 38px;
    height: 38px;
  }
`;

const MapContainer = styled(Box)<{ $openJson: boolean }>`
  display: flex;
  overflow: hidden;
`;

const DivLocation = styled(Box)`
  #current-location-con {
    position: absolute; 
    bottom: 112px;
    left: 16px;
    z-index: 1;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.25);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    & > div > svg {
      width: 30px;
      height: 30px;
      & > path {
        fill: #0b233f;
      }
    }

    & > div {
      margin: 0 0 0px 0;
      padding: 0;

      & > span > div > svg {
        width: 30px;
        height: 30px;
        & > path {
          fill: #0b233f;
        }
      }
    }
  }
  #meatrue-con {
    position: absolute;
    bottom: 65px;
    left: 16px;
    z-index: 1;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.25);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    & > div {
      margin: 0 0 -10px 0;
      padding: 0;
    }
  }
`;

export {
  styles,
  Lable,
  Value,
  BoxItems,
  BoxHeader,
  BoxContainer,
  HeaderText,
  BoxItemsLable,
  EditBax,
  MapContainer,
  DivLocation,
};
