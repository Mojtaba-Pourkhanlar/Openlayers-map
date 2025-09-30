export interface updateArcCircleProps {
  circlePoints: any;
  sourceDrawnRef: any;
  counters: any;
  getPointData: { features: any[]; type: string };
  setDrawnFeatures: any;
  setCounters: any;
  drawnFeaturesState: any;
  dispatch: any;
  arcPoints: any;
  utm: any;
  drawer: any;
  setCirclePoints: any;
  setArcPoints: any;
  radiusThree: any;
}

export interface calculateAndDrawCircleProps {
  points: any;
  sourceRef: any;
  counters: any;
  getPointData: { features: any[]; type: string };
  setDrawnFeatures: any;
  setCounters: any;
  drawnFeaturesState: any;
  dispatch: any;
  utm: any;
  radiusThree: any;
}
export interface handleDeleteSelectedFeatureProps {
  selectedFeature: any;
  pointData: { features: any[]; type: string };
  getPointData: { features: any[]; type: string };
  setPointData: any;
  sourceServerRef: any;
  sourceDrawnRef: any;
  setSelectedFeature: any;
  showData: any;
  utm: any;
  setSelected: any;
  selected: any;
}
export interface editModeHandlerProps {
  isEditMode: any;
  modifyInteraction: any;
  modifyInteractionDrawer: any;
  setActiveMeature: any;
  setModifyInteraction: any;
  setModifyInteractionDrawer: any;
  mapRef: any;
  sourceServerRef: any;
  sourceDrawnRef: any;
  getPointData: { features: any[]; type: string };
  handleConvertToWGS84Drawer: any;
  utm: any;
  setPointData: any;
  selectedFeature: any;
  drawnFeaturesState: any;
}
export interface modifyEndProps {
  event: any;
  updatedPointData: { features: any[]; type: string };
  handleConvertToWGS84Drawer: any;
  utm: any;
  setPointData: any;
}

export interface UseRectangleDrawingProps {
  sourceDrawnRef: React.MutableRefObject<any>;
  mapRef: React.MutableRefObject<any>;
  drawnFeaturesState: any;
  counters: any;
  getPointData: any;
  dispatch: (action: any) => void;
  setCounters: React.Dispatch<React.SetStateAction<any>>;
  drawer: string;
  utm: any;
  snap: any;
}
