
export interface Voucher {
  id: number;
  eventId: number;
  event: string;
  code: string;
  discountValue: number;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
