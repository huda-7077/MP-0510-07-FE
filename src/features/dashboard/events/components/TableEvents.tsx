"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useDeleteEvent from "@/hooks/api/event/useDeleteEvent";
import { Event } from "@/types/event";
import { format } from "date-fns";
import Image from "next/image";
import { FC } from "react";
import DeleteEventDialog from "./DeleteEventDialog";
import EditEventDialog from "./EditEventDialog";

interface TableUserListsProps {
  data: { data: Event[]; meta: { take: number } };
  page: number;
}

const TableEvents: FC<TableUserListsProps> = ({ data, page }) => {
  const { mutateAsync: deleteEvent, isPending } = useDeleteEvent();

  const handleDelete = (id: number) => {
    deleteEvent(id);
  };
  return (
    <div className="mx-auto overflow-x-scroll rounded-md border">
      <div className="flex min-h-[60vh] md:min-h-[55vh]">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="bg-muted">
              <TableHead className="px-6 py-3 text-sm font-medium text-muted-foreground">
                No
              </TableHead>
              <TableHead className="px-6 py-3 text-sm font-medium text-muted-foreground">
                Thumbnail
              </TableHead>
              <TableHead className="px-6 py-3 text-sm font-medium text-muted-foreground">
                Title
              </TableHead>
              <TableHead className="px-6 py-3 text-sm font-medium text-muted-foreground">
                Location
              </TableHead>
              <TableHead className="px-6 py-3 text-sm font-medium text-muted-foreground">
                Category
              </TableHead>
              <TableHead className="px-6 py-3 text-sm font-medium text-muted-foreground">
                Start Date
              </TableHead>
              <TableHead className="px-6 py-3 text-sm font-medium text-muted-foreground">
                End Date
              </TableHead>
              <TableHead className="px-6 py-3 text-sm font-medium text-muted-foreground">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.data.map((event, index) => (
              <TableRow
                key={index}
                className="border-b transition-colors hover:bg-muted"
              >
                <TableCell className="px-6 py-3 text-sm">
                  {index + 1 + data.meta.take * (page - 1)}
                </TableCell>
                <TableCell className="p-2">
                  <div className="relative flex h-16 items-center justify-center">
                    <Image
                      src={event.thumbnail}
                      alt={event.title}
                      fill
                      priority
                      sizes="100%"
                      className="h-full w-full rounded-md object-cover"
                    />
                  </div>
                </TableCell>
                <TableCell className="px-6 py-3 text-sm">
                  {event.title}
                </TableCell>
                <TableCell className="px-6 py-3 text-sm">
                  {event.location}
                </TableCell>
                <TableCell className="px-6 py-3 text-sm">
                  {event.category}
                </TableCell>
                <TableCell className="px-6 py-3 text-sm">
                  {format(event.startDate, "dd-MM-yyyy")}
                </TableCell>
                <TableCell className="px-6 py-3 text-sm">
                  {format(event.endDate, "dd-MM-yyyy")}
                </TableCell>
                <TableCell className="px-6 py-3 text-sm">
                  <div className="flex space-x-2">
                    <EditEventDialog eventId={Number(event.id)} />
                    <DeleteEventDialog
                      onDelete={() => handleDelete(Number(event.id))}
                      isPending={isPending}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TableEvents;
