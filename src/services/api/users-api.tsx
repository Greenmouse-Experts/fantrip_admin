import axios from "axios";
import * as ENDPOINT from "../constant";
import { getBearerToken, getToken } from "../helpers";

axios.defaults.baseURL = ENDPOINT.BASE_URL;
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

export const getUser = async (type:ENDPOINT.USER_TYPES) => {
    return axios
      .get(`${ENDPOINT.GET_USERS}/${type}`)
      .then((response) => response.data);
  };