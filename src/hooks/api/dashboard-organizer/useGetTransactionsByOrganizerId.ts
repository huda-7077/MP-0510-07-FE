import useAxios from "@/hooks/useAxios";
import { Event } from "@/types/event";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { Transaction } from "@/types/transactions";
import { useQuery } from "@tanstack/react-query";

interface GetTransactionsQueries extends PaginationQueries {
  search?: string;
  status?: string;
}

const useGetTransactionsByOrganizerId = (queries: GetTransactionsQueries) => {
  const { ...params } = queries;
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["transactions", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<Transaction>>(
        "/dashboard-organizer/transactions",
        {
          params,
        },
      );
      return data;
    },
  });
};

export default useGetTransactionsByOrganizerId;
