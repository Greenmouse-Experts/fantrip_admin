import { PlaceItem } from "./routine";
import { UserItem } from "./users";

export interface ReccomendationItem {
  createdDate: string;
  description: string;
  id: string;
  isDisclosed: boolean;
  location: string;
  name: string;
  photos: string;
  spot: PlaceItem;
  user: UserItem
}
