"use client";

import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { ReactNode } from "react";

interface Transaction {
  id: number;
  userId: number;
  eventId: number;
  quantity: number;
  pointsUsed: number;
  totalPrice: number;
  status: "WAITING_FOR_PAYMENT" | "WAITING_FOR_ADMIN_CONFIRMATION" | "DONE" | "REJECTED" | "EXPIRED" | "CANCELED";
  paymentProof: string;
  createdAt: string;
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

interface ApiResponse {
  paymentProof: any;
  expiresAt: any;
  quantity: ReactNode;
  event: any;
  user: any;
  id: ReactNode;
  totalPrice: ReactNode;
  data: Transaction;
  message: string;
  status: number;
}

const useGetTransaction = (id: number) => {
  return useQuery<ApiResponse>({
    queryKey: ["transaction", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get<ApiResponse>(
        `/transactions/${id}`
      );
      return data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });
};

export default useGetTransaction;