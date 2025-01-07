import useAxios from "@/hooks/useAxios";
import { UserDataResponse } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

interface GetUsersDataQueries {
  orderBy: string;
  year?: number;
}

const useGetUsersData = (queries: GetUsersDataQueries) => {
  const { ...params } = queries;
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["dashboard-admin", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<UserDataResponse>(
        "/dashboard-admin",
        {
          params,
        },
      );
      return data;
    },
  });
};

export default useGetUsersData;
