import useAxios from "@/hooks/useAxios";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

interface ReferredBy {
  referredBy: User;
}

const useGetReferredBy = () => {
  const { axiosInstance } = useAxios();
  return useQuery({
    queryKey: ["referrals"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<ReferredBy>(
        "/account/referrals/by",
      );
      return data;
    },
  });
};

export default useGetReferredBy;
