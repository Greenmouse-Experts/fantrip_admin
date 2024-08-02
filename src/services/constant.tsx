export const BASE_URL = import.meta.env.VITE_BASE_URL
export const SOCKET_URL = import.meta.env.VITE_BASE_SOCKET_URL;

export enum USER_TYPES{
    HOST = "host",
    GUEST = "guest",
}

// Auth endpoints
export const USERS_LOGIN = `/auth/signin`
export const UPDATE_PROFILE = `/auth/update-profile`
export const UPDATE_PASSWORD = `/auth/update-password`

// user endpoints
export const GET_USERS = `/user/clients`
export const GET_USER_DETAIL = `/user/details`
export const VERIFY_HOST = `user/validate-host`
export const SUSUPEND_USER = `/user/suspend-unsuspend-user`

// properties endpoints
export const CREATE_PROPERTY = `properties/add-property`
export const GET_PROPERTIES = `/properties/all`
export const GET_SINGLE_PROPERTY = `/properties`
export const UPDATE_PROPERTY = `/properties/update-property`
export const DELETE_PROPERTY = `/properties/delete-property`

// amenities endpoints
export const CREATE_AMENITY = `/amenities/add-amenity`
export const GET_AMENITIES = `/amenities/all`
export const GET_SINGLE_AMENITY = `/amenities`
export const UPDATE_AMENITY = `/amenities/update-amenity`
export const DELETE_AMENITY = `/amenities/delete-amenity`

// tax endpoints
export const CREATE_TAX = `/tax-rates/create`
export const GET_TAXES = `/tax-rates`

// stay endpoints
export const GET_STAY_LISTING = `/stays`
export const APPROVE_STAY = `/stays/change-status`
export const GET_STAY_STAT = `/stays/count`;

// place endpoints
export const CREATE_SPOT = `/spots/create-spot`
export const GET_PLACES = `/places`
export const GET_SPOTS = `/spots`
export const UPDATE_SPOT = `/spots/update-spot`
export const DELETE_SPOT = `/spots`

// reservation endpoints
export const GET_RESERVATION = `/reservations`
export const GET_BOOKINGS = `/bookings/fetch-guest-trx`
export const GET_SINGLE_BOOKING = `/bookings/fetch-trx`
export const GET_BOOKING_STAT = `/bookings/count`;
