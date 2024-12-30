"use client";

import { Input } from "@/components/ui/input";
import EventCard from "@/features/home/components/EventCard";
import useGetEvents from "@/hooks/api/event/useGetEvents";
import { useState } from "react";
import { useDebounceValue } from "usehooks-ts";

const ExploreList = () => {
  const [search, setSearch] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [debouncedSearch] = useDebounceValue(search, 500);
  const [debouncedLocation] = useDebounceValue(location, 500);

  const { data, isPending } = useGetEvents({
    search: debouncedSearch,
    location: debouncedLocation,
  });

  const handleLocationSearch = () => {
    // Optionally, any action can be taken here if needed when location search button is clicked.
  };

  if (isPending) {
    return <h1 className="mt-8 text-center">Loading...</h1>;
  }

  if (!data) {
    return <h1 className="mt-8 text-center">No data.</h1>;
  }

  return (
    <>
      <section className="mx-5 py-4 md:mx-32 md:py-10">
        <Input
          placeholder="Search for events"
          className="mx-auto my-4 md:my-8 max-w-3xl rounded-xl"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <div className="mx-auto my-4 md:my-8 flex max-w-3xl items-center gap-4">
          <Input
            placeholder="Enter location"
            className="flex-1 rounded-xl"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
          />
          <button
            className="rounded-xl bg-black px-4 py-2 text-white"
            onClick={handleLocationSearch}
          >
            Search Location
          </button>
        </div>
        {isPending && (
          <div className="flex h-[30vh] items-center justify-center">
            <h1 className="mt-8 text-center">Loading...</h1>
          </div>
        )}

        {!data.data.length ? (
          <div className="flex h-[30vh] items-center justify-center">
            <h1 className="mt-8 text-center">No data.</h1>
          </div>
        ) : (
          <>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Upcoming Events
            </h1>
            <div className="mt-2 md:mt-4 grid grid-cols-1 gap-4 pt-10 md:grid-cols-4">
              {data?.data.slice(0, 6).map((event, index) => {
                return <EventCard key={index} event={event} />;
              })}
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default ExploreList;
