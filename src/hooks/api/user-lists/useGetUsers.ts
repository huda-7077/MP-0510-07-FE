import { axiosInstance } from "@/lib/axios";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

interface GetUsersQueries extends PaginationQueries {
  token: string | undefined;
  search?: string;
  organizerApproved?: boolean;
  organizerPending?: boolean;
}

const useGetUsers = (queries: GetUsersQueries) => {
  const { token, ...params } = queries;
  return useQuery({
    queryKey: ["user-lists", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<User>>(
        "/user/user-lists",
        {
          params,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return data;
    },
    enabled: !!token,
  });
};

export default useGetUsers;
