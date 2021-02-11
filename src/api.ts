import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

export const createAPI = (
  onUnauthorized: (err: AxiosError) => void,
): AxiosInstance => {
  const api = axios.create({
    baseURL: `https://5.react.pages.academy/wtw`,
    timeout: 1000 * 5,
    withCredentials: true,
  });

  const onSuccess = (response: AxiosResponse) => {
    return response;
  };

  const onFail = (err: AxiosError) => {
    onUnauthorized(err);

    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
