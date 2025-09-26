import { getTranslate } from "@/language";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { FilterHistory, RootState } from "../interfaces";
import { apiRequest } from "../Middleware";
import { setModal, setOpenMultiPoint } from "./Root";

const translate = getTranslate();

export const getHistoryList = createAsyncThunk(
  "history/getHistoryList",
  async (params: any, { getState }) => {
    const query = (getState() as RootState).map;
    const { pageSize, beforeIndex } = (getState() as RootState).history;

    const data = {
      beforeIndex,
      pageSize,
      ...params,
    };

    const { response } = await apiRequest(
      "get",
      `/api/v1/history/${query.map_guid}`,
      null,
      {},
      data
    );
    return response;
  }
);

export const setHistoryPageSize = createAsyncThunk(
  "history/setHistoryPageSize",
  async (data: number) => {
    return { pageSize: data };
  }
);

export const setHistoryPageIndex = createAsyncThunk(
  "history/setHistoryPageIndex",
  async (data: number) => {
    return { pageIndex: data };
  }
);

export const clearHistoryList = createAction("history/clearHistoryList");

export const setFilter = createAction("setFilter", (data: FilterHistory) => {
  return { payload: data };
});

export const clearFilter = createAction("history/clearFilter");

export const setPointType = createAction("history/setPointType", (data: any) => {
  return { payload: data };
});

export const getHistoryMultiPoint = createAsyncThunk(
  "history/getHistoryMultiPoint",
  async (params: any, { getState, dispatch }) => {
    const query = (getState() as RootState).map.map_guid;
    const { response }: { response: any } = await apiRequest(
      "get",
      `/api/v1/viewMultiPoint/${query}`,
      null,
      {},
      params
    );
    dispatch(setOpenMultiPoint(true));
    dispatch(setModal({ name: "نقشه", mode: "detail" }));
    return response?.data;
  }
);

export const redirectPage = createAction("redirectPage", (data: boolean) => {
  return { payload: data };
});

export const clearHistoryMultiPoint = createAction(
  "history/clearHistoryMultiPoint"
);
