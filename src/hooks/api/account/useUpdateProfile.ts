"use client";

import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface UpdateProfilePayload {
  fullname: string;
  profilePicture: File | null;
}

const useUpdateProfile = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateProfilePayload) => {
      const updateProfileForm = new FormData();

      updateProfileForm.append("fullname", payload.fullname);
      if (payload.profilePicture) {
        updateProfileForm.append("profilePicture", payload.profilePicture);
      }

      const { data } = await axiosInstance.patch("/account", updateProfileForm);
      return data;
    },
    onSuccess: async () => {
      toast.success("Update profile success");
      await queryClient.invalidateQueries({ queryKey: ["account"] });
      router.push("/account");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message || error.response?.data);
    },
  });
};

export default useUpdateProfile;
