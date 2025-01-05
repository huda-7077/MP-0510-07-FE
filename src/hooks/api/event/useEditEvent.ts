"use client";

import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface EditEventPayload {
  category: string;
  title: string;
  description: string;
  full_description: string;
  price: string;
  startDate: string;
  endDate: string;
  avaliableSeats: string;
  location: string;
  thumbnail: File | null;
}

const useEditEvent = (id: number) => {
  const router = useRouter();
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: EditEventPayload) => {
      const editEventForm = new FormData();

      editEventForm.append("title", payload.title);
      editEventForm.append("description", payload.description);
      editEventForm.append("full_description", payload.full_description);
      editEventForm.append("price", payload.price);
      editEventForm.append("startDate", payload.startDate);
      editEventForm.append("endDate", payload.endDate);
      editEventForm.append("avaliableSeats", payload.avaliableSeats);
      editEventForm.append("location", payload.location);
      editEventForm.append("category", payload.category);

      if (payload.thumbnail) {
        editEventForm.append("thumbnail", payload.thumbnail);
      }

      const { data } = await axiosInstance.patch(
        `/events/${id}`,
        editEventForm,
      );
      return data;
    },
    onSuccess: async () => {
      toast.success("Edit event success");
      await queryClient.invalidateQueries({ queryKey: ["events"] });
      router.replace("/dashboard/events");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message || error.response?.data);
    },
  });
};

export default useEditEvent;
