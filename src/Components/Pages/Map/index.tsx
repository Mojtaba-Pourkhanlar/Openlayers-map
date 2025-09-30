import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// Openlayers
import { Feature, Map } from "ol";
import { Draw, Modify, Select, Snap } from "ol/interaction.js";
import { Cluster, Vector as VectorSource } from "ol/source";
// Core
import { Control } from "./components/Control";
import { Filter } from "./components/Filter";
import MapDrawer from "./components/MapDrawer";
import { Popup } from "./components/Popup";
import { ChangeTiles, tileSources } from "./components/Tiles";
// Redux
import { clearDrawnFeatures, getDrawnFeatures } from "@/store/Actions/Map";
// Map Hook
import {
  addMapClickHandler,
  cleanupMap,
  clickHandlerRectangle,
  drawerData,
  handleConvertToWGS84Drawer,
  handleGeometryTypeChange,
  highlightedStyle,
  initializeMap,
  memoizedStyleFunction,
  showData,
  updateMapLayers,
  useUTMHandler,
} from "./Hook";
import {
  useAddMeasureInteraction,
  useDrawing,
  useDrawingArcCircle,
  useEditModeHandler,
  useKeyboardEvents,
  useMapSetup,
  useRectangleDrawing,
  useUpdateArcCircle,
} from "./Hook/useEffect";
// Interfaces
import { CountersState, MapLayer, MapProps } from "@/Interfaces";
import { RootState } from "@/store/interfaces";
// Icon
import { ReactComponent as Line } from "@/assets/svg/line.svg";
import { ReactComponent as CurLocation } from "@/assets/svg/mapIcon/3d-viewer.svg";
import { ReactComponent as MeatrueIcon } from "@/assets/svg/mapIcon/meature.svg";
import { ReactComponent as Point } from "@/assets/svg/point.svg";
import { ReactComponent as Polygon } from "@/assets/svg/polygon.svg";
import { ReactComponent as Search } from "@/assets/svg/search.svg";
import { ReactComponent as Top } from "@/assets/svg/top.svg";
// Style
import {
  BoxInputContainer,
  BoxInputContainerSMNEW,
  BoxLayers,
  BoxLayersSM,
  BoxOpenGeoJson,
  BoxSearch,
  BoxSearchSMNEW,
  CRNLocation,
  DivLocation,
  Input,
  InputTextSearch,
  LayerStyle,
  MapBox,
  ShowGeoJson,
} from "../Style";
import { MapContainer, styles } from "./Style";
import "./components/style.css";
// Language
import VectorLayer from "ol/layer/Vector";
import { transform } from "ol/proj";
import "./Hook/styleTest.css";
import JsonViewer from "./components/JsonViewer/index";
import "./components/style.css";
import Tooltip from "@/Components/Common/Core/Tooltip";
import Box from "@/Components/Common/Core/Box";

