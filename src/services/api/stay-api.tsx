import axios from "axios";
import * as ENDPOINT from "../constant";
import { ApproveStayInputItem, FetchParam } from "../../contracts/routine";

export const getStayListing = async (params: FetchParam) => {
  return axios
    .get(`${ENDPOINT.GET_STAY_LISTING}?page=${params.page}`)
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

export const getSpecialStays = async (params: FetchParam) => {
  return axios
    .get(`${ENDPOINT.GET_SPECIAL_STAYS}?page=${params.page}`)
    .then((response) => response.data);
};

export const addSpecialStay = async (payload:{stay: string[]}) => {
  return axios
    .post(`${ENDPOINT.ADD_SPECIAL_STAYS}`, payload)
    .then((response) => response.data);
};

export const removeSpecialStay = async (id: string) => {
  return axios
    .delete(`${ENDPOINT.REMOVE_SPECIAL_STAY}/${id}`)
    .then((response) => response.data);
};