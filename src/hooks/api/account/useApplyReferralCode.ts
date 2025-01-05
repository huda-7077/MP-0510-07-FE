"use client";

import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface ApplyReferralCodePayload {
  referrerCode: String;
}

const useApplyReferralCode = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: ApplyReferralCodePayload) => {
      const { data } = await axiosInstance.post(
        "/account/referrals/apply-code",
        payload,
      );
      return data;
    },
    onSuccess: async () => {
      toast.success("Apply Referral Code Success");
      await queryClient.invalidateQueries({ queryKey: ["account"] });
      router.refresh();
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message || error.response?.data);
    },
  });
};

export default useApplyReferralCode;
