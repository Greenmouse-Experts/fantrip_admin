import { StayItem } from "./stay";
import { UserItem } from "./users";

export interface ReservationItem {
  adults: number;
  checkIn: string;
  checkOut: string;
  children: number;
  createdDate: string;
  id: string;
  status: id;
  guest: UserItem;
  stay: StayItem;
}

export interface BookingItem {
  id: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  status: string;
  createdDate: string;
  stay: StayItem;
  guest: UserItem;
}

export interface BookingItemWithPricing extends BookingItem {
  price: number;
  priceWithNightInclusion: number;
  serviceFee: number;
  taxFee: number;
  total: number;
}

export interface ComputePricePayload {
  checkIn: string;
  checkOut: string;
  stay: string;
}

interface TransactItem {
    id: string;
    reference: string;
    thirdPartyRes: {
      ref: string;
      clientSecret: string;
      status: string;
    };
    status: string;
    amount: number ;
    subAmount: number;
    narration: string;
    gateway: string;
    purpose: string;
    createdDate: string;
    updatedDate: string;
    deletedDate: string | null;
}
export interface PaidBookingItem {
  id: string;
  number: string
  currency: string;
  price: number;
  pricePerNight: number;
  serviceFee: number;
  tax: number;
  total: number;
  status: string
  createdDate: string
  updatedDate: string
  deletedDate: string | null;
  trx: TransactItem;
  reservation: BookingItemWithPricing
}

