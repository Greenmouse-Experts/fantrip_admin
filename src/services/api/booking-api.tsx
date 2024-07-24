import axios from "axios";
import * as ENDPOINT from "../constant";
import { FetchParam } from "../../contracts/routine";

export const getReservations = async (params: FetchParam) => {
  return axios
    .get(`${ENDPOINT.GET_RESERVATION}?status=${params.status}&page=${params.page}`)
    .then((response) => response.data);
};

export const getBookings = async (params: FetchParam) => {
  return axios
    .get(`${ENDPOINT.GET_BOOKINGS}?status=${params.status}&page=${params.page}`)
    .then((response) => response.data);
};

export const getBookingStat = async () => {
  return axios
    .get(`${ENDPOINT.GET_BOOKING_STAT}`)
    .then((response) => response.data);
};

export const getSingleBooking = async (id: string) => {
  return axios
    .get(`${ENDPOINT.GET_SINGLE_BOOKING}/${id}`)
    .then((response) => response.data);
};
