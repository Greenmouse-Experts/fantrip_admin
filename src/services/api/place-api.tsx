import axios from "axios";
import * as ENDPOINT from "../constant";
import {
  FetchParam,
  PlaceItemInput,
  PlaceItemLocation,
  PlaceItemUpdate,
} from "../../contracts/routine";

export const createSpot = async (payload: PlaceItemInput) => {
  return axios
    .post(`${ENDPOINT.CREATE_SPOT}`, payload)
    .then((response) => response.data);
};

export const createPlace = async (payload: PlaceItemLocation) => {
  return axios
    .post(`${ENDPOINT.CREATE_PLACE}`, payload)
    .then((response) => response.data);
};

export const getTopPlaces = async () => {
  return axios
    .get(`${ENDPOINT.GET_TOP_PLACES}`)
    .then((response) => response.data);
};

export const getPlaces = async (params: FetchParam) => {
  return axios
    .get(`${ENDPOINT.GET_PLACES}?page=${params.page}`)
    .then((response) => response.data);
};

export const updatePlace = async (id:string, payload:{isDisclosed: boolean}) => {
  return axios
    .patch(`${ENDPOINT.GET_PLACES}/update-place/${id}`, payload)
    .then((response) => response.data);
};

export const getSpots = async () => {
  return axios.get(`${ENDPOINT.GET_SPOTS}`).then((response) => response.data);
};

export const getSinglePlace = async (id: string) => {
  return axios
    .get(`${ENDPOINT.GET_PLACES}/${id}`)
    .then((response) => response.data);
};

export const deletePlace = async (id: string) => {
  return axios
    .delete(`${ENDPOINT.GET_PLACES}/${id}`)
    .then((response) => response.data);
};

export const updateTopPlace = async (id: string, payload: PlaceItemUpdate) => {
  return axios
    .patch(`${ENDPOINT.UPDATE_TOP_PLACES}/${id}`, payload)
    .then((response) => response.data);
};
export const deleteTopPlace = async (id: string) => {
  return axios
    .delete(`${ENDPOINT.DELETE_TOP_PLACE}/${id}`)
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
