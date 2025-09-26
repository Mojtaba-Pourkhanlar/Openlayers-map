import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState, ShapeResponceType } from "../interfaces";
import { apiRequest } from "../Middleware";
import { setModal } from "./Root";

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

export const getMapList = createAsyncThunk(
  "map/getMapList",
  async (data: any) => {
    const { response, error } = await apiRequest(
      "get",
      "/api/v1/points",
      null,
      {},
      data
    );
    return response;
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
export const clearMapChart = createAction("map/clearMapChart");

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

export const getPointsList = createAsyncThunk(
  "map/getPointsList",
  async (data: any, { getState }) => {
    const query = (getState() as RootState).map;
    const params = {
      pageSize: query.map_page_size,
      pageIndex: query.map_page_index,
      guid: query.map_guid,
      pointName: query.map_search,
    };
    const body = {
      assessment: data ?? [],
    };
    const { response, error } = await apiRequest(
      "post",
      "/api/v1/points",
      body,
      {},
      params
    );
    return response;
  }
);

export const setMultiPageSize = createAction(
  "setMultiPageSize",
  (data: number) => {
    return { payload: data };
  }
);

export const setMultiPageIndex = createAction(
  "setMultiPageIndex",
  (data: number) => {
    return { payload: data };
  }
);

export const setMultiSearch = createAction("setMultiSearch", (data: string) => {
  return { payload: data };
});

export const getMultiPointsList = createAsyncThunk(
  "map/getMultiPointsList",
  async (_, { getState }) => {
    const query = (getState() as RootState).map;
    const params = {
      pageSize: query.map_list_page_size,
      pageIndex: query.map_list_page_index,
      ...(query.map_list_search && { name: query.map_list_search }),
    };
    const { response, error } = await apiRequest(
      "get",
      `/api/v1/shapes/${query.map_guid}`,
      null,
      {},
      params
    );
    return response;
  }
);
export const getShapeById = createAsyncThunk(
  "map/getShapeById",
  async (params: number, { getState, dispatch }) => {
    const query = (getState() as RootState).map;
    const { response }: { response: ShapeResponceType | null } =
      await apiRequest(
        "get",
        `/api/v1/shapeById/${query.map_guid}`,
        null,
        {},
        params
      );

    if (response?.statusCode === 200) {
      dispatch(setModal({ name: "عارضه", mode: "detail" }));
    }
    return response;
  }
);
export const getPointsListForChart = createAsyncThunk(
  "map/getPointsListForChart",
  async (params: any, { getState }) => {
    const body = {
      assessment: [],
    };
    const { response } = await apiRequest(
      "post",
      "/api/v1/points",
      body,
      {},
      params
    );
    return response;
  }
);

export const getPointsDetail = createAsyncThunk(
  "map/getPointsDetail",
  async (data: { name: string; show: string }, { getState, dispatch }) => {
    const query = (getState() as RootState).map;
    const params = {
      pageSize: 1,
      pageIndex: 1,
      guid: query.map_guid,
      pointName: data.name,
    };
    const body = {
      assessment: [],
    };
    const { response }: { response: any } = await apiRequest(
      "post",
      "/api/v1/points",
      body,
      {},
      params
    );
    if (response) {
      dispatch(setModal({ name: data.show, mode: "detail" }));
    }
    return response?.data.list;
  }
);

export const clearPointDetail = createAction("map/clearPointDetail");
export const clearShapeById = createAction("map/clearShapeById");
