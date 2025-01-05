import { Transaction } from "./transactions";
import { User } from "./user";

export interface Coupon {
  id: number;
  userId: number;
  code: string;
  discountValue: number;
  isUsed: boolean;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  transactions: Transaction[];
}
