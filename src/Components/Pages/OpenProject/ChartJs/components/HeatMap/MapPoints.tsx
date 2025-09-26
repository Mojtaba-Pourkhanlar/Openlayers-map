import { Map, Overlay } from "ol";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import "ol/ol.css";
import { OSM } from "ol/source";
import VectorSource from "ol/source/Vector";
import { useCallback, useEffect, useRef } from "react";
import "../../../History/components/style.css";
import {
  memoizedStyleHeatMap,
  showData,
  useUTMHandler,
} from "../../../Map/Hook";
import { customTileLoadFunction } from "../../../Map/components/Tiles";
import { getPalette } from "@/Hook";
import { useSelector } from "react-redux";
import { RootState } from "@/store/interfaces";
import { MapContainer } from "./Style";

const MapPoints = ({
  getPointData,
  mapId,
  isHeight,
  currentMode,
  dividerValue,
  type,
}: any) => {
  const modal = useSelector((state: RootState) => state.root.modal);
  const mapRef = useRef<Map | null>(null);
  const sourceServerRef = useRef<VectorSource | any>(null);
  const overlayRef = useRef<Overlay | null>(null);
  const showCoordinate = memoizedStyleHeatMap({ getPointData, mapRef });
  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = new Map({
        target: mapId,
        layers: [
          new TileLayer({
            source: new OSM({
              tileLoadFunction: customTileLoadFunction,
            }),
          }),
        ],
      });
    }
    useUTMHandler("EPSG:3857", mapRef?.current, getPointData?.features, true);
  }, [mapRef?.current, getPointData?.features, overlayRef]);

  const setupMapLayers = useCallback(() => {
    if (mapRef.current && getPointData?.features) {
      if (!sourceServerRef.current) {
        sourceServerRef.current = new VectorSource();
      } else {
        sourceServerRef.current.clear();
      }
      const pointFeatures = showData(getPointData, "EPSG:3857");
      pointFeatures.forEach((feature: any, index: number) => {
        const originalFeature = getPointData.features[index];
        if (originalFeature && originalFeature.properties) {
          feature.set("status", originalFeature.properties.status);
        }
      });
      sourceServerRef.current.addFeatures(pointFeatures);
      const vectorLayerMapBox = new VectorLayer({
        source: sourceServerRef.current,
        style: showCoordinate,
      });
      mapRef.current.getLayers().forEach((layer) => {
        if (layer instanceof VectorLayer) {
          mapRef.current?.removeLayer(layer);
        }
      });
      mapRef.current.addLayer(vectorLayerMapBox);
      mapRef.current.render();
    }
  }, [getPointData, showCoordinate]);

  useEffect(() => {
    setupMapLayers();
  }, [getPointData, setupMapLayers]);

  return (
    <MapContainer $isHeight={isHeight} $currentMode={currentMode}>
      <div id={mapId} className="popupMain"></div>
      {modal.name === "نمایش نقاط چارت" && (
        <div className="mapLable">
          {getPalette[currentMode].map((item: any, index: number) => {
            return (
              <div className="lable" key={index}>
                <p>{item.name}</p>
                <div></div>
                <div
                  style={{
                    background: item.color,
                  }}
                ></div>
              </div>
            );
          })}
        </div>
      )}
      {modal.name === "نمایش نقاط" && (
        <div className="mapLable" style={{ width: "150px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row-reverse",
              justifyContent: "space-between",
              color: "#fff",
            }}
          >
            {type} {" < "} {dividerValue.toFixed(3)}
            <div
              style={{
                width: "15px",
                height: "15px",
                background: "green",
                borderRadius: "50%",
              }}
            ></div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row-reverse",
              justifyContent: "space-between",
              color: "#fff",
            }}
          >
            {type} {" > "} {dividerValue.toFixed(3)}
            <div
              style={{
                width: "15px",
                height: "15px",
                background: "red",
                borderRadius: "50%",
              }}
            ></div>{" "}
          </div>
        </div>
      )}
    </MapContainer>
  );
};

export default MapPoints;
