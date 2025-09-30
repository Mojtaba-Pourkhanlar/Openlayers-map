// Core
import Box from "@/Components/Common/Core/Box";
import Typography from "@/Components/Common/Core/Typography";
// Styles
import { nameToFixed } from "@/Constants";
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
            <Box style={{ display: "flex", marginRight: "10px" }}>
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
            margin: content.type === "Point" ? "0 0 0 0" : "0",
          }}
        >
          {content.name}
        </HeaderText>
        <div style={{ margin: "0 0 0 10px" }}>{content.icon}</div>
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
                  : nameToFixed(Number(longitude), 7) ?? "__"}
              </Value>
              <Value>
                {utm === "EPSG:4326"
                  ? content.lat
                  : nameToFixed(Number(latitude), 7) ?? "__"}
              </Value>
            </BoxItemsLable>
          </BoxItems>
        </>
      )}
    </BoxContainer>
  );
};
