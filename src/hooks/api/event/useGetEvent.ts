import { axiosInstance } from "@/lib/axios";
import { Event } from "@/types/event";
import { useQuery } from "@tanstack/react-query";

const useGetEvent = (id: number) => {
  return useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Event>(`/events/${id}`);
      return data;
    },
  });
};
export default useGetEvent;
