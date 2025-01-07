import { Organizer } from "./organizer";

export interface User {
  id: number;
  email: string;
  fullname: string;
  password: string;
  profilePicture: string;
  role: string;
  referralCode: string;
  points: number;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  organizers: Organizer | null;
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
