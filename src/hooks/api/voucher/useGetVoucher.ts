import { axiosInstance } from "@/lib/axios";
import { Voucher } from "@/types/voucher";
import { useQuery } from "@tanstack/react-query";

const useGetVoucher = (id: number) => {
  return useQuery({
    queryKey: ["voucher", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Voucher>(`/vouchers/${id}`);
      return data;
    },
  });
};
export default useGetVoucher;
