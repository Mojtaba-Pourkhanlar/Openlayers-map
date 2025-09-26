// Core
import Box from "@/Components/Common/Core/Box";
import Typography from "@/Components/Common/Core/Typography";
// Icon
import { ReactComponent as Line } from "@/assets/svg/line.svg";
import { ReactComponent as Polygon } from "@/assets/svg/polygon.svg";
// Styles
import { getTranslate } from "@/language";
import { getPointsDetail } from "@/store/Actions/Map";
import { useDispatch } from "react-redux";
import { convertUTMToWGS } from "../Hook";
import {
  BoxContainer,
  BoxHeader,
  BoxItems,
  BoxItemsLable,
  HeaderText,
  Lable,
  Value,
} from "../Style";

export const Popup = ({ content, open, utm }: any) => {
  const dispatch = useDispatch();
  const translate = getTranslate();
  const utmSlice: string = utm?.slice(8, 10);
  const { longitude, latitude } = convertUTMToWGS(
    content.lon,
    content.lat,
    +utmSlice
  );
  return (
    <BoxContainer open={open}>
      <BoxHeader $type={content.type === "Point"}>
        <Box>
          {content.numPoints ? (
            <Box style={{ display: "flex", marginTop: "5px" }}>
              <Typography
                style={{
                  margin: "0 2px 0",
                  fontSize: "16px",
                  color: "#FFB020",
                }}
              >
                {content.type === "Polygon"
                  ? content.numPoints - 1
                  : content.numPoints}
              </Typography>
              <div
                style={{
                  background: "#FFB020",
                  width: "16px",
                  height: "16px",
                  border: "1px solid #000",
                  borderRadius: "50%",
                }}
              />
            </Box>
          ) : (
            <></>
          )}
        </Box>
        <HeaderText
          style={{
            margin: content.type === "Point" ? "0 20px 0 0" : "0",
          }}
        >
          {content.name}
        </HeaderText>
        <div>{content.icon}</div>
      </BoxHeader>
      {content.type === "Point" && (
        <>
          <BoxItems>
            <BoxItemsLable>
              <Lable>Longitude : </Lable>
              <Lable>Latitude : </Lable>
            </BoxItemsLable>
            <BoxItemsLable>
              <Value>
                {utm === "EPSG:4326"
                  ? content.lon
                  : Number(longitude)
                      .toFixed(7)
                      .replace(/\.0000000$/, "") ?? "__"}
              </Value>
              <Value>
                {utm === "EPSG:4326"
                  ? content.lat
                  : Number(latitude)
                      .toFixed(7)
                      .replace(/\.0000000$/, "") ?? "__"}
              </Value>
            </BoxItemsLable>
          </BoxItems>
          <p
            style={{
              textAlign: "center",
              margin: "10px 0 5px 0",
              color: "orange",
              fontSize: "13px",
            }}
            onClick={() => {
              const data: { name: string; show: string } = {
                name: content.name,
                show: translate.pointDetailText,
              };
              dispatch(getPointsDetail(data) as any);
            }}
          >
            Show More
          </p>
        </>
      )}
    </BoxContainer>
  );
};

export const MeasurePopup = ({ open, measure, type }: any) => {
  return (
    <BoxContainer open={open}>
      <BoxHeader
        style={{
          height: "40px",
          backgroundColor: type === "LineString" ? "#5AC4B4" : "#2094FF",
        }}
      >
        <div style={{ marginRight: "10px" }}>
          {type === "LineString" ? <Line /> : <Polygon />}
        </div>
        <div />
        <HeaderText style={{ marginLeft: "8px" }}>Measure</HeaderText>
      </BoxHeader>
      <BoxItems style={{ height: "30px", margin: "10px 10px 0" }}>
        <BoxItemsLable>
          <Lable>{type === "LineString" ? "Length : " : "Area"}</Lable>
        </BoxItemsLable>
        <div
          style={{
            margin: "10px 10px 17px",
            width: "1px",
            height: "40%",
            background: "#DEEFF7",
          }}
        />
        <BoxItemsLable>
          <Value>{measure ?? "__"}</Value>
        </BoxItemsLable>
      </BoxItems>
    </BoxContainer>
  );
};
