"use client";

import useAxios from "@/hooks/useAxios";
import { GetReviewByIdResponse } from "@/types/review";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface UseGetReviewByIdParams {
  reviewId: number;
  enabled?: boolean;
}

const useGetReviewById = ({ reviewId, enabled = true }: UseGetReviewByIdParams) => {
  const { axiosInstance } = useAxios();

  return useQuery<GetReviewByIdResponse, AxiosError>({
    queryKey: ["reviews", "detail", reviewId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/reviews/${reviewId}`);
      return data;
    },
    enabled: enabled && !!reviewId,
  });
};

export default useGetReviewById;