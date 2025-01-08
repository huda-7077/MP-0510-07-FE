import { Coupon } from "./coupon";
import { Organizer } from "./organizer";

export interface User {
  id: number;
  email: string;
  fullname: string;
  password: string;
  profilePicture: string;
  role: string;
  referralCode: string;
  totalPoints: number;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  organizers: Organizer | null;
  coupon: Coupon | null;
}

export interface UserResponse {
  date: Date;
  newUsers: number;
}

export interface UserDataResponse {
  data: UserResponse[];
  totalUsers: number;
  totalOrganizers: number;
  totalEvents: number;
}
