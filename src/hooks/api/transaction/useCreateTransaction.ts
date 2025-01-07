"use client";

import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface CreateTransactionPayload {
  eventId: number;
  quantity: number;
  pointsUsed?: number;
  voucherCode?: string;
  couponCode?: string;
  paymentProof?: string;
}

const useCreateTransaction = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateTransactionPayload) => {
      console.log("Payload:", payload);
      const { data } = await axiosInstance.post(
        "/transactions/create",
        payload,
      );
      return data;
    },

    onSuccess: async (data) => {
      toast.success("Transaction created successfully");
      await queryClient.invalidateQueries({ queryKey: ["transactions"] });
      router.push(`/transactions/${data.id}`);
    },

    onError: (error: AxiosError<any>) => {
        toast.error(error.response?.data?.message || error.response?.data);
      },
      
  });
};

export default useCreateTransaction;
