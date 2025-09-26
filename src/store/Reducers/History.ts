import { createReducer } from "@reduxjs/toolkit";
import * as actions from "../Actions/History";

const initialState = {
  historyLoading: false,
  historyList: JSON.parse("[]"),
  pageSize: 10,
  beforeIndex: 1,
  operation: "" as string,
  featureType: "point" as string,
  multiPointList: JSON.parse("[]"),
  isRedirect: false as boolean,
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(actions.getHistoryList.pending, (state, action) => {
      state.historyLoading = true;
    })
    .addCase(actions.getHistoryList.fulfilled, (state, action) => {
      state.historyLoading = false;
      state.historyList = action.payload;
    })
    .addCase(actions.clearHistoryList, (state) => {
      state.historyList = [];
    })
    .addCase(actions.setHistoryPageSize.fulfilled, (state, action) => {
      state.pageSize = action.payload.pageSize;
    })
    .addCase(actions.setHistoryPageIndex.fulfilled, (state, action) => {
      state.beforeIndex = action.payload.pageIndex;
    })
    .addCase(actions.setFilter, (state, action) => {
      state.operation = action.payload.operation;
    })
    .addCase(actions.clearFilter, (state) => {
      state.operation = "";
    })
    .addCase(actions.setPointType, (state, action) => {
      state.featureType = action.payload;
    })
    .addCase(actions.getHistoryMultiPoint.fulfilled, (state, action) => {
      state.multiPointList = action.payload;
    })
    .addCase(actions.clearHistoryMultiPoint, (state) => {
      state.multiPointList = [];
    })
    .addCase(actions.redirectPage, (state, action) => {
      state.isRedirect = action.payload;
    });
});
