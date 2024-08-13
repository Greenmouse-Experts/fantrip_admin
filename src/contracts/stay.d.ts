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
  approved: boolean;
  createdDate: string;
  availableFrom: string;
  availableTo: string;
  maxNights: number;
  maxGuests: number;
  property: PropertyItem;
  host: UserItem;
  currency: string;
  amenities: AmenityItem[];
  totalReviews: number;
  avgRating: number | null;
}

export interface ReviewResult {
  comment: string;
  createdDate: string;
  id: string;
  muted: boolean;
  place: ReccomendationItem;
  rating: number;
  reviewFor: string;
  user: UserItem;
}
export interface ReviewItem {
  avgRating: string;
  results: ReviewResult[];
  totalRating: string;
}

export interface SpecialStayItem {
  createdDate: string;
  id: string;
  published: boolean;
  stay: StayItem;
  stayId: string;
}
