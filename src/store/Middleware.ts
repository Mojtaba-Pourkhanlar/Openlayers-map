import axios, { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import store from ".";
import { setIsLoading } from "./Actions/Root";
// AxiosRequestConfig : Request configuration

// create an interface
interface ApiResponse<T> {
  response: T | null; // This introduces a generic type `T`
  error: any;
  status?: number;
}

// added types to the function parameters
export const apiRequest = async <T>(
  method: string,
  url: string,
  data?: any,
  headers: Record<string, string> = {}, // string keys and values
  params?: any // URL parameters. It's marked as optional (?) for cases where there are no parameters.
  // (?) because not all requests have a payload
): Promise<ApiResponse<T>> => {
  store.dispatch(setIsLoading(true));
  if (!headers.Authorization) {
    const token =
      localStorage.getItem("raycloud_token") || Cookies.get("raycloud_token");
    headers = {
      ...headers, // This line may be unnecessary, check if you need to keep existing headers
      Authorization: `Bearer ${token}`,
    };
  }
  const axiosConfig: AxiosRequestConfig = {
    method,
    url,
    data,
    headers,
    params,
  };

  try {
    const result = await axios(axiosConfig);
    return {
      response: result.data,
      error: null,
      status: result.status,
    };
  } catch (err: any) {
    if (err.response?.status === 401) {
      const refreshToken = Cookies.get("raycloud_refresh");
      // Wrap the token refresh logic in a Promise
      return new Promise(async (resolve, reject) => {
        try {
          const response = await axios.get("/api/v1/refresh", {
            params: { refreshToken },
          });
          const newToken = response.data.data.accessToken;
          // Update the token in both localStorage and Cookies
          localStorage.setItem("raycloud_token", newToken);
          Cookies.set("raycloud_token", newToken);
          // Retry the original request with the new token
          const retryConfig = {
            ...axiosConfig,
            headers: { ...headers, Authorization: `Bearer ${newToken}` },
          };
          const retryResult = await axios(retryConfig);
          resolve({
            response: retryResult.data,
            error: null,
            status: retryResult.status,
          });
        } catch (refreshError) {
          Cookies.remove("raycloud_token");
          Cookies.remove("raycloud_refresh");
          localStorage.removeItem("raycloud_token");
          reject({
            response: null,
            error: refreshError,
          });
          window.location.reload();
        } finally {
          store.dispatch(setIsLoading(false));
        }
      });
    }
    return Promise.reject(err);
  } finally {
    store.dispatch(setIsLoading(false));
  }
};
