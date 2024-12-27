"use client";

import useGetEvents from "@/hooks/api/event/useGetEvents";
import { useState } from "react";
import EventCard from "./EventCard";

const EventList = () => {
  const [page, setPage] = useState<number>(1);

  const { data, isPending } = useGetEvents({ page });

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  if (isPending) {
    return <h1 className="mt-8 text-center">Loading...</h1>;
  }

  if (!data) {
    return <h1 className="mt-8 text-center">No data.</h1>;
  }

  return (
    <>
      <section className="mx-32 py-20">
        <h1 className="text-3xl font-bold text-gray-900">Upcoming Events</h1>
        <div className="mt-4 grid grid-cols-4 gap-4 pt-10">
          {data?.data.map((event, index) => {
            return <EventCard key={index} event={event} />;
          })}
        </div>
      </section>
    </>
  );
};

export default EventList;
