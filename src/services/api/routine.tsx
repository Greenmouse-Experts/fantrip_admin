import axios from "axios";

export const uploadImage = async (payload: FormData) => {
  return axios.post(`/upload/image`, payload).then((response) => response.data);
};

export const uploadVideo = async (payload: FormData) => {
  return axios.post(`/upload/video`, payload).then((response) => response.data);
};
