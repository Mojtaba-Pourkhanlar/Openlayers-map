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
  project: {
    listLoading: boolean;
    project_list: {
      data: {
        list: any[];
        totalCount: number;
      };
    };
    project_page_size: number;
    project_page_index: number;
    openproject: any;
    route: string | null;
    persistentRoute: boolean;
    name: string;
    getGuid: string;
    id: string | undefined;
    listUsers: {
      data: [
        {
          ID: number;
          ProjectID: number;
          NationalId: string;
          FullName: string;
        }
      ];
    };
    newUser: {
      data: {
        ID: number;
        ProjectID: number;
        NationalId: string;
        FullName: string;
      };
    };
  };
  profile: {
    loading: boolean;
    signin: any;
    captcha: any;
    statusCode: number;
    user: any;
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
  history: {
    historyLoading: boolean;
    historyList: {
      data: {
        list: [];
        totalCount: number;
      };
    };
    pageSize: number;
    beforeIndex: number;
    operation: string;
    featureType: string;
    isRedirect: boolean;
    multiPointList: {
      rowId: number;
      status: string;
      feature: {
        properties: {
          name: string;
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
          fullName: string;
          createAt: string;
        };
        geometry: {
          coordinates: number[];
          type: string;
        };
      };
    };
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
