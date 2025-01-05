import useAxios from "@/hooks/useAxios";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { Referral } from "@/types/referral";
import { useQuery } from "@tanstack/react-query";

interface GetReferredUsersQueries extends PaginationQueries {}

const useGetReferredUsers = (queries: GetReferredUsersQueries) => {
  const { axiosInstance } = useAxios();
  const { ...params } = queries;
  return useQuery({
    queryKey: ["referrals", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<Referral>>(
        "/account/referrals",
        {
          params,
        },
      );
      return data;
    },
  });
};

export default useGetReferredUsers;
