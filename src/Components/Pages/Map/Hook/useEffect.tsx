import { useCallback, useEffect, useRef } from "react";
// Openlayers
import { unByKey } from "ol/Observable.js";
import { LineString, Point as PointGeom } from "ol/geom";
import { Draw, Modify, Snap } from "ol/interaction.js";
import { Vector as VectorLayer } from "ol/layer";
import { Cluster, Vector as VectorSource } from "ol/source";
// Style
import { CountersState, UseDrawingArcCircleProps } from "@/Interfaces";
import { getDrawnFeatures } from "@/store/Actions/Map";
import { removeSelectedCheckbox } from "@/store/Actions/Root";
import { Feature } from "ol";
import { createBox } from "ol/interaction/Draw";
import "ol/ol.css";
import {
  calculateAndDrawArc,
  calculateAndDrawCircle,
  circleCoordinates,
  formatArea,
  formatLength,
  formatLengthNew,
  generateUniqueName,
  handleConvertToWGS84Drawer,
  handleModifyEnd,
  labelStyle,
  labelStyleMeasure,
  modifyStyle,
  segmentStyle,
  showData,
  styleEx,
} from ".";
import {
  circleStyleD,
  lineStyleMeasure,
  measurelineStyle,
  pointStyle,
} from "../../Style";
import {
  editModeHandlerProps,
  updateArcCircleProps,
  UseRectangleDrawingProps,
} from "./interface";

const useKeyboardEvents = (handleEscape: any) => {
  useEffect(() => {
    const handleKeyPress = (event: any) => {
      if (event.key === "Escape") {
        handleEscape();
      }
    };
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleEscape]);
};

const useUpdateArcCircle = ({
  circlePoints,
  sourceDrawnRef,
  counters,
  getPointData,
  setDrawnFeatures,
  setCounters,
  drawnFeaturesState,
  dispatch,
  arcPoints,
  utm,
  drawer,
  setCirclePoints,
  setArcPoints,
  radiusThree,
}: updateArcCircleProps) => {
  useEffect(() => {
    if (circlePoints.length === 3 && drawer === "circleThreePoint") {
      if (drawer === "circleThreePoint" && !radiusThree) {
        setCirclePoints([]);
        return;
      } else {
        calculateAndDrawCircle(
          circlePoints,
          sourceDrawnRef.current,
          counters,
          getPointData,
          setDrawnFeatures,
          setCounters,
          drawnFeaturesState,
          dispatch,
          utm,
          radiusThree
        );
        setCirclePoints([]);
      }
    }
    if (arcPoints.length === 3 && drawer === "arcThreePoint") {
      calculateAndDrawArc(
        arcPoints,
        sourceDrawnRef.current,
        counters,
        getPointData,
        setDrawnFeatures,
        setCounters,
        drawnFeaturesState,
        dispatch,
        utm
      );
      setArcPoints([]);
    }
  }, [circlePoints, drawer, radiusThree, arcPoints]);
};

