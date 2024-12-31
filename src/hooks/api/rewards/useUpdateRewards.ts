"use client";

import { axiosInstance } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface UpdateRewardsPayload {
  pointsValue: number;
  couponsValue: number;
}

const useUpdateRewards = (token: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateRewardsPayload) => {
      const { data } = await axiosInstance.patch("/rewards", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    onSuccess: async (data) => {
      toast.success("Update rewards success");
      await queryClient.invalidateQueries({ queryKey: ["rewards"] });

      router.refresh();
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message || error.response?.data);
    },
  });
};

export default useUpdateRewards;
