import { axiosInstance } from "@/lib/axios";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { Voucher } from "@/types/voucher";
import { useQuery } from "@tanstack/react-query";

interface GetVouchersQuery extends PaginationQueries {
  search?: string;
  status?: string;
}

const useGetVouchers = (queries: GetVouchersQuery) => {
  return useQuery({
    queryKey: ["vouchers", queries],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<Voucher>>(
        "/vouchers",
        { params: queries }
      );
      return data;
    },
  });
};

export default useGetVouchers;