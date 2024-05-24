import axios from "axios";
import * as ENDPOINT from "../constant";
import { PlaceItemInput, PlaceItemUpdate } from "../../contracts/routine";

export const createPlace = async (payload: PlaceItemInput) => {
  return axios
    .post(`${ENDPOINT.CREATE_PLACE}`, payload)
    .then((response) => response.data);
};

export const getPlaces = async () => {
  return axios.get(`${ENDPOINT.GET_PLACES}`).then((response) => response.data);
};

export const getSinglePlace = async (id: string) => {
  return axios
    .get(`${ENDPOINT.GET_PLACES}/${id}`)
    .then((response) => response.data);
};

export const updatePlace = async (id: string, payload: PlaceItemUpdate) => {
  return axios
    .patch(`${ENDPOINT.UPDATE_PLACE}/${id}`, payload)
    .then((response) => response.data);
};

export const deletePlace = async (id: string) => {
  return axios
    .delete(`${ENDPOINT.DELETE_PLACE}/${id}`)
    .then((response) => response.data);
};