const useDrawing = ({
  sourceDrawnRef,
  mapRef,
  drawnFeaturesState,
  getDrawnFeatures,
  dispatch,
  counters,
  setCounters,
  drawRef,
  drawnFeatures,
  draw,
  snap,
  drawer,
  state,
  styles,
  setActiveMeature,
  getPointData,
  utm,
  setDrawer,
  selectedCheckboxes,
  setShowLayers,
  getradius,
  test,
}: any) => {
  useEffect(() => {
    if (mapRef.current) {
      if (mapRef.current && drawRef.current) {
        mapRef.current.removeInteraction(drawRef.current);
      }
      // Create a new source if it doesn't exist
      if (!sourceDrawnRef.current) {
        sourceDrawnRef.current = new VectorSource({ wrapX: false });
        if (drawnFeatures.length > 0) {
          sourceDrawnRef.current.addFeatures(drawnFeatures);
        }
      }
      if (
        mapRef.current &&
        sourceDrawnRef.current &&
        drawer === "" &&
        state.selectedGeometryType !== "None"
      ) {
        const modifyDrawer = new Modify({
          source: sourceDrawnRef?.current,
          style: modifyStyle,
        });
        let tipPoint: any;
        // Create a new draw interaction with the selected geometry type
        let segmentStyles: any = [segmentStyle];
        let label: any;
        let point: any;
        let line: any;
        let geometry: any;
        if (
          state.selectedGeometryType === "LineString" ||
          state.selectedGeometryType === "Polygon"
        ) {
          drawRef.current = new Draw({
            source: sourceDrawnRef.current,
            type: state.selectedGeometryType as any,
            style: function (feature) {
              if (
                state.selectedGeometryType === "LineString" ||
                state.selectedGeometryType === "Polygon"
              ) {
                const styles: any = [];
                geometry = feature.getGeometry();
                tipPoint = geometry;
                const type: any = geometry.getType();
                if (
                  type === "LineString" ||
                  type === "Polygon" ||
                  type === "Point"
                ) {
                  styles.push(styleEx);
                  if (type === "Polygon") {
                    point = geometry.getInteriorPoint();
                    label = formatArea(geometry);
                    line = new LineString(geometry.getCoordinates()[0]);
                  } else if (type === "LineString") {
                    point = new PointGeom(geometry.getLastCoordinate());
                    label = formatLength(geometry);
                    line = geometry;
                  }
                }
                if (test && line) {
                  let count = 0;
                  line.forEachSegment(function (a: any, b: any) {
                    const segment = new LineString([a, b]);
                    const label = formatLength(segment);
                    if (segmentStyles.length - 1 < count) {
                      segmentStyles.push(segmentStyle.clone());
                    }
                    const segmentPoint = new PointGeom(
                      segment.getCoordinateAt(0.5)
                    );
                    segmentStyles[count].setGeometry(segmentPoint);
                    segmentStyles[count].getText().setText(label);
                    styles.push(segmentStyles[count]);
                    count++;
                  });
                }
                if (label) {
                  labelStyle.setGeometry(point);
                  labelStyle.getText().setText(label);
                  styles.push(labelStyle);
                }
                return styles;
              } else {
                return styles[state.selectedGeometryType];
              }
            },
            finishCondition: () => {
              // Additional conditions to finish drawing, if needed
              return true;
            },
          });
        } else {
          drawRef.current = new Draw({
            source: sourceDrawnRef.current,
            type: state.selectedGeometryType as any,
            style: styles[state.selectedGeometryType],
            finishCondition: () => {
              // Additional conditions to finish drawing, if needed
              return true;
            },
          });
        }

        mapRef?.current?.addInteraction(modifyDrawer);
        // Create a new snap interaction
        snap = new Snap({ source: sourceDrawnRef.current });
        mapRef.current.addInteraction(snap);
        snap?.setActive(true);
        let listener: any;
        drawRef.current.on("drawstart", () => {
          modifyDrawer.setActive(false);
        });
        drawRef.current.on("drawend", (event: any) => {
          modifyStyle.setGeometry(tipPoint);
          modifyDrawer.setActive(true);
          if (state.selectedGeometryType === "Circle" && !getradius) {
            // If the selected geometry type is Circle and radius is not set,
            // prevent drawing the circle.
            event.preventDefault();
            return;
          }
          unByKey(listener);
          const drawnFeature: any = event.feature;
          let baseName = "";
          let lineName = [];
          const coordinates = [];
          let circleCoordinatesD = [];
          switch (state.selectedGeometryType) {
            case "Point":
              baseName = "Cloud_P";
              lineName = drawnFeaturesState?.point;
              break;
            case "LineString":
              baseName = "Cloud_Line";
              lineName = drawnFeaturesState?.line;
              break;
            case "Polygon":
              baseName = "Cloud_Polygon";
              lineName = drawnFeaturesState?.polygon;
              break;
            case "Circle":
              baseName = "Cloud_Circle";
              lineName = drawnFeaturesState?.polygon;
              drawnFeature.setStyle(circleStyleD);
              // Get the circle's center point and radius
              const center = drawnFeature.getGeometry().getCenter();
              const radius = drawnFeature.getGeometry().getRadius();
              const circleResolution = getradius; // Change resolution as needed
              for (let i = 0; i <= circleResolution; i++) {
                const angle = (Math.PI / 180) * (i / circleResolution) * 360;
                const x = center[0] + radius * Math.cos(angle);
                const y = center[1] + radius * Math.sin(angle);
                circleCoordinatesD.push([x, y]);
              }
              coordinates.push(circleCoordinatesD);
              circleCoordinatesD = [];
              break;
            default:
              baseName = "Cloud_Default";
              lineName = drawnFeaturesState?.point;
              break;
          }
          let result = generateUniqueName(
            baseName,
            counters[state.selectedGeometryType],
            lineName,
            getPointData,
            counters
          );
          drawnFeature.set("name", result);
          snap?.setActive(true);
          // Serialize the drawn feature data
          const geometryType = drawnFeature?.getGeometry()?.getType();
          const feature = drawnFeature;
          const resultCoor = handleConvertToWGS84Drawer({
            geometryType,
            feature,
            utm,
            coordinates,
          });
          const polygonTest =
            geometryType === "Polygon" || geometryType === "Circle"
              ? [resultCoor]
              : resultCoor;
          const serializedFeatureData: any = {
            type: "Feature",
            geometry: {
              type: geometryType,
              coordinates: polygonTest,
            },
            properties: { name: drawnFeature.get("name") },
          };
          dispatch(getDrawnFeatures(serializedFeatureData) as any);
          // Remove the draw interaction after drawing one feature
          mapRef?.current?.removeInteraction(draw as any);
          // Deactivate the snap interaction after drawing one feature
          // Update the counter for the specific geometry type
          setCounters((prevCounters: any) => ({
            ...prevCounters,
            [state.selectedGeometryType]:
              prevCounters[state.selectedGeometryType] + 1,
          }));
          setDrawer("");
        });
        modifyDrawer.setActive(true);
        mapRef.current.addInteraction(drawRef.current);
      }
    }
    return () => {
      // Clean up interactions and layers
      if (mapRef.current && drawRef.current) {
        mapRef.current.removeInteraction(drawRef.current);
      }
      if (mapRef.current && snap) {
        mapRef.current.removeInteraction(snap);
      }
      // document.removeEventListener("keydown", handleKeyPress);
      const clear = selectedCheckboxes.map((item: any) => item.id);
      dispatch(removeSelectedCheckbox(clear));
      setShowLayers(false);
    };
  }, [
    mapRef,
    sourceDrawnRef,
    drawnFeaturesState,
    getDrawnFeatures,
    dispatch,
    counters,
    setCounters,
    state.selectedGeometryType,
    draw,
    drawer,
    getradius,
    test,
  ]);
};

