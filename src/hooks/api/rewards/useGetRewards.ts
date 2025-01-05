import useAxios from "@/hooks/useAxios";
import { Rewards } from "@/types/rewards";
import { useQuery } from "@tanstack/react-query";

const useGetRewards = () => {
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["rewards"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Rewards>("/rewards");
      return data;
    },
  });
};

export default useGetRewards;
