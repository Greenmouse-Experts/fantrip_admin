import axios from "axios";
import * as ENDPOINT from "../constant";
import { AmenityItemInput, AmenityItemUpdate } from "../../contracts/routine";

export const createAmenity = async (payload:AmenityItemInput) => {
    return axios
      .post(`${ENDPOINT.CREATE_AMENITY}`, payload)
      .then((response) => response.data);
  };

export const getAmenities = async () => {
    return axios
      .get(`${ENDPOINT.GET_AMENITIES}`)
      .then((response) => response.data);
  };

  export const getSingleAmenity = async (id:string) => {
    return axios
      .get(`${ENDPOINT.GET_SINGLE_AMENITY}/${id}`)
      .then((response) => response.data);
  };

  export const updateAmenity = async (id:string, payload:AmenityItemUpdate ) => {
    return axios
      .patch(`${ENDPOINT.UPDATE_AMENITY}/${id}`, payload)
      .then((response) => response.data);
  };

  export const deleteAmenity = async (id:string) => {
    return axios
      .delete(`${ENDPOINT.DELETE_AMENITY}/${id}`)
      .then((response) => response.data);
  };
  