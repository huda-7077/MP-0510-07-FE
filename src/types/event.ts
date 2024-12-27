export interface Event {
  id: string;
  title: string;
  description: string;
  eventCategory: string;
  userId: number;
  thumbnail: string;
  price: number;
  startDate: string;
  endDate: string;
  avaliableSeats: number;
  location: string;
  createdAt: string;
  updatedAt: string;
}
