import axios from "axios";
import * as ENDPOINT from "../constant";
import { ApproveStayInputItem } from "../../contracts/routine";

export const getStayListing = async () => {
  return axios
    .get(`${ENDPOINT.GET_STAY_LISTING}`)
    .then((response) => response.data);
};

export const getStayStats = async () => {
  return axios
    .get(`${ENDPOINT.GET_STAY_STAT}`)
    .then((response) => response.data);
};

export const getSingleStayListing = async (id: string) => {
  return axios
    .get(`${ENDPOINT.GET_STAY_LISTING}/${id}`)
    .then((response) => response.data);
};

export const approveStay = async (id: string, payload:ApproveStayInputItem) => {
  return axios
    .patch(`${ENDPOINT.APPROVE_STAY}/${id}`, payload)
    .then((response) => response.data);
};

export const softDeleteStay = async (id: string) => {
  return axios
    .delete(`${ENDPOINT.GET_STAY_LISTING}/${id}`)
    .then((response) => response.data);
};

export const getStayReviews = async (id: string) => {
  return axios
    .get(`${ENDPOINT.FETCH_STAY_REVIEW}/${id}?reviewFor=stay`)
    .then((response) => response.data);
};
