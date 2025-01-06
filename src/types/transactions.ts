import { Coupon } from "./coupon";
import { Event } from "./event";
import { TransactionStatus } from "./transaction";
import { User } from "./user";
import { Voucher } from "./voucher";

export interface Transaction {
  id: number;
  userId: number;
  user: User;
  eventId: number;
  event: Event;
  couponId: number | null;
  coupon: Coupon | null;
  voucherId: number | null;
  voucher: Voucher | null;
  status: TransactionStatus;
  paymentProof: string;
  pointsUsed: number;
  totalPrice: number;
  quantity: number;
  acceptedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
}
