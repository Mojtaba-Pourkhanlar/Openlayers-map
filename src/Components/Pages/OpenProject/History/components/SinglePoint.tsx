import { Map, Overlay } from "ol";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import "ol/ol.css";
import { toLonLat } from "ol/proj";
import { OSM } from "ol/source";
import VectorSource from "ol/source/Vector";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  handleMapInteraction,
  memoizedStyleHistoryMap,
  showData,
  useUTMHandler,
} from "../../Map/Hook";
import { customTileLoadFunction } from "../../Map/components/Tiles";
import "./style.css";

const SinglePoint = ({ getPointData, mapId, isHeight, getPointStyle }: any) => {
  const mapRef = useRef<Map | null>(null);
  const sourceServerRef = useRef<VectorSource | any>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<Overlay | null>(null);
  const showCoordinate = memoizedStyleHistoryMap(getPointData, getPointStyle);

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
      if (popupRef.current) {
        overlayRef.current = new Overlay({
          element: popupRef.current,
          positioning: "bottom-center",
          stopEvent: false,
          offset: [0, -15],
        });
        mapRef.current.addOverlay(overlayRef.current);
      }
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
      const pointFeature = showData(getPointData, "EPSG:3857");
      sourceServerRef.current.addFeatures(pointFeature);
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

    if (mapRef.current) {
      mapRef.current.on("click", (event) => {
        let clickedOnFeature = false;
        mapRef.current?.forEachFeatureAtPixel(event.pixel, (feature: any) => {
          const name = feature.get("name");
          if (name && overlayRef.current && popupRef.current) {
            const coordinates = feature.getGeometry().getCoordinates();
            const [longitude, latitude] = toLonLat(coordinates);
            popupRef.current.innerHTML = `
            <p class="projectName">${name}</p>
            <table class="custom-table">
              <tr>
                <td>${longitude.toFixed(4)}</td>
                <td class="changetext">Longitude</td>
              </tr>
              <tr>
                <td>${latitude.toFixed(4)}</td>
                <td class="changetext">Latitude</td>
              </tr>
            </table>
        `;

            overlayRef.current.setPosition(coordinates);
            clickedOnFeature = true;
          }
        });
        if (!clickedOnFeature && overlayRef.current) {
          overlayRef.current.setPosition(undefined);
        }
      });
    }
  }, [getPointData, setupMapLayers]);

  return (
    <div>
      <div
        id={mapId}
        style={{
          height: isHeight ?? "500px",
        }}
        className="popupMain"
      ></div>
      <div ref={popupRef} className="popupRef" />
    </div>
  );
};

export default SinglePoint;