const useAddMeasureInteraction = ({
  drawRef,
  mapRef,
  activeMeature,
  sourceServerRef,
  snap,
  setSelectedName,
  setState,
  utm,
}: any) => {
  useEffect(() => {
    if (!activeMeature || !mapRef.current || !sourceServerRef.current) return;
    // Draw Interaction for LineString
    let line: any;
    let label: any;
    let labelPoint: any;
    let geometry: any;
    const drawInteraction = new Draw({
      source: sourceServerRef.current,
      type: "LineString",
      style: (feature) => {
        const styles = [styleEx];
        let segmentStyles: any = [segmentStyle];
        geometry = feature.getGeometry();
        const type: any = geometry.getType();
        if (type === "LineString" || type === "Polygon" || type === "Point") {
          if (geometry instanceof LineString) {
            labelPoint = new PointGeom(geometry.getLastCoordinate());
            label = formatLengthNew({ line: geometry, utm });
            line = geometry;
          }
          if (line) {
            let count = 0;
            line.forEachSegment(function (a: any, b: any) {
              const segment = new LineString([a, b]);
              const label = formatLengthNew({ line: segment, utm });
              if (segmentStyles.length - 1 < count) {
                segmentStyles.push(segmentStyle.clone());
              }
              const segmentPoint = new PointGeom(segment.getCoordinateAt(0.5));
              segmentStyles[count].setGeometry(segmentPoint);
              segmentStyles[count].getText().setText(label);
              styles.push(segmentStyles[count]);
              count++;
            });
          }
          if (label) {
            labelStyleMeasure.setGeometry(labelPoint);
            labelStyleMeasure.getText().setText(label);
            styles.push(labelStyleMeasure);
          }
          return styles;
        } else {
          return styles[type];
        }
      },
    });
    mapRef.current.addInteraction(drawInteraction);
    drawRef.current = drawInteraction;
    snap = new Snap({ source: sourceServerRef.current });
    mapRef.current.addInteraction(snap);
    snap.setActive(true);
    drawInteraction.on("drawstart", () => {
      setSelectedName(null);
      setState((prevState: any) => ({
        ...prevState,
        selectedGeometryType: "None",
      }));
    });
    // Cleanup on unmount or deactivate
    drawInteraction.on("drawend", (event) => {
      const feature = event.feature;
      feature.setStyle(lineStyleMeasure);
    });
    return () => {
      if (mapRef.current && drawRef.current) {
        mapRef.current.removeInteraction(drawRef.current);
      }
      drawRef.current = null;
    };
  }, [activeMeature, mapRef, sourceServerRef, drawRef]);
};

const showDataP = (pointData: any, utm: any) => {
  let geometry;
  const features = pointData.features
    ?.map((featureData: any) => {
      const geometryType = featureData.geometry.type;
      if (geometryType === "Point") {
        geometry = new PointGeom(featureData.geometry.coordinates);
        geometry.transform("EPSG:4326", utm);
        return new Feature({
          geometry,
          name: featureData.properties.name,
        });
      }
      return null; // Only process Points
    })
    .filter((feature: any) => feature !== null); // Filter out non-Point features
  return features;
};

