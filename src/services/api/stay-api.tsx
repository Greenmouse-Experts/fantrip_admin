import axios from "axios";
import * as ENDPOINT from "../constant";

export const getStayListing = async () => {
  return axios
    .get(`${ENDPOINT.GET_STAY_LISTING}`)
    .then((response) => response.data);
};

export const getSingleStayListing = async (id: string) => {
  return axios
    .get(`${ENDPOINT.GET_STAY_LISTING}/${id}`)
    .then((response) => response.data);
};

export const softDeleteStay = async (id: string) => {
  return axios
    .delete(`${ENDPOINT.GET_STAY_LISTING}/${id}`)
    .then((response) => response.data);
};
