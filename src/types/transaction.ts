export interface Transaction {
  id: number;
  userId: number;
  eventId: number;
  quantity: number;
  pointsUsed: number;
  voucherId?: number;
  couponId?: number;
  status: TransactionStatus;
  paymentProof: string | null;
  totalPrice: number;
  acceptedAt: string | null;
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
  user: {
    fullname: string;
    totalPoints: number;
  };
  voucher?: {
    code: string;
    discountValue: number;
  };
  coupon?: {
    code: string;
    discountValue: number;
  };
  event: {
    title: string;
  };
}

export enum TransactionStatus {
  WAITING_FOR_PAYMENT = "WAITING_FOR_PAYMENT",
  WAITING_FOR_ADMIN_CONFIRMATION = "WAITING_FOR_ADMIN_CONFIRMATION",
  DONE = "DONE",
  REJECTED = "REJECTED",
  EXPIRED = "EXPIRED",
  CANCELED = "CANCELED",
}

export interface TransactionData {
  revenue: string;
  ticketsSold: string;
  date: string;
}

export interface TransactionDataResponse {
  data: TransactionData[];
  totalRevenue: number;
  totalTicketsSold: number;
  totalEvents: number;
}
