"use client";

import useAxios from "@/hooks/useAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface CreateEventPayload {
  title: string;
  description: string;
  full_description: string;
  price: string;
  startDate: string;
  endDate: string;
  avaliableSeats: string;
  location: string;
  category: string;
  thumbnail: File | null;
}

const useCreateEvent = () => {
  const router = useRouter();
  const { axiosInstance } = useAxios();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateEventPayload) => {
      const createEventForm = new FormData();

      createEventForm.append("title", payload.title);
      createEventForm.append("description", payload.description);
      createEventForm.append("full_description", payload.full_description);
      createEventForm.append("price", payload.price.toString());
      createEventForm.append("startDate", payload.startDate);
      createEventForm.append("endDate", payload.endDate);
      createEventForm.append("avaliableSeats", payload.avaliableSeats);
      createEventForm.append("location", payload.location);
      createEventForm.append("category", payload.category);
      if (payload.thumbnail) {
        createEventForm.append("thumbnail", payload.thumbnail);
      }

      const { data } = await axiosInstance.post("/events", createEventForm);
      return data;
    },
    onSuccess: async () => {
      toast.success("Create event success");
      await queryClient.invalidateQueries({ queryKey: ["events"] });
      router.push("/");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data.message || error.response?.data);
    },
  });
};

export default useCreateEvent;
