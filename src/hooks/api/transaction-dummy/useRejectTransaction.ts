"use client";
import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const useRejectTransaction = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axiosInstance.post(`/events/${id}`);
      return data;
    },
    onSuccess: async () => {
      toast.success("Delete event success");
      await queryClient.invalidateQueries({ queryKey: ["transactions"] });
      router.replace("/dashboard/payments");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data);
    },
  });
};

export default useRejectTransaction;
