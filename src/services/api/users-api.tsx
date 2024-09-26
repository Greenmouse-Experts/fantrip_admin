import axios from "axios";
import * as ENDPOINT from "../constant";
import { getBearerToken, getToken } from "../helpers";
import { SuspendUserPayload } from "../../contracts/users";

axios.defaults.baseURL = ENDPOINT.BASE_URL;
axios.defaults.headers.common["Authorization"] = getBearerToken();
axios.interceptors.request.use(
  function (config) {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = getBearerToken();
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.clear();
      sessionStorage.clear();
      return (window.location.href = "/login");
    }
    return Promise.reject(error);
  }
);

export const getUser = async (type: ENDPOINT.USER_TYPES, page: number, searchParams: string) => {
  return axios
    .get(`${ENDPOINT.GET_USERS}/${type}?page=${page}&searchKey=${searchParams}`)
    .then((response) => response.data);
};

export const getUserDetails = async (id:string, type: ENDPOINT.USER_TYPES) => {
  return axios
    .get(`${ENDPOINT.GET_USER_DETAIL}/${id}/${type}`)
    .then((response) => response.data);
};

export const verifyHost = async (id: string) => {
  return axios
    .patch(`${ENDPOINT.VERIFY_HOST}/${id}`)
    .then((response) => response.data);
};

export const unverifyHost = async (id: string) => {
  return axios
    .patch(`${ENDPOINT.UNVERIFY_HOST}/${id}`)
    .then((response) => response.data);
};

export const suspendUser = async (id: string, payload:SuspendUserPayload ) => {
  return axios
    .patch(`${ENDPOINT.SUSUPEND_USER}/${id}`, payload)
    .then((response) => response.data);
};

export const getNotify = async (page: number) => {
  return axios
    .get(`${ENDPOINT.GET_NOTIFY}?page=${page}`)
    .then((response) => response.data);
};

export const markNotify = async (id:string) => {
  return axios
    .patch(`${ENDPOINT.MARK_AS_READ}/${id}`)
    .then((response) => response.data);
};

