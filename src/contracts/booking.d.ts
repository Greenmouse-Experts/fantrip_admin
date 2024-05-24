import { StayItem } from "./stay";
import { UserItem } from "./users";

export interface ReservationItem {
  adults: number;
  checkIn: string;
  checkOut: string;
  children: number;
  createdDate: string;
  id: string;
  guest: UserItem;
  stay: StayItem;
}
