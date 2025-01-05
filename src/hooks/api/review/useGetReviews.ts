import { axiosInstance } from "@/lib/axios";
import { Review } from "@/types/review";
import { useQuery } from "@tanstack/react-query";

export const useGetReviews = (eventId: number) => {
  return useQuery({
    queryKey: ["reviews", eventId],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Review[]>(`/reviews?eventId=${eventId}`);
      return data;
    },
  });
};
