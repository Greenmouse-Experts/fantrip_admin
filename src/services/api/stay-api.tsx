import axios from "axios";
import * as ENDPOINT from "../constant";

export const getListing = async () => {
    return axios
      .get(`${ENDPOINT.GET_PROPERTIES}`)
      .then((response) => response.data);
  };