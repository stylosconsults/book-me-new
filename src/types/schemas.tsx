import { IHotel } from "./hotel.schema";

export enum EEStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  DELETED = "DELETED",
}

export interface ICategory {
  id: string;
  name: string;
  image: string;
  status: EEStatus;
  hotelsCount: number;
}

export interface ICreateHotel {
  category: string;
  name: string;
  address: string;
  state: string;
  phone: string;
  description: string;
  website: string;
  email: string;
  images: string[];
  amenities: string[];
}
