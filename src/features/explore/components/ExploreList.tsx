"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EventCard from "@/features/home/components/EventCard";
import useGetEvents from "@/hooks/api/event/useGetEvents";
import { useState } from "react";
import { useDebounceValue } from "usehooks-ts";

const ExploreList = () => {
  const [search, setSearch] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>(""); // Kategori terpilih
  const [debouncedSearch] = useDebounceValue(search, 500);

  // API query dengan parameter `search` dan `category`
  const { data, isPending } = useGetEvents({
    search: debouncedSearch,
    category: selectedCategory, // Kirim kategori ke API
  });

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category); // Update kategori terpilih
    setSearch(""); // Reset pencarian
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
        {/* Filter Kategori */}
        <div className="mb-6 grid max-w-3xl grid-cols-2 gap-4 space-x-4 md:grid-cols-7">
          <Button
            className={`${
              selectedCategory === "" ? "bg-gray-800 text-white" : "bg-gray-200"
            }`}
            onClick={() => handleCategoryChange("")}
          >
            All
          </Button>
          <Button
            className={`${
              selectedCategory === "Music"
                ? "bg-gray-800 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => handleCategoryChange("Music")}
          >
            Music
          </Button>
          <Button
            className={`${
              selectedCategory === "Sport"
                ? "bg-gray-800 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => handleCategoryChange("Sport")}
          >
            Sport
          </Button>
          <Button
            className={`${
              selectedCategory === "Technology"
                ? "bg-gray-800 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => handleCategoryChange("Technology")}
          >
            Technology
          </Button>
          <Button
            className={`${
              selectedCategory === "Business"
                ? "bg-gray-800 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => handleCategoryChange("Business")}
          >
            Business
          </Button>
          <Button
            className={`${
              selectedCategory === "Science"
                ? "bg-gray-800 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => handleCategoryChange("Science")}
          >
            Science
          </Button>
          <Button
            className={`${
              selectedCategory === "Art"
                ? "bg-gray-800 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => handleCategoryChange("Art")}
          >
            Art
          </Button>
        </div>

        {/* Input Pencarian */}
        <Input
          placeholder="Search for events"
          className="my-4 max-w-4xl rounded-xl md:my-8"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />

        {/* Loading atau Data Kosong */}
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
            <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Upcoming Events
            </h1>
            <div className="mt-2 grid grid-cols-1 gap-4 pt-10 md:mt-4 md:grid-cols-3">
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
