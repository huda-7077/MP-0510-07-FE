"use client";
import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface CreateVoucherPayload {
  eventId: number;
  code: string;
  discountValue: number;
  startDate: string;
  endDate: string;
}

export const useCreateVoucher = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateVoucherPayload) => {
      const { data } = await axiosInstance.post("/vouchers", payload);
      return data;
    },

    onSuccess: async () => {
      toast.success("Create voucher success");
      await queryClient.invalidateQueries({ queryKey: ["vouchers"] });
      router.push("/dashboard/events");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data || error.response?.data.message);
    },
  });
};
