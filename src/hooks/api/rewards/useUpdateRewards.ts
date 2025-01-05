"use client";

import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface UpdateRewardsPayload {
  pointsValue: number;
  couponsValue: number;
}

const useUpdateRewards = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateRewardsPayload) => {
      const { data } = await axiosInstance.patch("/rewards", payload);
      return data;
    },
    onSuccess: async () => {
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
