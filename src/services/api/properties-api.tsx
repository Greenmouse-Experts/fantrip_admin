import axios from "axios";
import * as ENDPOINT from "../constant";
import { PropertyItemInput, PropertyItemUpdate } from "../../contracts/routine";

export const createProperty = async (payload:PropertyItemInput) => {
    return axios
      .post(`${ENDPOINT.CREATE_PROPERTY}`, payload)
      .then((response) => response.data);
  };

export const getProperties = async () => {
    return axios
      .get(`${ENDPOINT.GET_PROPERTIES}`)
      .then((response) => response.data);
  };

  export const getSingleProperty = async (id:string) => {
    return axios
      .get(`${ENDPOINT.GET_SINGLE_PROPERTY}/${id}`)
      .then((response) => response.data);
  };

  export const updateProperty = async (id:string, payload:PropertyItemUpdate ) => {
    return axios
      .patch(`${ENDPOINT.UPDATE_PROPERTY}/${id}`, payload)
      .then((response) => response.data);
  };

  export const deleteProperty = async (id:string) => {
    return axios
      .delete(`${ENDPOINT.DELETE_PROPERTY}/${id}`)
      .then((response) => response.data);
  };
  