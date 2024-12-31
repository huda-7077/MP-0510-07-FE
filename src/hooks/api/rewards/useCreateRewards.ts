"use client";

import useAxios from "@/hooks/useAxios";
import { axiosInstance } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface CreateRewardsPayload {
  pointsValue: number;
  couponsValue: number;
}

const useCreateRewards = (token: string) => {
  const router = useRouter();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateRewardsPayload) => {
      const { data } = await axiosInstance.post("/rewards", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    onSuccess: async (data) => {
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
