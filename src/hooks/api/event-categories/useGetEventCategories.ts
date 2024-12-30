import { axiosInstance } from "@/lib/axios";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { EventCategory } from "@/types/event-category";
import { useQuery } from "@tanstack/react-query";

interface GetEventCategoriesQuery extends PaginationQueries {}

const useGetEventCategories = (queries: GetEventCategoriesQuery) => {
  return useQuery({
    queryKey: ["event-categories", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<EventCategory>>(
        "/event-categories",
        { params: queries },
      );
      return data;
    },
  });
};
export default useGetEventCategories;

