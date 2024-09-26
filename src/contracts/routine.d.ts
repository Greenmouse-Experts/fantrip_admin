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

export interface PlaceItemLocation {
  id: string;
  location: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  spot: string | any;
  imageUrl?: string;
  published: boolean;
  picture: string;
  createdDate: string;
}

export interface PlaceLocation {
  id: string;
  isDisclosed: boolean;
  createdDate: string;
  location: string;
  icon: string;
  picture: string | null;
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

export interface ApproveStayInputItem {
  approved: boolean;
}

export interface FetchParam {
  isDisclosed?: number;
  page?: number;
  isPublished?: boolean;
  status?: string;
}

export interface AddTaxItem {
  rate: number;
  country: string;
  isActive?: boolean;
}

export interface TaxItem {
  rate: string;
  country: string;
  id: string;
  isActive: boolean;
  createdDate: string;
}

export interface NotifyItem {
  body: string;
  createdDate: string;
  id: string;
  read: boolean;
  title: string;
  userGroup:string;
}