const MapComponent = ({ pointData, utm }: MapProps) => {
  // Map Ref
  const mapRef: any = useRef<Map | null>(null);
  const drawRef = useRef<Draw | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const sourceServerRef = useRef<VectorSource | any>(null); // Vector source for server features
  const sourceDrawnRef = useRef<VectorSource | any>(null); // Vector source for drawn features
  const vectorLayerRef = useRef<VectorLayer<VectorSource> | null>(null);
  const clusterRef = useRef<Cluster | any>(null); // Dynamic clusters
  const selectedFeatureRef = useRef<any>(null);
  const prevStylesRef = useRef(new window.Map<any, any>());

  // redux
  const dispatch = useDispatch();
  const selectedCheckboxes = useSelector(
    (state: RootState) => state?.root.selectedCheckboxes
  );
  const drawnFeaturesState = useSelector(
    (state: RootState) => state?.map.drawnFeaturesState
  );
  // All State
  const [selectedTileSource, setSelectedTileSource] = useState("streets");
  const [search, setSearch] = useState<string>("");
  const [drawer, setDrawer] = useState<string>("");
  const [openSearch, setOpenSearch] = useState(false);
  const [, setShowLayers] = useState<boolean>(false); // showLayers
  const [fullScreen, setFullScreen] = useState(false);
  const [isChecked] = useState<boolean>(false);
  const [state, setState] = useState<{ selectedGeometryType: string }>({
    selectedGeometryType: "None",
  });
  const [drawnFeatures, setDrawnFeatures] = useState<Feature[]>([]);
  const [counters, setCounters] = useState<CountersState>({
    Point: 1,
    LineString: 1,
    Polygon: 1,
    Circle: 1,
    rectAngle: 1,
    Arc: 1,
  });
  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  const [popupContent, setPopupContent] = useState<any>(null);
  const [popupCoordinate, setPopupCoordinate] = useState([]);
  const [circlePoints, setCirclePoints] = useState<number[][]>([]);
  const [arcPoints, setArcPoints] = useState<number[][]>([]);
  const [, setRectAngle] = useState<any>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  // Open Filter
  const [open, setOpen] = useState(false);
  // Filter Coordinate
  const [layers, setLayers] = useState<MapLayer[]>([
    { icon: <Point />, name: "Point", id: 2, active: true },
    {
      icon: <Line style={{ marginLeft: "7px" }} />,
      name: "LineString",
      id: 1,
      active: true,
    },
    { icon: <Polygon />, name: "Polygon", id: 3, active: true },
  ]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [modifyInteraction, setModifyInteraction] = useState<Modify | null>(
    null
  );
  const [modifyInteractionDrawer, setModifyInteractionDrawer] =
    useState<Modify | null>(null);
  // Define state to hold selected feature
  const [selectedFeature, setSelectedFeature] = useState<any>(null);
  const [selectedName, setSelectedName] = useState<any>(null);
  // Data
  const [getPointData, setPointData] = useState<{
    features: any[];
    type: string;
  }>(pointData);

  const [isTest, setIsTest] = useState<boolean>(false);
  const [getradius, setRadius] = useState<string>("65");
  const [radiusThree, setRadiusThree] = useState<string>("65");
  // change style
  const [ShowGeojson, setShowGeojson] = useState<boolean>(false);
  const [activeMeature, setActiveMeature] = useState(false);
  const [getMeasure, setMeasure] = useState<string | null>(null);
  let test = true;
  let draw: Draw | null = sourceDrawnRef?.current;
  let snap: Snap | null = null;
  const showCoordinate = memoizedStyleFunction({
    layers,
    mapRef,
    selectedName,
    clusterRef,
    selectedFeatureRef,
  });

  useEffect(() => {
    if (!mapRef.current) {
      // Separation of map creation into a separate function
      initializeMap({ mapRef, selectedTileSource });
    }
    // Seperate updating layers into a separate function
    updateMapLayers({ mapRef, selectedTileSource });
    // Add the click event to the map in a standalone function
    addMapClickHandler({
      mapRef,
      setPopupVisible,
      setPopupContent,
      vectorLayerRef,
      setSelectedName,
      selectedFeatureRef,
    });
    useUTMHandler(utm, mapRef?.current, getPointData?.features, true);
    return () => cleanupMap(mapRef); // Cleaning function
  }, [mapRef, tileSources, selectedTileSource, utm]);

  useEffect(() => {
    if (selectedName === null) {
      if (selectedFeatureRef.current) {
        selectedFeatureRef.current.setStyle(null);
      }
    }
  }, [selectedName]);

  useEffect(() => {
    if (!sourceServerRef.current || !clusterRef.current) return;
    const features = showData(getPointData, utm);

    const filtered = features.filter((f: any) => {
      const geometryType = f.getGeometry().getType();
      const layer = layers.find(
        (l: any) => l.name.toLowerCase() === geometryType.toLowerCase()
      );
      return layer?.active;
    });

    const pointFeatures = filtered.filter(
      (f: any) => f.getGeometry().getType() === "Point"
    );
    const otherFeatures = filtered.filter(
      (f: any) => f.getGeometry().getType() !== "Point"
    );

    const clusterSource = clusterRef.current.getSource();
    clusterSource.clear();
    clusterSource.addFeatures(pointFeatures);

    sourceServerRef.current.clear();
    sourceServerRef.current.addFeatures(otherFeatures);

    clusterRef.current.changed();
    vectorLayerRef.current?.changed();
  }, [layers, getPointData, utm]);

  // Reset selected Geometry Type and popup Measure
  useAddMeasureInteraction({
    drawRef,
    mapRef,
    activeMeature,
    sourceServerRef,
    snap,
    setSelectedName,
    setState,
    utm,
  });

  // Hook drawing the coordinates of circle، arc and circle 3 point
  useDrawingArcCircle({
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
  });

  // Disable selected coordinates
  const handleEscape = () => {
    setDrawer("");
    setMeasure(null);
    setSelectedName(null);
    setPopupContent(null);
    setActiveMeature(false);
    setPopupVisible(false);
    setState((prevState: any) => ({
      ...prevState,
      selectedGeometryType: "None",
    }));
  };
  //...................
  useKeyboardEvents(handleEscape);
  //...................
  // This hook is very important It has the task of drawing the rest of the coordinates + editing and naming for popup
  useDrawing({
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
  });

  // Implementation of the primary layers of the map
  useMapSetup({
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
    drawnFeatures,
    clusterRef,
  });

  // Implementation of Rectangle drawing and naming for each drawing
  useRectangleDrawing({
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
  });

  // Implementation of circleThreePoint and arcThreePoint drawing
  useUpdateArcCircle({
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
  });

  // Enable coordinate editing
  useEditModeHandler({
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
  });

  // Disable Mouse Select to edit and not change the appearance of the mouse cursor
  useEffect(() => {
    // Initialize map, layers, and source
    if (isEditMode && state.selectedGeometryType === "None") {
      const select = new Select({
        style: null,
      });
      select.on("select", handleFeatureSelect);
      mapRef?.current?.addInteraction(select);
    }
    if (isEditMode) {
      setState((prevState: any) => ({
        ...prevState,
        selectedGeometryType: "None",
      }));
      setDrawer("");
    }
  }, [
    isEditMode,
    state.selectedGeometryType,
    modifyInteraction,
    modifyInteractionDrawer,
  ]);

  // Implement the deletion function logic
  useEffect(() => {
    if (state.selectedGeometryType !== "None" && !isEditMode) {
      const snapD = new Snap({
        source: sourceServerRef.current,
      });
      mapRef?.current?.addInteraction(snapD);
    }

    if (state.selectedGeometryType === "None" && !isEditMode && drawer === "") {
      const select = new Select({
        style: null,
      });
      select.on("select", handleFeatureSelect);
      mapRef?.current?.addInteraction(select);
    }
    if (drawnFeaturesState.length !== 0) {
      const updatedPointData = {
        features: [...getPointData.features, ...drawnFeaturesState],
        type: "FeatureCollection",
      };
      setPointData(updatedPointData);
      dispatch(clearDrawnFeatures());
      sourceDrawnRef.current.clear();
      const features = showData(updatedPointData, utm);
      sourceServerRef.current?.addFeatures(features);
    }
  }, [
    isEditMode,
    state.selectedGeometryType,
    modifyInteraction,
    modifyInteractionDrawer,
    drawnFeaturesState,
    sourceDrawnRef,
    sourceServerRef,
    pointData,
  ]);

  // Specify the selected coordinates
  const handleFeatureSelect = (event: any) => {
    const selectedFeatures = event.selected;
    const selectedFeature =
      selectedFeatures.length > 0 ? selectedFeatures[0] : null;
    setSelectedFeature(selectedFeature);
  };

  // Searching the value written in search input
  const normalize = (s: string) => (s ?? "").toString().trim().toLowerCase();
  const getRealFeature = (f: any) => {
    const inner = f?.get?.("features");
    return Array.isArray(inner) && inner.length ? inner[0] : f;
  };
  const getAllFeaturesFromMap = (map: any) => {
    const layers = map?.getLayers?.().getArray?.() ?? [];
    const feats: any[] = [];
    layers.forEach((ly: any) => {
      const src = ly?.getSource?.();
      const lyFeatures = src?.getFeatures?.();
      if (Array.isArray(lyFeatures)) feats.push(...lyFeatures);
    });
    return feats;
  };
  const clearPreviousHighlights = () => {
    prevStylesRef.current.forEach((style: any, feat: any) => {
      const real = getRealFeature(feat);
      real.setStyle(style ?? null);
    });
    prevStylesRef.current.clear();
  };

  const handleSearch = (e: any) => {
    if (e.key !== "Enter" || !search) return;
    const q = normalize(search);
    clearPreviousHighlights();
    const map = mapRef.current;
    if (!map) return;
    const allFeatures = getAllFeaturesFromMap(map);
    const matches = allFeatures.map(getRealFeature).filter((f) => {
      const n = normalize(f.get("name"));
      return n === q || (q.length >= 2 && n.includes(q));
    });
    if (matches.length === 0) return;
    const geom = matches[0].getGeometry();
    if (geom?.getType?.() === "Point") {
      let coords = geom.getCoordinates();
      const viewProj = map.getView().getProjection().getCode();
      if (utm === "EPSG:32639" && viewProj === "EPSG:3857") {
        coords = transform(coords, "EPSG:32639", "EPSG:3857");
      }
      map.getView().animate({
        center: coords,
        zoom: 23,
        duration: 500,
      });
    }
    matches.forEach((feat) => {
      if (!prevStylesRef.current.has(feat)) {
        prevStylesRef.current.set(feat, feat.getStyle?.() ?? null);
      }
      feat.setStyle(highlightedStyle);
    });
  };

  const handleChange = (e: any) => {
    const val = e.target.value;
    setSearch(val);
    if (val === "") {
      mapRef.current?.getView().animate({ duration: 500 });
      clearPreviousHighlights();
      handleEscape?.();
    }
  };

  // Enable states to start editing coordinates
  const editCoordinates = () => {
    setIsEditMode(!isEditMode);
    setIsTest(false);
  };

  // Reset all statuses after exiting the map
  useEffect(() => {
    return () => {
      // dispatch(clearMapCoordinate() as any);
      setSelectedTileSource("streets");
      setSearch("");
      setDrawer("");
      setOpenSearch(false);
      setShowLayers(false);
      setFullScreen(false);
      setState({
        selectedGeometryType: "None",
      });
      setDrawnFeatures([]);
      setCounters({
        Point: 1,
        LineString: 1,
        Polygon: 1,
        Circle: 1,
        rectAngle: 1,
        Arc: 1,
      });
      setPopupVisible(false);
      setPopupContent(null);
      setPopupCoordinate([]);
      setCirclePoints([]);
      setArcPoints([]);
      setRectAngle([]);
      setIsDrawing(false);
      setOpen(true);
      setMeasure(null);
      // setActiveMeature(false);
      setIsEditMode(false);
      setModifyInteraction(null);
      setModifyInteractionDrawer(null);
      setSelectedFeature(null);
      setPointData(pointData?.features);
      setIsTest(false);
      setRadius("65");
      setRadiusThree("65");
    };
  }, []);

  const closeHandler = () => {
    if (mapRef.current && drawRef.current) {
      mapRef.current.removeInteraction(drawRef.current);
    }
    setSelectedName(null);
    setPopupVisible(false);
    setState((prevState: any) => ({
      ...prevState,
      selectedGeometryType: "None",
    }));
  };

  return (
    <>
      <MapContainer $openJson={ShowGeojson}>
        <JsonViewer
          isShow={ShowGeojson}
          jsonData={getPointData}
          setPointData={setPointData}
          selected={selectedFeature}
        />
        <MapBox
          id="map"
          open={fullScreen}
          cursor={state.selectedGeometryType || drawer}
        >
          <LayerStyle>
            <BoxLayers>
              <BoxLayersSM>
                <Filter
                  open={open}
                  setOpen={setOpen}
                  layers={layers}
                  setLayers={setLayers}
                  getPointData={getPointData}
                  drawnFeaturesState={drawnFeaturesState}
                  setPointData={setPointData}
                  utm={utm}
                  setIsTest={setIsTest}
                  sourceDrawnRef={sourceDrawnRef}
                  sourceServerRef={sourceServerRef}
                  isEditMode={isEditMode}
                  setOpenSearch={setOpenSearch}
                />
                <Tooltip text={"جست و جو مختصات"}>
                  <div>
                    <Input
                      placeholder="جست و جو نام عارضه"
                      type="text"
                      onChange={(e) => handleChange(e)}
                      onKeyDown={(e) => handleSearch(e)}
                      value={search}
                      icon={
                        <Box style={{ margin: "0px 0px 8px -6px" }}>
                          <Search onClick={(e) => handleSearch(e)} />
                        </Box>
                      }
                    />
                  </div>
                </Tooltip>
              </BoxLayersSM>
            </BoxLayers>
          </LayerStyle>

          <BoxInputContainerSMNEW>
            <InputTextSearch $show={openSearch}>
              {openSearch && (
                <Input
                  placeholder="جست و جو بر اساس اسم..."
                  type="text"
                  onChange={(e) => handleChange(e)}
                  onKeyDown={(e) => handleSearch(e)}
                  value={search}
                />
              )}
            </InputTextSearch>
          </BoxInputContainerSMNEW>

          <MapDrawer
            drawer={drawer}
            setDrawer={setDrawer}
            state={state}
            handleGeometryTypeChange={handleGeometryTypeChange}
            drawerData={drawerData}
            isEditMode={isEditMode}
            editCoordinates={editCoordinates}
            setState={setState}
            setIsEditMode={setIsEditMode}
            openJson={ShowGeojson}
          />
          <ShowGeoJson>
            <Tooltip text={!ShowGeojson ? "بازکردن لیست GeoJson" : "بستن لیست"}  position="left">
              <BoxOpenGeoJson
                $isShow={ShowGeojson}
                onClick={() => setShowGeojson(!ShowGeojson)}
              >
                <Top style={{ margin: "5px 0 0 8px" }} />
              </BoxOpenGeoJson>
            </Tooltip>
          </ShowGeoJson>

          <DivLocation>
            <div
              id="current-location-con"
              onClick={() => {
                useUTMHandler(
                  utm,
                  mapRef?.current,
                  getPointData?.features,
                  true
                );
                closeHandler();
              }}
            >
              <Tooltip text={"برگشت به موقعیت اولیه"}>
                <div className="current-location">
                  <CurLocation />
                </div>
              </Tooltip>
            </div>
            <div
              id="meatrue-con"
              onClick={() => {
                setPopupVisible(false);
                closeHandler();
                setTimeout(() => {
                  setActiveMeature(!activeMeature);
                }, 100);
              }}
              style={{
                background: activeMeature ? "#66bb6a" : "#fff",
              }}
            >
              <Tooltip text={"اندازه گیری"}>
                <MeatrueIcon />
              </Tooltip>
            </div>
          </DivLocation>
          <Control
            fullScreen={fullScreen}
            setFullScreen={setFullScreen}
            mapRef={mapRef}
          />

          {popupVisible && (
            <Popup
              coordinate={popupCoordinate}
              content={popupContent}
              measure={getMeasure}
              onClose={() => setPopupVisible(false)}
              open={open}
              setShowMeasure={setActiveMeature}
              utm={utm}
            />
          )}
        </MapBox>
        <div
          ref={popupRef}
          style={{
            padding: "5px",
            background: "#fff",
            borderRadius: "8px 8px 8px 0",
            pointerEvents: "auto",
            zIndex: 1,
            transform: "translate(-80vw, -40vw)",
          }}
        />
      </MapContainer>
    </>
  );
};

export default MapComponent;
{
  /* <ChangeTiles
            showLayers={showLayers}
            selectedTileSource={selectedTileSource}
            setShowLayers={setShowLayers}
            setSelectedTileSource={setSelectedTileSource}
          /> */
}
