import axios from "axios";
import { BASE_URL } from "../constant.tsx";
import { USERS_LOGIN } from "../constant.tsx";
import { getBearerToken, getToken } from "../helpers.tsx";
import * as ENDPOINT from "../constant";

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common["Authorization"] = getBearerToken();
axios.interceptors.request.use(
  function(config) {
    const token = getToken(); 
    if (token) {
      config.headers["Authorization"] = getBearerToken();
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
        localStorage.clear()
        sessionStorage.clear()
      return (window.location.href = "/login");
    }
    return Promise.reject(error);
  }
);

export const loginUser = async (payload:any) => {
  return axios
    .post(`${USERS_LOGIN}`, payload)
    .then((response) => response.data);
};

export const updateProfile = async (payload:any) => {
  return axios
    .post(`${ENDPOINT.UPDATE_PROFILE}`, payload)
    .then((response) => response.data);
};

export const updatePassword = async (payload:any) => {
  return axios
    .post(`${ENDPOINT.UPDATE_PASSWORD}`, payload)
    .then((response) => response.data);
};
