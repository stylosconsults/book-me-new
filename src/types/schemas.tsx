export enum EEStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  DELETED = "DELETED",
}

export interface IHotel {
  images: string[];
  amenities: string[];
  status: EEStatus;
  name: string;
  address: string;
  state: string;
  phone: string;
  description: string;
  website: string;
  email: string;
  id: string;
}

export interface IRoom {
  id: string;
  name: string;
  description: string;
  price: number;
  hotel: IHotel;
  adults: number;
  children: number;
  facilities: string[];
  size?: number;
  bedType: string;
  status?: string;
  image: string;
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