const useMapSetup = ({
  mapRef,
  sourceDrawnRef,
  getPointData,
  utm,
  layers,
  selectedTileSource,
  sourceServerRef,
  showCoordinate,
  isTest,
  isChecked,
  state,
  clusterRef,
}: any) => {
  const setupMapLayers = useCallback(() => {
    if (mapRef.current) {
      const features = showData(getPointData, utm);
      if (!sourceServerRef.current) {
        sourceServerRef.current = new VectorSource();
      }
      if (!sourceDrawnRef.current) {
        sourceDrawnRef.current = new VectorSource();
      }
      mapRef.current?.getLayers().forEach((layer: any) => {
        if (layer instanceof VectorLayer) {
          mapRef.current?.removeLayer(layer);
        }
      });
      const pointFeatures = showDataP(getPointData, utm);
      const vectorSource = new VectorSource({
        features: pointFeatures,
      });
      clusterRef.current = new Cluster({
        distance: 100,
        source: vectorSource,
      });
      const clusterLayer = new VectorLayer({
        source: clusterRef.current,
        style: showCoordinate,
      });
      mapRef.current.addLayer(clusterLayer);
      sourceServerRef.current.clear();
      sourceServerRef.current?.addFeatures(features);
      let vectorLayerMapBox = new VectorLayer({
        source: sourceServerRef.current,
        style: showCoordinate,
      });
      mapRef.current.addLayer(vectorLayerMapBox);
    }
  }, [
    mapRef,
    sourceServerRef,
    sourceDrawnRef,
    getPointData,
    utm,
    showCoordinate,
  ]);

  useEffect(() => {
    setupMapLayers();
  }, [setupMapLayers, layers, selectedTileSource, isTest, isChecked, state]);
};

const useRectangleDrawing = ({
  sourceDrawnRef,
  mapRef,
  drawnFeaturesState,
  counters,
  getPointData,
  dispatch,
  setCounters,
  drawer,
  utm,
  snap,
}: UseRectangleDrawingProps) => {
  const rectARef = useRef<any>(null);
  const RECTANGLE_TYPE = "rectAngle";
  const BASE_NAME = "Cloud_Rectangle";

  const startRectangleDrawing = useCallback(() => {
    if (!mapRef.current || !sourceDrawnRef.current) return;

    snap = new Snap({ source: sourceDrawnRef.current });
    mapRef.current.addInteraction(snap);
    snap?.setActive(true);
    const drawInteraction = new Draw({
      source: sourceDrawnRef.current,
      type: "Circle", // OpenLayers uses "Circle" type for rectangles with geometryFunction
      geometryFunction: createBox(),
    });

    rectARef.current = drawInteraction;
    mapRef.current.addInteraction(drawInteraction);
    // Create a new snap interaction
    drawInteraction.on("drawend", (event: any) => {
      const drawnFeature = event.feature;
      const lineName = drawnFeaturesState?.polygon || [];
      // Generate unique name for the feature
      const resultName = generateUniqueName(
        BASE_NAME,
        counters[RECTANGLE_TYPE],
        lineName,
        getPointData,
        counters
      );
      drawnFeature.set("name", resultName);
      snap?.setActive(true);
      // Convert to WGS84 coordinates
      const geometryType = drawnFeature.getGeometry().getType();
      const resultCoordinates = handleConvertToWGS84Drawer({
        geometryType,
        feature: drawnFeature,
        utm,
        coordinates: [],
      });

      // Serialize feature data
      const serializedFeatureData = {
        type: "Feature",
        geometry: {
          type: geometryType,
          coordinates: [resultCoordinates],
        },
        properties: { name: resultName },
      };

      // Dispatch the feature data
      dispatch(getDrawnFeatures(serializedFeatureData));

      // Update counters
      setCounters((prevCounters: CountersState) => ({
        ...prevCounters,
        [RECTANGLE_TYPE]: prevCounters[RECTANGLE_TYPE] + 1,
      }));
    });
  }, [
    mapRef,
    sourceDrawnRef,
    drawnFeaturesState,
    counters,
    getPointData,
    dispatch,
    setCounters,
    utm,
  ]);

  const stopRectangleDrawing = useCallback(() => {
    if (rectARef.current && mapRef.current) {
      mapRef.current.removeInteraction(rectARef.current);
      rectARef.current = null;
    }
  }, [mapRef]);

  useEffect(() => {
    if (drawer === RECTANGLE_TYPE) {
      startRectangleDrawing();
    } else {
      stopRectangleDrawing();
    }

    // Clean up the rectangle drawing interaction when the component unmounts
    return () => stopRectangleDrawing();
  }, [drawer, startRectangleDrawing, stopRectangleDrawing]);
};

