"use client";

import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface CreateEventCategoryPayload {
  title: string;
  description: string;
}

const useCreateEventCategory = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateEventCategoryPayload) => {
      const { data } = await axiosInstance.post("/event-categories", payload);
      return data;
    },
    onSuccess: async () => {
      toast.success("Create event categories success");
      await queryClient.invalidateQueries({ queryKey: ["event-categories"] });
      router.refresh();
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message || error.response?.data);
    },
  });
};

export default useCreateEventCategory;
