"use client";

import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface UpdateProfilePayload {
  companyName: string;
  companyWebsite: string;
  companyAddress: string;
  companyRole: string;
  details: string;
  governmentId: File | null;
}

const useApplyAsOrganizer = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateProfilePayload) => {
      const updateProfileForm = new FormData();

      updateProfileForm.append("companyName", payload.companyName);
      updateProfileForm.append("companyWebsite", payload.companyWebsite);
      updateProfileForm.append("companyAddress", payload.companyAddress);
      updateProfileForm.append("companyRole", payload.companyRole);
      updateProfileForm.append("details", payload.details);
      updateProfileForm.append("governmentId", payload.governmentId!);

      const { data } = await axiosInstance.post(
        "/account/apply-as-organizer",
        updateProfileForm,
      );
      return data;
    },
    onSuccess: async () => {
      toast.success("Your application has been sent");
      await queryClient.invalidateQueries({ queryKey: ["account"] });
      router.push("/account/settings");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message || error.response?.data);
    },
  });
};

export default useApplyAsOrganizer;
