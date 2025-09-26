import { createReducer } from "@reduxjs/toolkit";
import * as actions from "../Actions/Projects";

const initialState = {
  listLoading: false,
  project_list: JSON.parse("[]"),
  openproject: null,
  project_page_size: 10,
  project_page_index: 1,
  route: null as string | null,
  name: "" as string,
  id: "" as string | undefined,
  persistentRoute: false,
  listUsers: null as any,
  newUser: null as any,
  getGuid: "" as string,
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(actions.clearAllProject.type, (state) => {
      state.listLoading = false;
      state.listUsers = null;
      state.name = "";
      state.id = "";
      state.getGuid = "";
    })
    .addCase(actions.getAllProject.pending, (state) => {
      state.listLoading = true;
    })
    .addCase(actions.getAllProject.fulfilled, (state, action) => {
      state.project_list = action.payload;
      state.listLoading = false;
    })
    .addCase(actions.setProjectPageSize.fulfilled, (state, action) => {
      state.project_page_size = action.payload.pageSize;
    })
    .addCase(actions.setProjectPageIndex.fulfilled, (state, action) => {
      state.project_page_index = action.payload.pageIndex;
    })
    .addCase(actions.openProject.fulfilled, (state, action) => {
      state.openproject = action.payload;
    })
    .addCase(actions.closeProject.type, (state) => {
      state.openproject = null;
    })
    .addCase(actions.projectName, (state, action) => {
      state.name = action.payload?.name;
      state.id = action.payload?.id;
    })
    .addCase(actions.updateRoute, (state, action) => {
      state.route = (action.payload?.route || initialState.route) as
        | string
        | null;
      state.persistentRoute =
        action.payload?.persistent || initialState.persistentRoute;
    })
    .addCase(actions.clearNewUser.type, (state) => {
      state.newUser = null;
    })
    .addCase(actions.getAllProjectUsers.fulfilled, (state, action) => {
      state.listUsers = action.payload;
    })
    .addCase(actions.setGiveAccess.fulfilled, (state, action) => {
      state.newUser = action.payload;
    })
    .addCase(actions.createProject.fulfilled, (state, action) => {
      state.getGuid = action.payload;
    });
});
