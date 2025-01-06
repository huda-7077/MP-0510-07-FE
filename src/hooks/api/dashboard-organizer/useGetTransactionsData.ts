import useAxios from "@/hooks/useAxios";
import { TransactionDataResponse } from "@/types/transaction";
import { useQuery } from "@tanstack/react-query";

interface GetTransactionsDataQueries {
  orderBy: string;
  year?: number;
}

const useGetTransactionsData = (queries: GetTransactionsDataQueries) => {
  const { ...params } = queries;
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["dashboard-organizer", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<TransactionDataResponse>(
        "/dashboard-organizer",
        {
          params,
        },
      );
      return data;
    },
  });
};

export default useGetTransactionsData;
