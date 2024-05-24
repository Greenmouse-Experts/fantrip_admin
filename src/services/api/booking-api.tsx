import axios from "axios";
import * as ENDPOINT from "../constant";

export const getReservations = async () => {
  return axios
    .get(`${ENDPOINT.GET_RESERVATION}`)
    .then((response) => response.data);
};
