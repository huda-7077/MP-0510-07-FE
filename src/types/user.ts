export interface User {
  id: number;
  email: string;
  fullname: string;
  password: string;
  profilePicture: string;
  role: string;
  referralCode: string;
  points: number;
  createdAt: Date;
  updatedAt: Date;
}