const useDrawingArcCircle = ({
  setActiveMeature,
  drawer,
  setCirclePoints,
  setArcPoints,
  clickHandlerRectangle,
  isDrawing,
  setIsDrawing,
  setRectAngle,
  mapRef,
  sourceServerRef,
}: UseDrawingArcCircleProps) => {
  const handleCircleThreePoint = useCallback(
    (points: any) => {
      setCirclePoints((prevPoints: any[]) => [...prevPoints, points]);
    },
    [setCirclePoints]
  );
  const handleArcThreePoint = useCallback(
    (points: any[]) => {
      setArcPoints((prevPoints: any) => [...prevPoints, points]);
    },
    [setArcPoints]
  );
  const handleRectAngle = useCallback(
    (event: any) => {
      clickHandlerRectangle({
        event,
        drawer,
        isDrawing,
        setIsDrawing,
        setRectAngle,
      });
    },
    [clickHandlerRectangle, drawer, isDrawing, setIsDrawing, setRectAngle]
  );
  const clickHandler = useCallback(
    (event: any) => {
      setActiveMeature(false);
      const newPoint = event.coordinate;
      const marker = new Feature({
        geometry: new PointGeom(newPoint),
      });
      marker.setStyle(pointStyle);
      sourceServerRef.current.addFeature(marker);
      switch (drawer) {
        case "circleThreePoint":
          handleCircleThreePoint(newPoint);
          break;
        case "arcThreePoint":
          handleArcThreePoint(newPoint);
          break;
        case "rectAngle":
          handleRectAngle(event);
          break;
        default:
          break;
      }
    },
    [drawer, isDrawing]
  );
  useEffect(() => {
    if (
      mapRef.current &&
      ["circleThreePoint", "rectAngle", "arcThreePoint"].includes(drawer)
    ) {
      mapRef.current.on("click", clickHandler);
    }
    return () => {
      if (mapRef.current) {
        mapRef.current.un("click", clickHandler);
      }
    };
  }, [drawer, mapRef]);
};

const useEditModeHandler = ({
  isEditMode,
  modifyInteraction,
  modifyInteractionDrawer,
  setActiveMeature,
  setModifyInteraction,
  setModifyInteractionDrawer,
  mapRef,
  sourceServerRef,
  sourceDrawnRef,
  getPointData,
  handleConvertToWGS84Drawer,
  utm,
  setPointData,
  selectedFeature,
  drawnFeaturesState,
}: editModeHandlerProps) => {
  useEffect(() => {
    if (!isEditMode) {
      modifyInteraction?.setActive(false);
      modifyInteractionDrawer?.setActive(false);
      // setActiveMeature(false);
      setModifyInteraction(null);
      setModifyInteractionDrawer(null);
    }
    // Initialize map, layers, and source
    if (isEditMode && (!modifyInteraction || !modifyInteractionDrawer)) {
      // Activate Modify interaction when entering edit mode
      const modifyServer = new Modify({
        source: sourceServerRef.current,
      });
      const modifyDrawer = new Modify({
        source: sourceDrawnRef.current,
      });
      // const updatedPointData = [...getPointData.features];
      const updatedPointData = {
        features: [...getPointData.features],
        type: "FeatureCollection",
      };
      modifyDrawer.on("modifyend", (event) =>
        handleModifyEnd({
          event,
          updatedPointData: getPointData,
          handleConvertToWGS84Drawer,
          utm,
          setPointData,
        })
      );
      modifyServer.on("modifyend", (event) => {
        handleModifyEnd({
          event,
          updatedPointData,
          handleConvertToWGS84Drawer,
          utm,
          setPointData,
        });
      });
      mapRef?.current?.addInteraction(modifyDrawer);
      mapRef?.current?.addInteraction(modifyServer);
      setModifyInteraction(modifyServer);
      setModifyInteractionDrawer(modifyDrawer);
    }
  }, [
    isEditMode,
    selectedFeature,
    modifyInteraction,
    modifyInteractionDrawer,
    getPointData,
    handleConvertToWGS84Drawer,
    utm,
    setPointData,
    circleCoordinates,
    drawnFeaturesState,
  ]);
};

export {
  useAddMeasureInteraction,
  useDrawing,
  useDrawingArcCircle,
  useEditModeHandler,
  useKeyboardEvents,
  useMapSetup,
  useRectangleDrawing,
  useUpdateArcCircle,
};
