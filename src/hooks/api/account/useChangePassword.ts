"use client";

import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface ChangePasswordPayload {
  password: string;
  newPassword: string;
}

const useChangePassword = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: ChangePasswordPayload) => {
      const { data } = await axiosInstance.patch(
        "/account/change-password",
        payload,
      );
      return data;
    },
    onSuccess: async () => {
      toast.success("Change Password success");
      await queryClient.invalidateQueries({ queryKey: ["account"] });
      router.refresh();
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message || error.response?.data);
    },
  });
};

export default useChangePassword;
