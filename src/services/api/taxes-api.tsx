import axios from "axios";
import * as ENDPOINT from "../constant";
import { AddTaxItem } from "../../contracts/routine";

export const createTax = async (payload:AddTaxItem) => {
    return axios
      .post(`${ENDPOINT.CREATE_TAX}`, payload)
      .then((response) => response.data);
  };

export const getTaxes = async () => {
    return axios
      .get(`${ENDPOINT.GET_TAXES}`)
      .then((response) => response.data);
  };


  export const updateTax = async (id:string, payload:AddTaxItem ) => {
    return axios
      .patch(`${ENDPOINT.GET_TAXES}/${id}`, payload)
      .then((response) => response.data);
  };

  export const deleteTax = async (id:string) => {
    return axios
      .delete(`${ENDPOINT.GET_TAXES}/${id}`)
      .then((response) => response.data);
  };
  