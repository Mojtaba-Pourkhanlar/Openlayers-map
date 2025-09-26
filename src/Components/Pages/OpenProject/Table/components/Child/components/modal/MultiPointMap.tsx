import { Modal } from "@/Components/Common/Core/Modal";
import SinglePoint from "@/Components/Pages/OpenProject/History/components/SinglePoint";
import { MultiPointByID } from "@/Interfaces";
import { clearShapeById } from "@/store/Actions/Map";
import { closeModal } from "@/store/Actions/Root";
import { RootState } from "@/store/interfaces";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const MultiPointMap = (isType: any) => {
  const dispatch = useDispatch();
  const getPointStyle: string | any = localStorage.getItem("custom-point");
  const modal = useSelector((state: RootState) => state.root.modal);
  const map_shape_byID = useSelector(
    (state: RootState) => state.map.map_shape_byID
  );
  const [showPoints, setShowPoints] = useState<{
    type: string;
    features: {}[];
  }>();
  useEffect(() => {
    if (map_shape_byID.data?.totalNumber > 0) {
      const coordinates = map_shape_byID.data?.list.map(
        (item: MultiPointByID) => [item.lon, item.lat]
      );
      const lineFeature = {
        type: "Feature",
        geometry: {
          type: isType.isType === 0 ? "LineString" : "Polygon",
          coordinates: coordinates,
        },
        properties: {
          name: "Sample Line",
        },
      };
      const pointFeatures = map_shape_byID.data?.list.map(
        (item: MultiPointByID) => ({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [item.lon, item.lat],
          },
          properties: {
            name: item.name,
          },
        })
      );
      const finaly: { type: string; features: {}[] } = {
        type: "FeatureCollection",
        features: [lineFeature, ...pointFeatures],
      };
      setShowPoints(finaly);
    }
  }, [map_shape_byID]);

  const closeModalHandler = () => {
    dispatch(closeModal());
    dispatch(clearShapeById());
  };

  return (
    <Modal
      onClose={closeModalHandler}
      width={750}
      title={"نمایش جزئیات عارضه"}
      show={modal.name === "عارضه"}
    >
      <SinglePoint
        getPointData={showPoints}
        getPointStyle={getPointStyle}
        mapId="map-container-multipoint"
      />
    </Modal>
  );
};

export default MultiPointMap;
