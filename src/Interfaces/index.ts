import { RootState } from "@/store/interfaces";
import { AnyAction } from "@reduxjs/toolkit";
import { Feature, Map } from "ol";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Dispatch, MutableRefObject, ReactNode, SetStateAction } from "react";

// Map Component
export interface MapProps {
  pointData: any;
  utm: string;
}
export interface MapLayer {
  id: number;
  name: string;
  icon: JSX.Element;
  active: boolean;
}

export interface PropRectangle {
  event: any;
  drawer: string;
  isDrawing: boolean;
  setRectAngle: (prevPoints: any) => void;
  setIsDrawing: (newValue: boolean) => void;
}

export interface SubMenu {
  name: string;
  path: string;
  component: ReactNode;
  layout: string;
  rules: string[];
}
export interface Menu {
  name: string;
  path: string;
  component: ReactNode;
  layout: string;
  rules: string[];
  menu?: SubMenu[] | null;
}
export interface SidebarMenuItem {
  name: string;
  path: string;
  component: ReactNode;
  icon: ReactNode;
  layout: string;
  rules: string[];
  menu: SubMenu[] | null;
}

export interface CheckboxItem {
  id: number;
  name: string;
  lat: number;
  lon: number;
  date: string;
}
export interface Toast {
  name: string;
  mode: "error" | "info" | "success" | "warning";
}

export interface DrawerDataItem {
  name: string;
  icon: JSX.Element;
}

export interface CountersState {
  Point: number;
  LineString: number;
  Polygon: number;
  Circle: number;
  rectAngle: number;
  Arc: number;
}

export type AppDispatch = Dispatch<RootState>;

export type HandleClearCoordinatesFunction = (props: {
  setPopupVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setDrawnFeatures: React.Dispatch<React.SetStateAction<any[]>>;
  setCounters: React.Dispatch<React.SetStateAction<CountersState>>;
  drawnFeatures: any[];
  sourceDrawnRef: React.MutableRefObject<any>;
  sourceServerRef: React.MutableRefObject<any>;
  dispatch: Dispatch<AnyAction>;
}) => void;

// Define Props Type
export interface HandleMapClickProps {
  mapRef: MutableRefObject<Map | null>;
  setPopupVisible: Dispatch<SetStateAction<boolean>>;
  setPopupContent: Dispatch<SetStateAction<any>>;
  // setPopupCoordinate: [] | any;
  // setIsChange: Dispatch<SetStateAction<boolean>>;
  sourceServerRef: React.RefObject<any>;
  vectorLayerRef: React.RefObject<VectorLayer<any> | null>;
  layers: any;
  setSelectedName: any;
  utm: any;
  selectedFeatureRef: any;
}

export interface UseUTMHandlerProps {
  utm: string;
  map: Map | null;
  mapData: any[];
}
export interface InitialMApProps {
  mapRef: MutableRefObject<Map | null>;
  selectedTileSource: string;
}

export interface UseDrawingArcCircleProps {
  drawer: string;
  setCirclePoints: any;
  setArcPoints: any;
  clickHandlerRectangle: (props: PropRectangle) => void;
  isDrawing: boolean;
  setIsDrawing: (isDrawing: boolean) => void;
  setRectAngle: (points: any[]) => void;
  mapRef: React.MutableRefObject<any>;
  sourceServerRef: React.MutableRefObject<any>;
}

export interface UseMapSetupParams {
  mapRef: React.MutableRefObject<Map | null>;
  sourceDrawnRef: React.MutableRefObject<VectorSource | null>;
  getPointData: { features: any[]; type: string };
  utm: string;
  layers: MapLayer[];
  selectedTileSource: string;
  sourceServerRef: React.MutableRefObject<VectorSource | null>;
  showCoordinate: any;
  isTest: boolean;
  isChecked: boolean;
  state: { selectedGeometryType: string };
  drawnFeatures: Feature[];
}

export interface ProjectColumns {
  id: number;
  customerId: number;
  ownerName: string;
  path: string;
  name: string;
  checksum: string;
  guid: string;
  createdAt: string;
  updatedAt: string;
  createdIn: string;
  description: string;
  geoidName: string;
  epsg: number;
  hasLocalization: false;
  localization: string;
  localizationParam: string;
  isCadastre: boolean;
  hasTransformation: boolean;
  size: number;
  isSync: boolean;
  modifiedBy: string;
}
export interface HistoryColumns {
  rowId: number;
  status: string;
  feature: {
    properties: {
      name: string;
      uuid: string;
      fullName: string;
      createAt: string;
    };
    geometry: {
      coordinates: number[];
      type: string;
    };
  };
  FeatureAfter: {
    properties: {
      name: string;
      uuid: string;
      fullName: string;
      createAt: string;
    };
    geometry: {
      coordinates: number[];
      type: string;
    };
  };
  featureBefore: {
    properties: {
      name: string;
      uuid: string;
      fullName: string;
      createAt: string;
    };
    geometry: {
      coordinates: number[];
      type: string;
    };
  };
}

export interface MultiPointByID {
  id: number;
  name: string;
  lat: number;
  lon: number;
  height: number;
  color: string;
  lable: string;
}

export interface MultiPointColumns {
  idRayDb: number;
  nameRayDb: string;
  dateRayDb: string;
  pointIdsRayDb: string;
  lineTypeRayDb: number;
  picture: string;
  multipointColor: string;
}
