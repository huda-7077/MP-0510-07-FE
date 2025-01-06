"use client";

import useGetEvents from "@/hooks/api/event/useGetEvents";
import { useState } from "react";
import EventCard from "./EventCard";
import { Calendar, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const EventList = () => {
  const { data, isPending } = useGetEvents({});

  if (isPending) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
          <p className="text-lg font-medium text-gray-600">Loading events...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <Calendar className="mx-auto h-12 w-12 text-gray-400" />
          <h2 className="mt-4 text-xl font-semibold text-gray-800">
            No Events Found
          </h2>
          <p className="mt-2 text-gray-600">
            Check back later for upcoming events
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-gradient-to-b from-green-50/50 to-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Upcoming Events
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Don't miss out on these exciting upcoming events
            </p>
          </div>

          {/* Navigation Controls */}
          {/* <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(Math.max(1, page - 1))}
              disabled={page === 1}
              className="rounded-full p-2 text-gray-600 transition-colors hover:bg-green-100 hover:text-emerald-600 disabled:opacity-50"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <span className="text-sm font-medium text-gray-700">Page {page}</span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={!data?.data.length}
              className="rounded-full p-2 text-gray-600 transition-colors hover:bg-green-100 hover:text-emerald-600 disabled:opacity-50"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div> */}
        </div>

        {/* Events Grid */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {data?.data.slice(0, 4).map((event, index) => (
            <Link
              href={`/events/${event.id}`}
              key={index}
              className="group transform transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative rounded-2xl bg-white shadow-md transition-shadow duration-300 group-hover:shadow-xl">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-emerald-500/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                <EventCard event={event} />
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile Pagination
        <div className="mt-8 flex items-center justify-center space-x-4 sm:hidden">
          <button
            onClick={() => handlePageChange(Math.max(1, page - 1))}
            disabled={page === 1}
            className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-green-50 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm font-medium text-gray-700">Page {page}</span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={!data?.data.length}
            className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-green-50 disabled:opacity-50"
          >
            Next
          </button>
        </div> */}
      </div>
    </section>
  );
};

export default EventList;
