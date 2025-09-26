export interface RootState {
  root: {
    isDarkMode: boolean;
    direction: string;
    listLoading: boolean;
    customer_list: any[];
    customer_page_size: number;
    customer_page_index: number;
    customer_length: number;
    modal: {
      name: string;
      mode: string;
    };
    totalNumber: number | null;
    pointData: any[];
    selectedCheckboxes: any[];
    getProject: any[];
    toast: {
      name: string;
      mode: "error" | "info" | "success" | "warning";
    };
    isRefresh: boolean;
    isHistory: boolean;
    isRouteName: boolean;
    isRouteHome: boolean;
    isLogout: boolean;
    isLoading: boolean;
    toastify: {
      open: boolean;
      type: "info" | "success" | "warning" | "error";
      message: string;
      duration: number;
    };
    stepper: number;
    transferStep: number;
    useOtpCode: string;
    nationalCode: string;
    getHeaderItem: any;
    evaluationCoord: any;
    openMultiPoint: boolean;
    uploadLoading: boolean;
    getDate: {
      start: string;
      end: string;
    };
    getTableType: string;
  };
  map: {
    listLoading: boolean;
    map_list: {
      data: {
        list: any[];
        totalNumber: number;
      };
    };
    chart_list: {
      data: {
        list: any[];
        totalNumber: number;
      };
    };
    statusCode: number;
    map_page_size: number;
    map_page_index: number;
    map_guid: string;
    map_search: string;
    epsg: string | number;
    search: string;
    point: any[];
    line: any[];
    assessment: any[];
    polygon: any[];
    drawnFeaturesState: number[][];
    header: [];
    pointDetail: any[];
    map_list_page_size: number;
    map_list_page_index: number;
    map_list_multi: {
      data: {
        list: any[];
        totalNumber: number;
      };
    };
    map_shape_byID: {
      data: {
        list: any[];
        totalNumber: number;
      };
    };
    map_list_search: string;
  };
}

export interface LoginApiResponse {
  data: {
    accessToken: string;
    refreshToken: string;
  };
  message: string;
  statusCode: number;
}
export interface RegisterApiResponse {
  data: {
    accessToken: string;
    refreshToken: string;
  };
  message: string;
  statusCode: number;
}
export interface Response {
  statusCode: number;
}

export interface Toast {
  name: string;
  mode: "error" | "info" | "success" | "warning";
}

export interface FilterHistory {
  operation: "insert" | "delete" | "update" | "";
}

// export interface TypeHistory {
//   featureType: string | "point" | "multipoint";
// }

export interface TypeHistory {
  featureType: "point" | "multipoint" | any;
}

export const initialState: TypeHistory = {
  featureType: "point",
};

export interface ShapeResponceType {
  statusCode: number;
  method: string;
  message: string;
  data: {
    list: any[];
    totalNumber: number;
  };
}
