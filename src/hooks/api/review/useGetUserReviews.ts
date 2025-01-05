"use client";

import useAxios from "@/hooks/useAxios";
import { GetEventReviewsResponse } from "@/types/review";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface UseGetEventReviewsParams {
  eventId: number;
  enabled?: boolean;
}

const useGetEventReviews = ({ eventId, enabled = true }: UseGetEventReviewsParams) => {
  const { axiosInstance } = useAxios();

  return useQuery<GetEventReviewsResponse, AxiosError>({
    queryKey: ["reviews", "event", eventId],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/reviews/event/${eventId}`);
      return data;
    },
    enabled: enabled && !!eventId,
  });
};

export default useGetEventReviews;