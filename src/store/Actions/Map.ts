import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

export const getMapGuid = createAsyncThunk(
  "map/getMapGuid",
  async (data: string) => {
    return { map_guid: data };
  }
);
export const getMapSearch = createAsyncThunk(
  "map/getMapSearch",
  async (data: string) => {
    return { map_search: data };
  }
);
export const getMapEvalu = createAsyncThunk(
  "map/getMapEvalu",
  async (data: any) => {
    return { assessment: data };
  }
);

export const setMapPageSize = createAsyncThunk(
  "map/setMapPageSize",
  async (data: number) => {
    return { pageSize: data };
  }
);
export const getSearch = createAsyncThunk(
  "map/getSearch",
  async (data: string) => {
    return { search: data };
  }
);

export const setMapPageIndex = createAsyncThunk(
  "map/setMapPageIndex",
  async (data: number) => {
    return { pageIndex: data };
  }
);
export const getEPSG = createAsyncThunk(
  "map/getEPSG",
  async (data: number | string) => {
    return { epsg: data };
  }
);

export const getAllPoint = createAsyncThunk(
  "map/getAllPoint",
  async (data: any[]) => {
    return { point: data };
  }
);
export const getAllPolygon = createAsyncThunk(
  "map/getAllPolygon",
  async (data: any[]) => {
    return { polygon: data };
  }
);
export const getAllLine = createAsyncThunk(
  "map/getAllLine",
  async (data: any[]) => {
    return { line: data };
  }
);
export const clearMapCoordinate = createAction("map/clearMapCoordinate");

// Update the payload type to be an array of strings
export const getTableHeader = createAsyncThunk(
  "map/getTableHeader",
  async (data: { [key: string]: boolean }) => {
    return { header: Object.keys(data).filter((item) => data[item]) } as {
      header: string[];
    };
  }
);

export const clearTableHeader = createAction("map/clearTableHeader");

// Update the payload type to be an array of strings
export const getDrawnFeatures = createAsyncThunk(
  "map/getDrawnFeatures",
  async (data: any) => {
    return data;
  }
);
export const clearDrawnFeatures = createAction("map/clearDrawnFeatures");

export const clearPointDetail = createAction("map/clearPointDetail");
