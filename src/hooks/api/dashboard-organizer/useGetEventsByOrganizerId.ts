import useAxios from "@/hooks/useAxios";
import { Event } from "@/types/event";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { useQuery } from "@tanstack/react-query";

interface GetUsersQueries extends PaginationQueries {
  search?: string;
}

const useGetEventsByOrganizerId = (queries: GetUsersQueries) => {
  const { ...params } = queries;
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["events", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<Event>>(
        "/dashboard-organizer/event-lists",
        {
          params,
        },
      );
      return data;
    },
  });
};

export default useGetEventsByOrganizerId;
