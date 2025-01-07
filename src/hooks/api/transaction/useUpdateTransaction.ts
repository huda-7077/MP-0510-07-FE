"use client";
import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface RejectTransactionPayload {
  transactionId: number;
  isRejected: boolean;
  isAccepted: boolean;
}
const useUpdateTransaction = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: RejectTransactionPayload) => {
      const { data } = await axiosInstance.patch(
        "/transactions/update",
        payload,
      );
      return data;
    },
    onSuccess: async () => {
      toast.success("Update transaction status success");
      await queryClient.invalidateQueries({ queryKey: ["transactions"] });
      router.replace("/dashboard/payments");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data);
    },
  });
};

export default useUpdateTransaction;
