import { Modal } from "@/Components/Common/Core/Modal";
import { MultiPointByID } from "@/Interfaces";
import { closeModal } from "@/store/Actions/Root";
import { RootState } from "@/store/interfaces";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MapPoints from "./MapPoints";

const ShowMap = ({ heatMapData, currentMode, dividerValue, type }: any) => {
  const dispatch = useDispatch();
  const modal = useSelector((state: RootState) => state.root.modal);
  const [showPoints, setShowPoints] = useState<{
    type: string;
    features: {}[];
  }>();
  useEffect(() => {
    const pointFeatures = heatMapData?.map((item: MultiPointByID) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [item.lon, item.lat],
      },
      properties: {
        name: item.name,
        status: item.color,
        color: item.lable,
      },
    }));
    const finaly: { type: string; features: {}[] } = {
      type: "FeatureCollection",
      features: [...pointFeatures],
    };
    setShowPoints(finaly);
  }, [heatMapData]);

  const closeModalHandler = () => {
    dispatch(closeModal());
  };

  return (
    <Modal
      onClose={closeModalHandler}
      width={700}
      title={"نمایش نقاط"}
      show={modal.name === "نمایش نقاط" || modal.name === "نمایش نقاط چارت"}
    >
      <MapPoints
        getPointData={showPoints}
        mapId="map-container-heat-map"
        currentMode={currentMode}
        dividerValue={dividerValue}
        type={type}
      />
    </Modal>
  );
};

export default ShowMap;
