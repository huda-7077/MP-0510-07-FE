"use client";

import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

interface CreateReviewPayload {
  eventId: number;
  rating: number;
  comment: string;
}

const useCreateReview = () => {
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateReviewPayload) => {
      const { data } = await axiosInstance.post("/reviews", payload);
      return data;
    },
    onSuccess: async () => {
      toast.success("Review submitted successfully");
      // Invalidate dan refetch reviews data
      await queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message || error.response?.data);
    },
  });
};

export default useCreateReview;