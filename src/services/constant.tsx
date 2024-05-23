export const BASE_URL = import.meta.env.VITE_BASE_URL

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
export const VERIFY_HOST = `user/validate-host`

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

// stay endpoints
export const GET_STAY_LISTING = `/stays`

// place endpoints
export const CREATE_PLACE = `/places/create-place`
export const GET_PLACES = `/places`
export const UPDATE_PLACE = `/places/update-place`
export const DELETE_PLACE = `/places`
