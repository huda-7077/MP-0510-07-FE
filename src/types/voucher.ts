export interface Voucher {
    id: number;
    eventId: number;
    code: string;
    discountPercentage: number;
    startDate: string;
    endDate: string;
}