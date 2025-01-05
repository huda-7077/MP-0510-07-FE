"use client";

import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface RejectRolePayload {
  userIdTarget: number;
  reasons: string;
}

const useRejectRole = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: RejectRolePayload) => {
      const { data } = await axiosInstance.post("/user/reject", payload);
      return data;
    },
    onSuccess: async () => {
      toast.success("Reject role success");
      await queryClient.invalidateQueries({ queryKey: ["user-lists"] });
      router.refresh();
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message || error.response?.data);
    },
  });
};

export default useRejectRole;
