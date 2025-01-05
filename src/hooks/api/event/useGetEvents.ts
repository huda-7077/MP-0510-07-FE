import { axiosInstance } from "@/lib/axios";
import { Event } from "@/types/event";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";

interface GetEventsQuery extends PaginationQueries {
  search?: string;
  category?: string;
  location?: string;
}

const useGetEvents = (queries: GetEventsQuery) => {
  return useQuery({
    queryKey: ["events", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<Event>>(
        "/events",
        { params: queries },
      );
      return data;
    },
  });
};
export default useGetEvents;
