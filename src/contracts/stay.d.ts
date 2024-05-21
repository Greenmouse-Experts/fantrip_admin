import { AmenityItem, PropertyItem } from "./routine";
import { UserItem } from "./users";

export interface StayItem {
  id: string;
  name: string;
  address: string;
  description: string;
  subHead: string;
  highlightFeature: string;
  price: number;
  uniqueFeature: string;
  photos: string[];
  specialOffers: string[];
  percentageOff: number;
  createdDate: string;
  updatedDate: string;
  deletedDate: string | null;
  isDisclosed: boolean;
  createdDate: string;
  property: PropertyItem;
  host: UserItem;
  amenities: AmenityItem[];
}
