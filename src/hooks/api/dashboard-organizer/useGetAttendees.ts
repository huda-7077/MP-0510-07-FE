import useAxios from "@/hooks/useAxios";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { Transaction } from "@/types/transactions";
import { useQuery } from "@tanstack/react-query";

interface GetAttendeesQueries extends PaginationQueries {
  search?: string;
  eventId: number;
}

const useGetAttendees = (queries: GetAttendeesQueries) => {
  const { eventId, ...params } = queries;
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["attendees", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<Transaction>>(
        `/dashboard-organizer/attendees/${eventId}`,
        {
          params,
        },
      );
      return data;
    },
  });
};

export default useGetAttendees;
