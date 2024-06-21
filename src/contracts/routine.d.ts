export interface AmenityItemInput {
  name: string;
  imageUrl?: string;
  isPublished?: boolean;
}

export interface AmenityItemUpdate {
  name?: string;
  imageUrl?: string;
  isPublished?: boolean;
}

export interface AmenityItem {
  id: string;
  name: string;
  imageUrl: string | null;
  by: string;
  createdDate: string;
  updatedDate: string;
  deletedDate: string | null;
  isPublished: boolean;
}

export interface PropertyItemInput {
  name: string;
  imageUrl?: string;
  isPublished?: boolean;
}

export interface PropertyItemUpdate {
  name?: string;
  imageUrl?: string;
  isPublished?: boolean;
}

export interface PropertyItem {
  id: string;
  name: string;
  imageUrl: string | null;
  by: string;
  createdDate: string;
  updatedDate: string;
  deletedDate: string | null;
  isPublished: boolean;
}

export interface StayItem {
  id: string;
  isDisclosed: boolean;
  createdDate: boolean;
  property: PropertyItem;
  amenities: AmenityItem[];
}

export interface PlaceItemInput {
  name: string;
  imageUrl?: string;
}

export interface PlaceItem {
  id: string;
  isDisclosed: boolean;
  createdDate: string;
  name: string;
  icon: string;
  imageUrl: string | null;
}

export interface PlaceItemUpdate {
  name?: string;
  imageUrl?: string;
  isDisclosed?: boolean;
}

export interface ApproveStayInputItem{
  approved: boolean
}

export interface FetchParam {
  isDisclosed?: number,
  page?:  number,
  isPublished?: boolean,
  status?: string
}
