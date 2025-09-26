import { getTranslate } from "@/language";
import { AsyncThunk, createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import useSWR from "swr";
import store, { Store } from "..";
import { apiRequest } from "../Middleware";
import { Response, RootState } from "../interfaces";
import {
  clearAll,
  clearIsRefresh,
  closeModal,
  nextStep,
  openSnackbar,
  setIsLoading,
  setIsRefresh,
  setUploadLoading,
} from "./Root";
import { refreshTokenApi } from "./Profile";

interface FetchDataProps {
  url: string;
  params?: Record<string, any>;
}
interface FetchDataPropsPoints {
  url: string;
  params?: Record<string, any>;
  body: any;
}
const translate = getTranslate();
export const updateRoute = createAction<{
  route: string;
  persistent: boolean;
}>("updateRoute");

export const clearAllProject = createAction("clearAllProject");

export const projectName = createAction<{
  name: string;
  id?: string;
}>("projectName");

export const getAllProject = createAsyncThunk(
  "project/getAllProject",
  async (_, thunkApi) => {
    const { getState } = thunkApi;
    const project_page_index = (getState() as Store).project.project_page_index;
    const project_page_size = (getState() as Store).project.project_page_size;
    const allUser = {
      pageSize: project_page_size,
      pageIndex: project_page_index,
    };
    const { response } = await apiRequest(
      "get",
      `/api/v1/projectList`,
      null,
      {},
      allUser
    );
    return response;
  }
);
export const deleteProject = createAsyncThunk(
  "project/deleteProject",
  async (data: any, thunkApi) => {
    const { dispatch } = thunkApi;
    const { response, error } = await apiRequest<any>(
      "delete",
      `/api/v1/deleteProject`,
      null,
      {},
      data
    );
    if (response) {
      dispatch(setIsRefresh(true));
      dispatch(
        openSnackbar({
          message: translate.projectDelete,
          type: "success",
        })
      );
    }
    if (error) {
      dispatch(clearIsRefresh());
    }
    return response;
  }
);

export const createProject = createAsyncThunk(
  "project/createProject",
  async (data: any, thunkApi) => {
    const { dispatch } = thunkApi;
    const { response, error } = await apiRequest<any>(
      "POST",
      `/api/v1/createProject`,
      data
    );
    if (response) {
      dispatch(setIsRefresh(true));
      dispatch(nextStep());
    }
    if (error) {
      dispatch(clearIsRefresh());
    }
    return response.data;
  }
);

export const uploadAfterCreateProject = createAsyncThunk(
  "project/uploadAfterCreateProject",
  async (data: any, thunkApi) => {
    const { dispatch, getState } = thunkApi;
    const { getGuid }: { getGuid: any } = (getState() as RootState).project;
    dispatch(setUploadLoading(true));
    const { response, error } = await apiRequest<any>(
      "POST",
      `/api/v1/importData/${getGuid?.guid}`,
      data
    );
    if (response) {
      dispatch(setUploadLoading(false));
      dispatch(closeModal());
      dispatch(clearAll());
      dispatch(
        openSnackbar({
          message: "فایل با موفقیت آپلود شد",
          type: "success",
        })
      );
    }
    if (error) {
      dispatch(setUploadLoading(false));
      if (error.response.status === 500) {
        dispatch(
          openSnackbar({
            message: "خطا در برقراری ارتباط",
            type: "error",
          })
        );
      }
    }
    return response.data;
  }
);

export const uploadProject = createAsyncThunk(
  "project/uploadProject",
  async (data: any, thunkApi) => {
    const { dispatch } = thunkApi;
    const { response, error } = await apiRequest<Response>(
      "POST",
      "/api/v1/syncProject",
      data
    );
    if (response) {
      dispatch(setIsRefresh(true));
      dispatch(
        openSnackbar({
          message: translate.projectSuccess,
          type: "success",
        })
      );
    }
    if (error) {
      dispatch(clearIsRefresh());
    }
  }
);

export const downloadProject = createAsyncThunk(
  "project/downloadProject",
  async (data: any, thunkApi) => {
    const { dispatch } = thunkApi;
    const token =
      localStorage.getItem("raycloud_token") || Cookies.get("raycloud_token");
    try {
      const response = await fetch(
        `/api/v1/downloadProject?guids=${data.paths}&customerId=${data.customerId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include any necessary authorization headers
            "Content-Disposition": "attachment", // Set Content-Disposition header for file download
          },
        }
      );

      if (response.ok) {
        // Assuming the server sets Content-Disposition header
        const contentDisposition = response.headers.get("Content-Disposition");
        const filename = contentDisposition!.split("filename=")[1];

        // Create a Blob from the response
        const blob = await response.blob();

        // Create a link element
        const link = document.createElement("a");

        // Create a URL for the Blob and set it as the href of the link
        link.href = window.URL.createObjectURL(blob);
        link.download = filename || "downloadedFile";

        // Append the link to the document and trigger a click
        document.body.appendChild(link);
        link.click();

        // Remove the link from the document
        document.body.removeChild(link);
      }
    } catch (error) {
      // Handle any fetch errors
      console.error("Fetch error:", error);
      dispatch(clearIsRefresh());
      return null; // or handle error response accordingly
    }
  }
);

export const setProjectPageSize = createAsyncThunk(
  "project/setProjectPageSize",
  async (data: number) => {
    return { pageSize: data };
  }
);

export const setProjectPageIndex = createAsyncThunk(
  "project/setProjectPageIndex",
  async (data: number) => {
    return { pageIndex: data };
  }
);

export const openProject: AsyncThunk<any, any, {}> = createAsyncThunk(
  "project/openProject",
  async (data: any, thunkApi) => {
    const { dispatch, getState } = thunkApi;
    const name = (getState() as Store).project.id;
    const { response } = await apiRequest(
      "get",
      `/api/v1/openProject`,
      null,
      {},
      data
    );
    if (response) {
      dispatch(
        updateRoute({
          route: `/admin/project/projectlist/${name}`,
          persistent: false,
        })
      );
    }
    return response;
  }
);

const fetchData = async ({ url, params }: FetchDataProps) => {
  const cookie = Cookies.get("raycloud_token");
  const local = localStorage.getItem("raycloud_token");
  const token = cookie || local;
  const header = `Bearer ${token}`;
  store.dispatch(setIsLoading(true));
  const response = await axios.get(url, {
    params,
    headers: { Authorization: header },
  });
  return response.data;
};

export const useDataFetching = (url: string, params?: Record<string, any>) => {
  const { data, error, mutate } = useSWR([url, params], () =>
    fetchData({ url, params })
  );
  store.dispatch(setIsLoading(false));
  return {
    data,
    isLoading: !data && !error,
    isError: error,
    mutate: mutate,
  };
};

const fetchDataPoints = async ({ url, params, body }: FetchDataPropsPoints) => {
  const cookie = Cookies.get("raycloud_token");
  const local = localStorage.getItem("raycloud_token");
  const token = cookie || local;
  const header = `Bearer ${token}`;

  const config = {
    method: "post",
    url,
    params,
    data: body,
    headers: { Authorization: header },
  };

  const response = await axios(config);
  return response.data;
};

export const useDataFetchingPoints = (
  url: string,
  params?: Record<string, any>,
  body?: any
) => {
  const { data, error, mutate } = useSWR([url, params, body], () =>
    fetchDataPoints({ url, params, body })
  );
  if (error?.response?.status === 401) {
    const token = Cookies.get("raycloud_refresh");
    const data = {
      refreshToken: token,
    };
    store.dispatch(refreshTokenApi(data) as any);
  } else {
    return {
      data,
      isLoading: !data && !error,
      isError: error,
      mutate: mutate,
    };
  }
};

export const closeProject = createAction("project/closeProject");

export const getAllProjectUsers = createAsyncThunk(
  "project/getAllProjectUsers",
  async (id: string) => {
    const getUsers = {
      projectId: id,
    };
    const { response } = await apiRequest(
      "get",
      `/api/v1/projectUsers`,
      null,
      {},
      getUsers
    );
    return response;
  }
);

export const clearNewUser = createAction("project/clearNewUser");

export const setGiveAccess: AsyncThunk<any, any, {}> = createAsyncThunk(
  "project/setGiveAccess",
  async (data: any, { dispatch }) => {
    try {
      const { response, error } = await apiRequest(
        "post",
        `/api/v1/giveAccess`,
        data
      );
      if (response) return response;
    } catch (error: any) {
      if (error?.response?.status === 409) {
        dispatch(
          openSnackbar({
            message: "شما به این پروژه دسترسی دارید",
            type: "warning",
          })
        );
      }
      if (error?.response?.status === 404) {
        dispatch(
          openSnackbar({
            message: "کاربری با این کد ملی وجود ندارد",
            type: "error",
          })
        );
      }
    }
  }
);

export const setRevokeAccess: AsyncThunk<any, any, {}> = createAsyncThunk(
  "project/setRevokeAccess",
  async (data: any) => {
    const { response } = await apiRequest(
      "delete",
      `/api/v1/revokeAccess`,
      data
    );
    return response;
  }
);
