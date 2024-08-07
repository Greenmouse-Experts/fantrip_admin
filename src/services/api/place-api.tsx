import axios from "axios";
import * as ENDPOINT from "../constant";
import { PlaceItemInput, PlaceItemUpdate } from "../../contracts/routine";

export const createSpot = async (payload: PlaceItemInput) => {
  return axios
    .post(`${ENDPOINT.CREATE_SPOT}`, payload)
    .then((response) => response.data);
};

export const getPlaces = async () => {
  return axios.get(`${ENDPOINT.GET_PLACES}`).then((response) => response.data);
};

export const getSpots = async () => {
  return axios.get(`${ENDPOINT.GET_SPOTS}`).then((response) => response.data);
};

export const getSinglePlace = async (id: string) => {
  return axios
    .get(`${ENDPOINT.GET_PLACES}/${id}`)
    .then((response) => response.data);
};

export const updateSpot = async (id: string, payload: PlaceItemUpdate) => {
  return axios
    .patch(`${ENDPOINT.UPDATE_SPOT}/${id}`, payload)
    .then((response) => response.data);
};

export const deleteSpot = async (id: string) => {
  return axios
    .delete(`${ENDPOINT.DELETE_SPOT}/${id}`)
    .then((response) => response.data);
};

export const getReviews = async (id: string) => {
  return axios
    .get(`${ENDPOINT.FETCH_REVIEW}/${id}?reviewFor=place`)
    .then((response) => response.data);
};
