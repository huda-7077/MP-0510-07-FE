import { User } from "./user";

export interface Event {
  id: string;
  title: string;
  description: string;
  full_description: string;
  category: string;
  userId: number;
  thumbnail: string;
  price: number;
  startDate: string;
  endDate: string;
  avaliableSeats: number;
  location: string;
  createdAt: string;
  updatedAt: string;

  user: User;
}
