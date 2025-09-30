import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

interface Modal {
  name: string;
  mode: string;
}
interface OpenToastify {
  type: "info" | "success" | "warning" | "error";
  message: string;
  duration?: number;
}
interface DateProps {
  start: string;
  end: string;
}
export const clearIsRefresh = createAction("clearIsRefresh");
export const setIsRefresh = createAction("setIsRefresh", (data: boolean) => {
  return { payload: data };
});
// Theme
export const toggleTheme = createAction("toggleTheme");
// Clear All
export const clearAll = createAction("clearAll");
// Direction
export const toggleDirection = createAction("toggleDirection");
// Modal
export const closeModal = createAction("closeModal");
export const setModal = createAction("setModal", (data: Modal) => {
  return { payload: data };
});
// Table Count
export const getTotalNumber = createAction("getTotalNumber", (data) => {
  return { payload: data };
});
// Table Point
export const getPointData = createAction("getPointData", (data) => {
  return { payload: data };
});
// New actions for handling selected checkboxes
export const addSelectedCheckbox = createAction(
  "addSelectedCheckbox",
  (item: any) => {
    return { payload: item };
  }
);

export const removeSelectedCheckbox = createAction(
  "removeSelectedCheckbox",
  (itemId) => {
    return { payload: itemId };
  }
);

// map table
export const getIsHistory = createAction("getIsHistory", (data: boolean) => {
  return { payload: data };
});
export const getIsRouteName = createAction(
  "getIsRouteName",
  (data: boolean) => {
    return { payload: data };
  }
);
export const getIsRouteHome = createAction(
  "getIsRouteHome",
  (data: boolean) => {
    return { payload: data };
  }
);
export const setLogout = createAction("setLogout", (data: boolean) => {
  return { payload: data };
});
export const setProjectData = createAction("setProjectData", (data: any) => {
  return { payload: data };
});

// Toastify
export const closeSnackbar = createAction("closeSnackbar");
export const openSnackbar = createAction(
  "openSnackbar",
  (data: OpenToastify) => {
    return { payload: data };
  }
);

// Stepprt
export const setStepper = createAction("setStepper");
export const backStepper = createAction("backStepper");
export const resetStepper = createAction("resetStepper");

// get user NationalCode
export const getUserNationalCode = createAsyncThunk(
  "root/getUserNationalCode",
  async (data: string) => {
    return data;
  }
);
export const getUserOTPCode = createAsyncThunk(
  "root/getUserOTPCode",
  async (data: string) => {
    return data;
  }
);

// header Items
export const setHeaderItems = createAction(
  "setHeaderItems",
  (data: any | null) => {
    return { payload: data };
  }
);
export const clearHeaderItem = createAction("clearHeaderItem");
// loading
export const setIsLoading = createAction("root/setIsLoading", (data: boolean) => {
  return { payload: data };
});
// setUploadLoading
export const setUploadLoading = createAction(
  "setUploadLoading",
  (data: boolean) => {
    return { payload: data };
  }
);
// EvaluationCoordinates
export const clearEvaluationCoord = createAction("clearEvaluationCoord");
export const setEvaluationCoord = createAction(
  "setEvaluationCoord",
  (data: any[]) => {
    return { payload: data };
  }
);

// openMultiPoint
export const setOpenMultiPoint = createAction(
  "setOpenMultiPoint",
  (data: boolean) => {
    return { payload: data };
  }
);

// Next Step
export const nextStep = createAction("nextStep");

// previous Step
export const previousStep = createAction("previousStep");

// Date
export const setDate = createAction("setDate", (data: DateProps) => {
  return { payload: data };
});
