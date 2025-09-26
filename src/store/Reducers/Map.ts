import { createReducer } from "@reduxjs/toolkit";
import * as actions from "../Actions/Map";

const initialState = {
  listLoading: false,
  map_list: JSON.parse("[]"),
  chart_list: JSON.parse("[]"),
  map_page_size: 10,
  map_page_index: 1,
  map_guid: "" as string,
  map_search: "" as string,
  epsg: "" as string | number,
  search: "" as any,
  point: [] as any[],
  line: [] as any[],
  assessment: [] as any[],
  polygon: [] as any[],
  header: null as string[] | null,
  drawnFeaturesState: [] as any[],
  pointDetail: JSON.parse("[]"),
  map_list_page_size: 10,
  map_list_page_index: 1,
  map_list_guid: "" as string,
  map_list_search: "" as string,
  map_list_multi: JSON.parse("[]"),
  map_shape_byID: JSON.parse("[]"),
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(actions.getPointsList.pending, (state) => {
      state.listLoading = true;
    })
    .addCase(actions.getPointsList.fulfilled, (state, action) => {
      state.map_list = action.payload;
      state.listLoading = false;
    })
    .addCase(actions.getPointsListForChart.pending, (state) => {
      state.listLoading = true;
    })
    .addCase(actions.getPointsListForChart.fulfilled, (state, action) => {
      state.chart_list = action.payload;
      state.listLoading = false;
    })
    .addCase(actions.setMapPageSize.fulfilled, (state, action) => {
      state.map_page_size = action.payload.pageSize;
    })
    .addCase(actions.setMapPageIndex.fulfilled, (state, action) => {
      state.map_page_index = action.payload.pageIndex;
    })
    .addCase(actions.getMapGuid.fulfilled, (state, action) => {
      state.map_guid = action.payload?.map_guid;
    })
    .addCase(actions.getMapSearch.fulfilled, (state, action) => {
      state.map_search = action.payload?.map_search;
    })
    .addCase(actions.getMapEvalu.fulfilled, (state, action) => {
      state.assessment = action.payload?.assessment;
    })
    .addCase(actions.getEPSG.fulfilled, (state, action) => {
      state.epsg = action.payload?.epsg;
    })
    .addCase(actions.getSearch.fulfilled, (state, action) => {
      state.search = action.payload?.search;
    })
    .addCase(actions.getAllPoint.fulfilled, (state, action) => {
      state.point = [...state.point, ...action.payload.point];
    })
    .addCase(actions.getAllPolygon.fulfilled, (state, action) => {
      state.polygon = [...state.polygon, ...action.payload.polygon];
    })
    .addCase(actions.getAllLine.fulfilled, (state, action) => {
      state.line = [...state.line, ...action.payload.line];
    })
    .addCase(actions.clearMapCoordinate.type, (state) => {
      state.point = [];
      state.polygon = [];
      state.line = [];
    })
    .addCase(actions.getTableHeader.fulfilled, (state, action) => {
      state.header = ["id_ray_db", ...action.payload.header];
    })
    .addCase(actions.clearTableHeader.type, (state) => {
      state.header = null;
    })
    .addCase(actions.getDrawnFeatures.fulfilled, (state, action) => {
      state.drawnFeaturesState = [...state.drawnFeaturesState, action.payload];
    })
    .addCase(actions.clearDrawnFeatures.type, (state) => {
      state.drawnFeaturesState = [];
    })
    .addCase(actions.getPointsDetail.fulfilled, (state, action) => {
      state.pointDetail = action.payload;
    })
    .addCase(actions.clearPointDetail.type, (state) => {
      state.pointDetail = [];
    })

    .addCase(actions.setMultiPageSize, (state, action) => {
      state.map_list_page_size = action.payload;
    })
    .addCase(actions.setMultiPageIndex, (state, action) => {
      state.map_list_page_index = action.payload;
    })
    .addCase(actions.getMultiPointsList.pending, (state) => {
      state.listLoading = true;
    })
    .addCase(actions.getMultiPointsList.fulfilled, (state, action) => {
      state.map_list_multi = action.payload;
      state.listLoading = false;
    })
    .addCase(actions.setMultiSearch, (state, action) => {
      state.map_list_search = action.payload;
    })
    .addCase(actions.getShapeById.fulfilled, (state, action) => {
      state.map_shape_byID = action.payload;
    })
    .addCase(actions.clearShapeById.type, (state) => {
      state.map_shape_byID = [];
    })
    .addCase(actions.clearMapChart.type, (state) => {
      state.chart_list = JSON.parse("[]");
    });
});
