import { axiosInstance } from "@/lib/axios";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

interface GetProfileQueries {
  token: string | undefined;
}
const useGetProfile = ({ token }: GetProfileQueries) => {
  return useQuery({
    queryKey: ["account", token],
    queryFn: async () => {
      const { data } = await axiosInstance.get<User>("/account/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    enabled: !!token,
  });
};

export default useGetProfile;
