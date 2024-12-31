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
      <section className="mx-4 md:mx-32 py-20">
        <h1 className="text-2xl md:text-3xl font-bold">Upcoming Events</h1>
        <div className="mt-4 flex flex-col gap-4 pt-10 md:grid md:grid-cols-4">
          {data?.data.slice(0, 4).map((event, index) => {
            return <EventCard key={index} event={event} />;
          })}
        </div>
      </section>
    </>
  );
};

export default EventList;
