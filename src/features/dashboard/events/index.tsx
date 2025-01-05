"use client";

import PaginationSection from "@/components/PaginationSection";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import useGetEventsByOrganizerId from "@/hooks/api/event/useGetEventsByOrganizerId";
import Link from "next/link";
import { parseAsInteger, useQueryState } from "nuqs";
import { useDebounceValue } from "usehooks-ts";
import CreateEventDialog from "./components/CreateEventDialog";
import TableEvents from "./components/TableEvents";
import CreatePromotionDialog from "./components/CreatePromotionDialog";
const EventsPage = () => {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });

  const [debouncedValue] = useDebounceValue(search, 500);

  const { data, isPending } = useGetEventsByOrganizerId({
    page,
    search: debouncedValue,
  });

  const onChangePage = (newPage: number) => {
    setPage(newPage);
  };
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-foreground">
      <header className="border-b bg-background shadow-sm">
        <div className="flex h-16 items-center gap-4 px-6">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="h-6" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <Link
                  href="/dashboard"
                  className="text-sm font-medium text-muted-foreground hover:text-primary"
                >
                  Dashboard
                </Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-sm font-medium text-primary">
                  Events
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <main className="flex-grow md:p-6">
        <div className="rounded-xl p-0 md:bg-muted/30 md:p-8 md:shadow-2xl dark:md:bg-muted/50">
          <div className="px-6 py-4">
            <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
              <h1 className="hidden text-2xl font-semibold md:block">Events</h1>

              <div className="flex flex-col-reverse items-center gap-4 md:flex-row">
                <div className="flex items-center gap-8">
                  <CreateEventDialog />
                  <CreatePromotionDialog />
                </div>
                <Input
                  placeholder="Search..."
                  className="w-64"
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  value={search}
                />
              </div>
            </div>
          </div>

          <div className="rounded-md">
            {data && data.data.length > 0 ? (
              <div className="w-screen space-y-4 px-3 md:w-full md:px-0">
                <TableEvents data={data} page={page} />
                <div className="flex justify-end">
                  <PaginationSection
                    onChangePage={onChangePage}
                    page={page}
                    take={data.meta.take}
                    total={data.meta.total}
                  />
                </div>
              </div>
            ) : (
              <div className="flex h-full items-center justify-center p-6">
                <p className="text-sm text-muted-foreground">
                  No events found.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default EventsPage;
