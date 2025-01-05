"use client";

import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface CreateRewardsPayload {
  pointsValue: number;
  couponsValue: number;
}

const useCreateRewards = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateRewardsPayload) => {
      const { data } = await axiosInstance.post("/rewards", payload);
      return data;
    },
    onSuccess: async () => {
      toast.success("Create rewards success");
      await queryClient.invalidateQueries({ queryKey: ["rewards"] });
      router.refresh();
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message || error.response?.data);
    },
  });
};

export default useCreateRewards;
