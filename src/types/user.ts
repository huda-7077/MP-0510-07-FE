import { Organizer } from "./organizer";

export interface User {
  id: number;
  email: string;
  fullname: string;
  password: string;
  profilePicture: string;
  role: string;
  referralCode: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  organizers: Organizer | null;
}
