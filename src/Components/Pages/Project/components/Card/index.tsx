import mapShow from "@/assets/images/mapShow.png";
import Box from "@/Components/Common/Core/Box";
import DateConverter from "@/Components/Common/Core/DateConverter";
import { textLength } from "@/Hook";
import React from "react";
import {
  CardColumn,
  CardContainer,
  CardContent,
  CardImage,
  CardImageWrapper,
  CardName,
  CardTitle,
} from "./style";

type CardProps = {
  image: string;
  name: string;
  date: string;
  owner: string;
  isSync: string;
  modifiedBy: string;
  updatedAt: string;
  boundingBox: any;
  onClick: () => void;
};

const Card: React.FC<CardProps> = ({
  image,
  name,
  date,
  owner,
  isSync,
  modifiedBy,
  updatedAt,
  boundingBox,
  onClick,
}) => {
  const latLonToTile = (lat: any, lon: any, z: any) => {
    const n = Math.pow(2, z);
    const x = Math.floor(n * ((lon + 180) / 360));
    const y = Math.floor(
      (n *
        (1 -
          Math.log(
            Math.tan((Math.PI / 180) * lat) +
              1 / Math.cos((Math.PI / 180) * lat)
          ) /
            Math.PI)) /
        2
    );
    return { x, y };
  };
  const getTileUrls = ({ minLat, maxLat, minLon, maxLon }: any) => {
    let zoom = 15;
    let urls = [];
    while (zoom >= 0) {
      const { x: xMin, y: yMax } = latLonToTile(maxLat, minLon, zoom);
      const { x: xMax, y: yMin } = latLonToTile(minLat, maxLon, zoom);
      urls = [];
      for (let x = xMin; x <= xMax; x++) {
        for (let y = yMin; y <= yMax; y++) {
          urls.push(`https://tile.openstreetmap.org/${zoom}/${x}/${y}.png`);
        }
      }
      if (urls.length === 1) {
        return urls[0];
      }
      zoom--;
    }
    return null;
  };
  const urls: any = getTileUrls({
    minLat: boundingBox && boundingBox[2],
    maxLat: boundingBox && boundingBox[0],
    minLon: boundingBox && boundingBox[3],
    maxLon: boundingBox && boundingBox[1],
  });

  return (
    <CardContainer onClick={onClick}>
      <CardImageWrapper style={{ height: boundingBox ? "100%" : "228px" }}>
        <CardImage src={boundingBox ? urls : mapShow} key={urls} />
      </CardImageWrapper>
      <CardContent>
        <Box>
          <CardColumn style={{ margin: "0" }}>
            <CardName
              style={{
                fontSize: "16px",
                marginLeft: "27px",
                fontWeight: "700",
              }}
            >
              نام پروژه :
            </CardName>
            <CardTitle
              style={{
                margin: "0 0 0 22px",
              }}
            >
              {textLength({ text: name, length: 20 })}
            </CardTitle>
          </CardColumn>
          <CardColumn style={{}}>
            <CardName
              style={{
                fontSize: "15px",
                margin: "0 0 0 15px",
                fontWeight: "600",
              }}
            >
              ایجاد شده توسط :
            </CardName>
            <CardTitle
              style={{
                margin: "0 0 0 22px",
                fontSize: "15px",
              }}
            >
              {textLength({ text: owner, length: 20 })}
            </CardTitle>
          </CardColumn>
          <CardColumn style={{}}>
            <CardName
              style={{
                fontSize: "14px",
                marginLeft: "10px",
                fontWeight: "500",
              }}
            >
              تاریخ ایجاد :
            </CardName>
            <CardTitle style={{ fontWeight: "500" }}>
              <DateConverter date={date} showSeparateDateTime={false} />
            </CardTitle>
          </CardColumn>
          {modifiedBy !== " " && (
            <CardColumn style={{ margin: "0" }}>
              <CardName
                style={{
                  fontSize: "14px",
                  margin: "0 0 0 10px ",
                  fontWeight: "500",
                }}
              >
                بروزرسانی :
              </CardName>
              <CardTitle
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  display: "flex",
                }}
              >
                <DateConverter date={updatedAt} /> | {modifiedBy}
              </CardTitle>
            </CardColumn>
          )}
        </Box>
      </CardContent>
    </CardContainer>
  );
};

export default Card;
