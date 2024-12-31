"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import PaginationSection from "@/components/PaginationSection";
import { useSession } from "next-auth/react";
import { parseAsInteger, useQueryState } from "nuqs";
import { useDebounceValue } from "usehooks-ts";
import useGetUsers from "@/hooks/api/user-lists/useGetUsers";
import TableUserLists from "./components/TableUserLists";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const UserListsPage = () => {
  const { data: session } = useSession();
  const token = session?.user.token;

  // Existing query states
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });

  // New query states for checkboxes
  const [organizerPending, setOrganizerPending] = useQueryState(
    "organizerPending",
    {
      defaultValue: false,
      parse: (value) => value === "true",
      serialize: (value) => (value ? "true" : "false"),
    },
  );
  const [organizerApproved, setOrganizerApproved] = useQueryState(
    "organizerApproved",
    {
      defaultValue: false,
      parse: (value) => value === "true",
      serialize: (value) => (value ? "true" : "false"),
    },
  );

  const [debouncedValue] = useDebounceValue(search, 500);

  const { data, isPending } = useGetUsers({
    token,
    page,
    search: debouncedValue,
    organizerPending: organizerPending,
    organizerApproved: organizerApproved,
  });

  const onChangePage = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div className="flex flex-col bg-gray-50 font-sans dark:bg-gray-900 dark:text-white">
      <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3 dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            User Lists
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Checkbox
              id="pendingRequest"
              checked={organizerPending}
              onCheckedChange={(checked) => setOrganizerPending(!!checked)}
              className="border-gray-300 focus:ring-primary dark:border-gray-700 dark:focus:ring-primary"
            />
            <Label
              htmlFor="pendingRequest"
              className="ml-2 text-gray-700 dark:text-gray-300"
            >
              Pending Request
            </Label>
          </div>
          <div className="flex items-center">
            <Checkbox
              id="approvedRequest"
              checked={organizerApproved}
              onCheckedChange={(checked) => setOrganizerApproved(!!checked)}
              className="border-gray-300 focus:ring-primary dark:border-gray-700 dark:focus:ring-primary"
            />
            <Label
              htmlFor="approvedRequest"
              className="ml-2 text-gray-700 dark:text-gray-300"
            >
              Approved Request
            </Label>
          </div>
          <Input
            placeholder="Search..."
            className="w-64 border border-gray-300 focus:border-primary focus:ring-primary dark:border-gray-700 dark:bg-gray-700 dark:text-white"
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            value={search}
          />
        </div>
      </div>

      <div className="mt-4 flex-1 rounded-md bg-white p-6 font-sans shadow dark:bg-gray-800">
        {!!data && !!data.data.length && (
          <div className="overflow-x-auto">
            <TableUserLists data={data} page={page} token={token} />

            <div className="mt-6 flex justify-end">
              <PaginationSection
                onChangePage={onChangePage}
                page={page}
                take={data.meta.take}
                total={data.meta.total}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserListsPage;
