"use client";

import { Button } from "@/components/ui/button";
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
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { BookUser } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC } from "react";
import DeleteEventDialog from "./DeleteEventDialog";
import EditEventDialog from "./EditEventDialog";

interface TableEventListsProps {
  data: { data: Event[]; meta: { take: number } };
  page: number;
}

const TableEvents: FC<TableEventListsProps> = ({ data, page }) => {
  const router = useRouter();
  const QueryClient = useQueryClient();
  const { mutateAsync: deleteEvent, isPending } = useDeleteEvent();

  const handleDelete = (id: number) => {
    deleteEvent(id);
  };

  const handleShowAttendees = async (id: number) => {
    await QueryClient.invalidateQueries({
      queryKey: ["transactions", "events"],
    });
    router.push(`/dashboard/events/${id}`);
  };
  return (
    <div className="mx-auto overflow-x-scroll rounded-md border">
      <div className="flex min-h-[60vh] md:min-h-[55vh]">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="bg-muted">
              <TableHead className="px-6 py-3 text-center text-sm font-medium text-muted-foreground">
                No
              </TableHead>
              <TableHead className="px-6 py-3 text-center text-sm font-medium text-muted-foreground">
                Thumbnail
              </TableHead>
              <TableHead className="px-6 py-3 text-center text-sm font-medium text-muted-foreground">
                Title
              </TableHead>
              <TableHead className="px-6 py-3 text-center text-sm font-medium text-muted-foreground">
                Location
              </TableHead>
              <TableHead className="px-6 py-3 text-center text-sm font-medium text-muted-foreground">
                Category
              </TableHead>
              <TableHead className="px-6 py-3 text-center text-sm font-medium text-muted-foreground">
                Avaliable Seats
              </TableHead>
              <TableHead className="px-6 py-3 text-center text-sm font-medium text-muted-foreground">
                Start Date
              </TableHead>
              <TableHead className="px-6 py-3 text-center text-sm font-medium text-muted-foreground">
                End Date
              </TableHead>
              <TableHead className="px-6 py-3 text-center text-sm font-medium text-muted-foreground">
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
                <TableCell className="px-6 py-3 text-center text-sm">
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
                <TableCell className="px-6 py-3 text-center text-sm">
                  {event.title}
                </TableCell>
                <TableCell className="px-6 py-3 text-center text-sm">
                  {event.location}
                </TableCell>
                <TableCell className="px-6 py-3 text-center text-sm">
                  {event.category}
                </TableCell>
                <TableCell className="px-6 py-3 text-center text-sm">
                  {event.avaliableSeats}
                </TableCell>
                <TableCell className="px-6 py-3 text-center text-sm">
                  {format(event.startDate, "dd-MM-yyyy")}
                </TableCell>
                <TableCell className="px-6 py-3 text-center text-sm">
                  {format(event.endDate, "dd-MM-yyyy")}
                </TableCell>
                <TableCell className="px-6 py-3 text-center text-sm">
                  <div className="flex justify-center space-x-2">
                    <EditEventDialog eventId={Number(event.id)} />
                    <DeleteEventDialog
                      onDelete={() => handleDelete(Number(event.id))}
                      isPending={isPending}
                    />
                    <Button
                      size="icon"
                      variant="warning"
                      onClick={() => handleShowAttendees(Number(event.id))}
                    >
                      <BookUser />
                    </Button>
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
