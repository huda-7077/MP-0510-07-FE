import { Event } from "./event";
import { Transaction } from "./transactions";

export interface Voucher {
  id: number;
  eventId: number;
  event: Event;
  code: string;
  discountValue: number;
  discountPercentage: number;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
  transactions: Transaction[];
}
