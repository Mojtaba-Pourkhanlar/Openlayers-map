import { getTranslate } from "@/language";
import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { SetStateAction } from "react";
import { apiRequest } from "../Middleware";
import { LoginApiResponse } from "../interfaces";
import { openSnackbar, setStepper } from "./Root";
import { useNavigate } from "react-router-dom";

export const clearAll = createAction("profile/clearAll");

export const signin = createAsyncThunk(
  "profile/signin",
  async (data: any, thunkAPI) => {
    const { dispatch } = thunkAPI;
    let result;
    try {
      const { response, error } = await apiRequest<LoginApiResponse>(
        "POST",
        "api/v1/login",
        data.data
      );
      if (response) {
        if (data.checked) {
          localStorage.setItem("raycloud_token", response.data.accessToken);
          localStorage.setItem("remember-me", data.checked);
        }
        Cookies.set("raycloud_token", response.data.accessToken);
        Cookies.set("raycloud_refresh", response.data.refreshToken);
        window.location.replace("/admin/project/projectlist");
        result = response;
      }
      return { result, statusCode: error?.response?.status };
    } catch (error: any) {
      if (error) {
        let status = error.response.status;
        if (status === 404) {
          dispatch(
            openSnackbar({
              message: "حساب کاربری ثبت نشده است",
              type: "error",
            })
          );
        }
        if (status === 403) {
          dispatch(
            openSnackbar({
              message: "نام کاربری یا رمز عبور اشتباه است",
              type: "error",
            })
          );
        }
        if (status === 400) {
          dispatch(
            openSnackbar({
              message: "کد امنیتی نادرست است",
              type: "error",
            })
          );
        }
        data.setForm((prev: any) => ({ ...prev, captchaText: "" }));
        dispatch(getCaptcha());
      }
    }
  }
);

export const getCaptcha = createAsyncThunk("profile/getCaptcha", async () => {
  const { response } = await apiRequest<SetStateAction<string | any>>(
    "get",
    "/api/v1/captcha"
  );
  return response;
});

export const getUser = createAsyncThunk("profile/userInfo", async () => {
  const { response } = await apiRequest<any>("get", "/api/v1/userInfo");
  return response;
});

export const refreshTokenApi = createAsyncThunk(
  "profile/refreshTokenApi",
  async (data: any) => {
    try {
      const { response } = await apiRequest<LoginApiResponse>(
        "get",
        "/api/v1/refresh",
        null,
        {},
        data
      );
      if (response) {
        Cookies.set("raycloud_token", response.data.accessToken);
      }
      return response;
    } catch (error: any) {
      if (error) {
        if (error.response.status === 401) {
          Cookies.remove("raycloud_token");
          Cookies.remove("raycloud_refresh");
          localStorage.removeItem("raycloud_token");
          window.location.reload();
        }
      }
    }
  }
);

export const otpCode = createAsyncThunk(
  `profile/otpCode`,
  async (getParametr: any, { dispatch }) => {
    const translate = getTranslate();
    try {
      const isData = {
        nationalId: getParametr?.nationalId,
      };
      const { response } = await apiRequest("post", "/api/v1/otp", isData);
      if (response) {
        dispatch(
          openSnackbar({
            message: translate.codeSent,
            type: "success",
          })
        );
        if (getParametr?.again) {
          return;
        } else {
          dispatch(setStepper());
        }
      }
      return response;
    } catch (error: any) {
      if (error?.response?.status === 429) {
        dispatch(
          openSnackbar({
            message: translate.tryCountExceeded,
            type: "error",
          })
        );
      } else {
        dispatch(
          openSnackbar({
            message: translate.serverError,
            type: "error",
          })
        );
      }
    }
  }
);

export const checkCode = createAction(
  `profile/checkCode`,
  (getParametr: any) => {
    return getParametr;
  }
);
const goToLogin = () => {
  const navigate = useNavigate();
  navigate("/login");
};

export const changePass = createAsyncThunk(
  `profile/changePass`,
  async (getParametr: any, { dispatch }) => {
    const translate = getTranslate();
    try {
      const { response } = await apiRequest(
        "post",
        "/api/v1/resetPass",
        getParametr
      );
      if (response) {
        dispatch(
          openSnackbar({
            message: translate.passChanged,
            type: "success",
          })
        );
        dispatch(clearAll());
        setTimeout(() => {
          window?.location.replace("/login");
          // goToLogin();
        }, 900);
      }
      return response;
    } catch (error: any) {
      if (error?.response?.status === 408) {
        dispatch(
          openSnackbar({
            message: translate.codeExp,
            type: "error",
          })
        );
      } else if (error?.response?.status === 403) {
        dispatch(
          openSnackbar({
            message: translate.passNotChanged,
            type: "error",
          })
        );
      } else {
        dispatch(
          openSnackbar({
            message: translate.serverError,
            type: "error",
          })
        );
      }
    }
  }
);

export const registerData = createAsyncThunk(
  `profile/register`,
  async (getParametr: any, { dispatch }) => {
    const translate = getTranslate();
    try {
      const { response, error } = await apiRequest(
        "post",
        "/api/v1/signup",
        getParametr
      );
      if (response) {
        dispatch(
          openSnackbar({
            message: "ثبت نام با موفقیت انجام شد",
            type: "success",
            duration: 3000,
          })
        );
        window.location.replace("/login");
      }
      return response;
    } catch (error: any) {
      if (error?.response?.status === 409) {
        dispatch(
          openSnackbar({
            message: translate.userRepeat,
            type: "error",
          })
        );
      }
      if (error?.response?.status === 400) {
        dispatch(
          openSnackbar({
            message: translate.userPasswordError,
            type: "error",
          })
        );
      }
      if (error?.response?.status === 403) {
        dispatch(
          openSnackbar({
            message: translate.userErrorCreate,
            type: "error",
          })
        );
      }
    }
  }
);
