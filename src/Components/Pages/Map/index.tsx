import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// Openlayers
import { Feature, Map } from "ol";
import { Draw, Modify, Select, Snap } from "ol/interaction.js";
import { Cluster, Vector as VectorSource } from "ol/source";
// Core
import { Filter } from "./components/Filter";
// import MapDrawer from "./components/MapDrawer";
import { Popup } from "./components/Popup";
import { tileSources } from "./components/Tiles";
// Redux
import { clearDrawnFeatures, getDrawnFeatures } from "@/store/Actions/Map";
// Map Hook
import {
  addMapClickHandler,
  cleanupMap,
  clickHandlerRectangle,
  drawerData,
  handleConvertToWGS84Drawer,
  handleDeleteSelectedFeature,
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
// Style
import {
  BoxInputContainer,
  BoxInputContainerSMNEW,
  BoxLayers,
  BoxLayersSM,
  BoxSearch,
  BoxSearchSMNEW,
  CRNLocation,
  Input,
  InputTextSearch,
  LayerStyle,
  MapBox,
} from "../Style";
import { DivLocation, MapContainer, styles } from "./Style";
import "./components/style.css";
// Language
import { getTranslate } from "@/language";
import VectorLayer from "ol/layer/Vector";
import { transform } from "ol/proj";
import "./Hook/styleTest.css";
import "./components/style.css";
import JsonViewer from "./components/JsonViewer";
import { Control } from "./components/Control";

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
  // redux
  const dispatch = useDispatch();
  const rootState = useSelector((state: RootState) => state?.root);
  const mapData = useSelector((state: RootState) => state?.map);
  const { drawnFeaturesState } = mapData;
  const { selectedCheckboxes } = rootState;
  // All State
  const [selectedTileSource, setSelectedTileSource] = useState("streets");
  const [search, setSearch] = useState<string>("");
  const [drawer, setDrawer] = useState<string>("");
  const [openSearch, setOpenSearch] = useState(false);
  const [showLayers, setShowLayers] = useState<boolean>(false);
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
  // Open Custome Style
  const [isOpen, setIsOpen] = useState(false);
  const [pointName, setPointName] = useState("point5");
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
  // Delete
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [isTest, setIsTest] = useState<boolean>(false);
  const [getradius, setRadius] = useState<string>("65");
  const [radiusThree, setRadiusThree] = useState<string>("65");
  // change style
  const [isChange, setIsChange] = useState<boolean>(false);
  const [ShowGeojson, setShowGeojson] = useState<boolean>(false);
  const [activeMeasure, setActiveMeature] = useState(false);

  let test = true;
  let draw: Draw | null = sourceDrawnRef?.current;
  let snap: Snap | null = null;
  const showCoordinate = memoizedStyleFunction({
    layers,
    mapRef,
    selectedName,
    clusterRef,
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
      // setPopupCoordinate,
      // setIsChange,
      sourceServerRef,
      vectorLayerRef,
      layers,
      setSelectedName,
      utm,
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

  useAddMeasureInteraction({
    drawRef,
    mapRef,
    activeMeasure,
    sourceServerRef,
    snap,
    setSelectedName,
    setState,
  });

  // Hook drawing the coordinates of circle، arc and circle 3 point
  useDrawingArcCircle({
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
    setActiveMeature(false);
    setPopupVisible(false);
    setIsOpen(false);
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
    mapData,
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
    sourceServerRef,
    showCoordinate,
    isChecked,
    clusterRef,
    state,
  });

  // Implementation of Rectangle drawing and naming for each drawing
  useRectangleDrawing({
    sourceDrawnRef,
    mapRef,
    mapData,
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
    mapData,
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
      setIsDelete(false);
    }
  }, [
    isEditMode,
    state.selectedGeometryType,
    modifyInteraction,
    modifyInteractionDrawer,
    isDelete,
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
    if (isDelete) {
      modifyInteraction?.setActive(false);
      modifyInteractionDrawer?.setActive(false);
      setIsEditMode(false);
      setState((prevState: any) => ({
        ...prevState,
        selectedGeometryType: "None",
      }));
      setDrawer("");
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
    isDelete,
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
  const handleSearch = (e: any) => {
    if (e.key === "Enter" && search) {
      const filteredPointData = getPointData?.features?.filter(
        (featureData: any) => featureData.properties.name.includes(search)
      );
      if (filteredPointData.length > 0) {
        const firstCoordinate = filteredPointData[0];
        const [longitude, latitude] = firstCoordinate.geometry.coordinates;
        const name = search;
        mapRef.current?.getView().animate({
          center: transform([longitude, latitude], "EPSG:4326", utm),
          zoom: 23,
          duration: 500,
        });
        const feature = mapRef.current
          ?.getLayers()
          .getArray()
          .reduce((acc: any, layer: any) => {
            if (layer.getSource && layer.getSource().getFeatures) {
              const features = layer.getSource().getFeatures();
              return acc.concat(features);
            }
            return acc;
          }, [])
          .find((f: any) => f.get("name") === name);
        if (feature) {
          feature.setStyle(highlightedStyle);
        }
      }
    }
  };

  // Resetting the map after deleting the searched item
  const handleChange = (e: any) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      mapRef.current?.getView().animate({
        duration: 500,
      });
      handleEscape();
    }
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
      setIsEditMode(false);
      setModifyInteraction(null);
      setModifyInteractionDrawer(null);
      setSelectedFeature(null);
      setSelectedName(null);
      setPointData(pointData?.features);
      setIsDelete(false);
      setIsTest(false);
      setRadius("65");
      setRadiusThree("65");
      setIsChange(false);
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
      <MapContainer $openJson={false}>
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
                <BoxSearch
                  $show={openSearch}
                  onClick={() => setOpenSearch(!openSearch)}
                >
                  <Search />
                </BoxSearch>
              </BoxLayersSM>
              <BoxInputContainer>
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
              </BoxInputContainer>
            </BoxLayers>
          </LayerStyle>

          <BoxSearchSMNEW
            $show={openSearch}
            onClick={() => {
              setOpenSearch(!openSearch);
              setOpen(false);
            }}
          >
            <Search />
          </BoxSearchSMNEW>

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
              <div className="current-location">
                <CurLocation
                  style={{
                    padding: "2px",
                  }}
                />
              </div>
            </div>

            <div
              id="meatrue-con"
              onClick={() => {
                setPopupVisible(false);
                closeHandler();
                setTimeout(() => {
                  setActiveMeature(!activeMeasure);
                }, 100);
              }}
              onDoubleClick={() => {
                console.log("");
              }}
              style={{
                background: activeMeasure ? "#66bb6a" : "#fff",
              }}
            >
              <MeatrueIcon />
            </div>
          </DivLocation>
          <Control
            fullScreen={fullScreen}
            setFullScreen={setFullScreen}
            mapRef={mapRef}
          />

          {popupVisible && (
            <Popup content={popupContent} open={open} utm={utm} />
          )}
        </MapBox>
      </MapContainer>
    </>
  );
};

export default MapComponent;
