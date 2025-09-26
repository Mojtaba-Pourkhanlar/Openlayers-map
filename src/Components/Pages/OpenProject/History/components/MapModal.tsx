import DateConverter from "@/Components/Common/Core/DateConverter";
import { Modal } from "@/Components/Common/Core/Modal";
import Typography from "@/Components/Common/Core/Typography";
import Stack from "@/Components/Common/Utils/Stack";
import { customeMultiPointDetail, customePointDetail } from "@/Constants";
import {
  transformLineData,
  transformLineDataBefore,
  transformPointData,
} from "@/Hook";
import { clearHistoryMultiPoint, redirectPage } from "@/store/Actions/History";
import { clearPointDetail } from "@/store/Actions/Map";
import { closeModal } from "@/store/Actions/Root";
import { RootState } from "@/store/interfaces";
import "ol/ol.css";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BoxCard,
  BoxCardChild,
  BoxCardChildRes,
  BoxShowItem,
  DivDetail,
  DivDetailBefore,
  DivDetailMap,
  MapContainer,
  MapDiv,
  Title,
} from "../Style";
import SinglePoint from "./SinglePoint";

const MapModal = ({ selectedPoint, featureType }: any) => {
  const dispatch = useDispatch();
  const getPointStyle: string | any = localStorage.getItem("custom-point");
  const { modal } = useSelector((state: RootState) => state?.root);
  const { multiPointList } = useSelector((state: RootState) => state.history);
  const [pointData, setPointData] = useState<any | null>(null);
  const [getPointData, setGetPointData] = useState<any | null>(null);
  const [getPoints, setPoints] = useState<any>(null);
  const [getPointsBefore, setPointsBefore] = useState<any>(null);
  const [pointsCustom, setPointsCustom] = useState<any>(null);
  useEffect(() => {
    if (featureType === "point") {
      const spliteData =
        selectedPoint.status === "updated"
          ? {
              data: selectedPoint.FeatureAfter,
              status: selectedPoint?.status,
              before: selectedPoint.featureBefore,
            }
          : {
              data: selectedPoint.feature,
              status: selectedPoint?.status,
              before: null,
            };
      setPointData(customePointDetail(spliteData));
      setGetPointData(transformPointData(selectedPoint));
    } else if (featureType === "multipoint" && multiPointList?.feature) {
      const multiData =
        selectedPoint.status === "updated"
          ? {
              data: selectedPoint.FeatureAfter,
              status: selectedPoint?.status,
              before: selectedPoint.featureBefore,
            }
          : {
              data: multiPointList.feature,
              status: selectedPoint?.status,
              before: null,
            };
      setPointsCustom(customeMultiPointDetail(multiData));
      if (selectedPoint.status === "updated") {
        setPoints(transformLineData(multiPointList));
        setPointsBefore(transformLineDataBefore(multiPointList));
      } else {
        setPoints(transformLineData(multiPointList));
      }
    }
  }, [featureType, multiPointList, selectedPoint]);

  const closeModalHandler = () => {
    dispatch(redirectPage(false));
    dispatch(closeModal());
    dispatch(clearPointDetail());
    dispatch(clearHistoryMultiPoint());
  };

  const ScrollSync = useCallback((leftClass: string, rightClass: string) => {
    const leftTable = document.querySelector(leftClass);
    const rightTable = document.querySelector(rightClass);

    if (leftTable && rightTable) {
      const syncScroll = (source: HTMLElement, target: HTMLElement) => {
        target.scrollTop = source.scrollTop;
      };

      const handleLeftScroll = () =>
        syncScroll(leftTable as HTMLElement, rightTable as HTMLElement);
      const handleRightScroll = () =>
        syncScroll(rightTable as HTMLElement, leftTable as HTMLElement);

      leftTable.addEventListener("scroll", handleLeftScroll);
      rightTable.addEventListener("scroll", handleRightScroll);

      return () => {
        leftTable.removeEventListener("scroll", handleLeftScroll);
        rightTable.removeEventListener("scroll", handleRightScroll);
      };
    }
  }, []);

  useEffect(() => {
    return ScrollSync("#left-table", "#right-table");
  }, [ScrollSync]);

  const RenderBoxCards = ({ data }: any) =>
    data?.map((item: any, index: number) => (
      <BoxCard key={index} style={{ padding: "0 5px", margin: "0 10px" }}>
        <BoxShowItem>
          <BoxCardChildRes $color={item.color}>
            <Typography style={{ margin: 0, fontSize: "14px" }}>
              {item.name === "Date and Time" ? (
                <DateConverter date={item.value} />
              ) : (
                item.value
              )}
            </Typography>
          </BoxCardChildRes>
          <BoxCardChild>
            <Typography style={{ margin: 0, fontSize: "13px" }}>
              {item.name ?? "___"}
            </Typography>
          </BoxCardChild>
        </BoxShowItem>
      </BoxCard>
    ));

  return (
    <Modal
      onClose={closeModalHandler}
      width={
        featureType === "point" && selectedPoint.status === "updated"
          ? 1100
          : 750
      }
      title={"نمایش جزئیات نقطه"}
      show={modal.name === "نقشه"}
    >
      {featureType === "point" ? (
        <Stack justifyContent="center" alignItems="center">
          <MapContainer>
            <Title>
              {selectedPoint.status === "updated"
                ? "جزئیات بعد از تغییر"
                : "جزئیات نقطه"}
            </Title>
            <DivDetail style={{ borderLeft: "none" }}>
              <MapDiv id="left-table">
                <RenderBoxCards data={pointData?.data} />
              </MapDiv>
            </DivDetail>
          </MapContainer>

          <DivDetailMap>
            <SinglePoint
              getPointData={getPointData}
              getPointStyle={getPointStyle}
              mapId="map-container"
            />
          </DivDetailMap>

          {selectedPoint.status === "updated" && (
            <MapContainer>
              <Title>جزئیات قبل از تغییر</Title>
              <DivDetailBefore>
                <MapDiv id="right-table">
                  <RenderBoxCards data={pointData?.before} />
                </MapDiv>
              </DivDetailBefore>
            </MapContainer>
          )}
        </Stack>
      ) : (
        <Stack justifyContent="center" alignItems="center">
          {selectedPoint.status === "updated" ? (
            <>
              <MapContainer>
                <Title>جزئیات بعد از تغییر</Title>
                <DivDetail>
                  <MapDiv id="left-table">
                    <RenderBoxCards data={pointsCustom?.data} />
                  </MapDiv>
                  <div
                    style={{
                      margin: "0",
                    }}
                  >
                    <SinglePoint
                      getPointStyle={getPointStyle}
                      getPointData={getPoints}
                      mapId="map-container"
                      isHeight={"301px"}
                    />
                  </div>
                </DivDetail>
              </MapContainer>
              <MapContainer>
                <Title>جزئیات قبل از تغییر</Title>
                <DivDetailBefore>
                  <MapDiv id="right-table">
                    <RenderBoxCards data={pointsCustom?.before} />
                  </MapDiv>
                  <div
                    style={{
                      margin: "0",
                    }}
                  >
                    <SinglePoint
                      getPointData={getPointsBefore}
                      mapId="map-container-sec"
                      isHeight="301px"
                      getPointStyle={getPointStyle}
                    />
                  </div>
                </DivDetailBefore>
              </MapContainer>
            </>
          ) : (
            <Stack justifyContent="center" alignItems="center">
              <MapContainer>
                <Title>جزئیات</Title>
                <DivDetail>
                  <MapDiv id="left-table">
                    <RenderBoxCards data={pointsCustom?.data} />
                  </MapDiv>
                </DivDetail>
              </MapContainer>
              <DivDetailMap
                style={{
                  borderRight: "none",
                  borderRadius: "12px 0 0 12px",
                }}
              >
                <SinglePoint
                  getPointData={getPoints}
                  mapId="map-container"
                  getPointStyle={getPointStyle}
                />
              </DivDetailMap>
            </Stack>
          )}
        </Stack>
      )}
    </Modal>
  );
};

export default MapModal;
