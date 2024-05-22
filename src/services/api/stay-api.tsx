import axios from "axios";
import * as ENDPOINT from "../constant";

export const getStayListing = async () => {
    return axios
      .get(`${ENDPOINT.GET_STAY_LISTING}`)
      .then((response) => response.data);
  };