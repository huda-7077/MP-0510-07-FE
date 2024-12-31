import { axiosInstance } from "@/lib/axios";
import { Rewards } from "@/types/rewards";
import { useQuery } from "@tanstack/react-query";

interface GetRewardsQuery {
  token: string | undefined;
}
const useGetRewards = ({ token }: GetRewardsQuery) => {
  return useQuery({
    queryKey: ["rewards", token],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Rewards>("/rewards", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    enabled: !!token,
  });
};

export default useGetRewards;
