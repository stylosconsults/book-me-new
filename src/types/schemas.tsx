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

export interface ICategory {
  name: string;
  image: string;
  status: EEStatus;
  hotelsCount: number;
}
