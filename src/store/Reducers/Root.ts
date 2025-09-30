import { createReducer } from "@reduxjs/toolkit";
import * as actions from "../Actions/Root";

// Check localStorage for the initial value of isDarkMode and direction
const storedDarkMode = JSON.parse(
  localStorage.getItem("Cloud_isDarkMode") || "null"
);
const storedDirection = localStorage.getItem("direction") || "ltr";

const initialState = {
  isDarkMode: storedDarkMode !== "null" ? storedDarkMode : false,
  direction: storedDirection,
  listLoading: false,
  modal: {
    name: "",
    mode: "",
  },
  totalNumber: null,
  pointData: [],
  toast: {
    name: "",
    mode: "",
  },
  selectedCheckboxes: [] as any,
  getProject: [] as any,
  isRefresh: false as boolean,
  isHistory: false as boolean,
  isRouteName: false as boolean,
  isRouteHome: false as boolean,
  isLogout: false as boolean,
  isLoading: true,
  toastify: {
    open: false as boolean,
    type: "" as "info" | "success" | "warning" | "error",
    message: "" as string,
    duration: 2000 as number,
  },
  stepper: 1 as number,
  nationalCode: "" as string,
  useOtpCode: "" as string,
  getHeaderItem: null as any | null,
  evaluationCoord: null as any | null,
  openMultiPoint: false as boolean,
  transferStep: 1,
  uploadLoading: false,
  getDate: {
    start: "" as string,
    end: "" as string,
  },
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(actions.clearAll.type, (state) => {
      state.modal.mode = "";
      state.modal.name = "";
      state.toast.name = "";
      state.toast.mode = "";
      state.listLoading = false;
      state.stepper = 1;
      state.transferStep = 1;
      state.nationalCode = "";
      state.useOtpCode = "";
      state.getHeaderItem = null;
    })
    .addCase(actions.toggleTheme.type, (state) => {
      state.isDarkMode = !state.isDarkMode;
    })
    .addCase(actions.toggleDirection.type, (state) => {
      state.direction = state.direction === "ltr" ? "rtl" : "ltr";
    })
    .addCase(actions.closeModal.type, (state) => {
      state.modal.name = "";
      state.modal.mode = "";
      state.isRefresh = false;
    })
    .addCase(actions.setIsRefresh, (state, action) => {
      state.isRefresh = action.payload;
    })
    .addCase(actions.clearIsRefresh.type, (state) => {
      state.isRefresh = false;
    })
    .addCase(actions.setModal, (state, action) => {
      state.modal.name = action.payload.name;
      state.modal.mode = action.payload.mode;
    })
    .addCase(actions.getTotalNumber, (state, action) => {
      state.totalNumber = action.payload;
    })
    .addCase(actions.getPointData, (state, action) => {
      state.pointData = action.payload;
    })
    .addCase(actions.addSelectedCheckbox, (state, action) => {
      // Remove existing checkbox with the same ID
      state.selectedCheckboxes = state.selectedCheckboxes.filter(
        (item: any) =>
          !action.payload.some((newItem: any) => newItem.id === item.id)
      );
      // Append new checkboxes to the existing state
      state.selectedCheckboxes.push(...action.payload);
    })
    .addCase(actions.removeSelectedCheckbox, (state, action) => {
      // Remove checkboxes based on the provided array
      state.selectedCheckboxes = state.selectedCheckboxes.filter(
        (item: any) => !action.payload.includes(item.id)
      );
    })
    .addCase(actions.getIsHistory, (state, action) => {
      state.isHistory = action.payload;
    })
    .addCase(actions.getIsRouteHome, (state, action) => {
      state.isRouteHome = action.payload;
    })
    .addCase(actions.getIsRouteName, (state, action) => {
      state.isRouteName = action.payload;
    })
    .addCase(actions.setProjectData, (state, action) => {
      state.getProject = action.payload;
    })
    .addCase(actions.closeSnackbar.type, (state) => {
      state.toastify.open = false;
    })
    .addCase(actions.openSnackbar, (state, action) => {
      state.toastify.open = true;
      state.toastify.type = action.payload.type;
      state.toastify.message = action.payload.message;
      state.toastify.duration = action.payload.duration ?? 2000;
    })
    .addCase(actions.setStepper, (state) => {
      state.stepper = state.stepper + 1;
    })
    .addCase(actions.backStepper, (state) => {
      state.stepper = state.stepper - 1;
    })
    .addCase(actions.resetStepper, (state) => {
      state.stepper = 1;
    })
    .addCase(actions.getUserNationalCode.fulfilled, (state, action) => {
      state.nationalCode = action.payload;
    })
    .addCase(actions.getUserOTPCode.fulfilled, (state, action) => {
      state.useOtpCode = action.payload;
    })
    .addCase(actions.setHeaderItems, (state, action) => {
      state.getHeaderItem = action.payload;
    })
    .addCase(actions.clearHeaderItem, (state) => {
      state.getHeaderItem = null;
    })
    .addCase(actions.setEvaluationCoord, (state, action) => {
      state.evaluationCoord = action.payload;
    })
    .addCase(actions.clearEvaluationCoord, (state) => {
      state.evaluationCoord = null;
    })
    .addCase(actions.setIsLoading, (state, action) => {
      state.isLoading = action.payload;
    })
    .addCase(actions.setUploadLoading, (state, action) => {
      state.uploadLoading = action.payload;
    })
    .addCase(actions.setOpenMultiPoint, (state, action) => {
      state.openMultiPoint = action.payload;
    })
    .addCase(actions.nextStep.type, (state) => {
      state.transferStep += 1;
    })
    .addCase(actions.previousStep.type, (state) => {
      state.transferStep -= 1;
    })
    .addCase(actions.setDate, (state, action) => {
      state.getDate.start = action.payload.start;
      state.getDate.end = action.payload.end;
    });
});
