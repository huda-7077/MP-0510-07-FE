"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EventCard from "@/features/home/components/EventCard";
import useGetEvents from "@/hooks/api/event/useGetEvents";
import { useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { Search, Calendar, Filter } from "lucide-react";

const ExploreList = () => {
  const [search, setSearch] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [debouncedSearch] = useDebounceValue(search, 500);

  const { data, isPending } = useGetEvents({
    search: debouncedSearch,
    category: selectedCategory,
  });

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSearch("");
  };

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-green-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-emerald-600"></div>
          <p className="text-lg font-medium text-gray-600">Loading events...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-green-50">
        <div className="rounded-lg bg-white p-8 text-center shadow-lg">
          <p className="text-xl font-medium text-gray-800">No data available</p>
          <p className="mt-2 text-gray-600">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Discover Events
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Find and join amazing events happening around you
          </p>
        </div>

        {/* Filters Section */}
        <div className="mb-12 rounded-2xl bg-white p-6 shadow-lg">
          {/* Category Filter */}
          <div className="mb-6">
            <div className="flex items-center gap-2 pb-4">
              <Filter className="h-5 w-5 text-emerald-600" />
              <h2 className="text-lg font-semibold text-gray-800">Categories</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                className={`transition-all duration-300 ${
                  selectedCategory === ""
                    ? "bg-emerald-600 text-white shadow-lg hover:bg-emerald-700"
                    : "bg-green-50 text-gray-700 hover:bg-green-100"
                }`}
                onClick={() => handleCategoryChange("")}
              >
                All Events
              </Button>
              {["Music", "Sport", "Technology", "Business", "Science", "Art"].map(
                (category) => (
                  <Button
                    key={category}
                    className={`transition-all duration-300 ${
                      selectedCategory === category
                        ? "bg-emerald-600 text-white shadow-lg hover:bg-emerald-700"
                        : "bg-green-50 text-gray-700 hover:bg-green-100"
                    }`}
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category}
                  </Button>
                )
              )}
            </div>
          </div>

          {/* Search Input */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-emerald-600" />
            </div>
            <Input
              placeholder="Search for events..."
              className="w-full rounded-xl border-gray-200 bg-green-50 py-6 pl-10 pr-4 text-gray-900 shadow-sm transition-all duration-300 placeholder:text-gray-400 focus:border-emerald-600 focus:bg-white focus:ring-emerald-600"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </div>
        </div>

        {/* Events Grid */}
        {!data.data.length ? (
          <div className="flex h-64 items-center justify-center rounded-2xl bg-white p-8 shadow-lg">
            <div className="text-center">
              <Calendar className="mx-auto h-12 w-12 text-emerald-600" />
              <p className="mt-4 text-xl font-medium text-gray-800">No events found</p>
              <p className="mt-2 text-gray-600">Try adjusting your filters</p>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Upcoming Events
              </h2>
              <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-emerald-800">
                {data.data.length} events found
              </span>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {data?.data.slice(0, 6).map((event, index) => (
                <div
                  key={index}
                  className="group relative transform rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-emerald-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  <EventCard event={event} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreList;