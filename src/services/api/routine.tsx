import axios from "axios";
import * as ENDPOINT from "../constant";

export const uploadImage = async (payload: FormData) => {
  return axios.post(`/upload/image`, payload).then((response) => response.data);
};

export const uploadVideo = async (payload: FormData) => {
  return axios.post(`/upload/video`, payload).then((response) => response.data);
};

export const getAnalytics = async () => {
  return axios.get(ENDPOINT.GET_ANALYTICS).then((response) => response.data);
};
