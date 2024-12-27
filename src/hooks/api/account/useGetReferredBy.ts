import { axiosInstance } from "@/lib/axios";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

interface GetReferredByQueries {
  token: string | undefined;
}
interface ReferredBy {
  referredBy: User;
}

const useGetReferredBy = ({ token }: GetReferredByQueries) => {
  return useQuery({
    queryKey: ["referrals", token],
    queryFn: async () => {
      const { data } = await axiosInstance.get<ReferredBy>(
        "/account/referrals/by",
        {
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

export default useGetReferredBy;
