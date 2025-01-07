"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Transaction } from "@/types/transactions";
import { FC } from "react";

interface TableUserListsProps {
  data: { data: Transaction[]; meta: { take: number } };
  page: number;
}

const TableAttendees: FC<TableUserListsProps> = ({ data, page }) => {
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
                Name
              </TableHead>
              <TableHead className="px-6 py-3 text-center text-sm font-medium text-muted-foreground">
                Quantity
              </TableHead>
              <TableHead className="px-6 py-3 text-center text-sm font-medium text-muted-foreground">
                Total Price Paid
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.data.map((attendee, index) => (
              <TableRow
                key={index}
                className="border-b transition-colors hover:bg-muted"
              >
                <TableCell className="px-6 py-3 text-center text-sm">
                  {index + 1 + data.meta.take * (page - 1)}
                </TableCell>

                <TableCell className="px-6 py-3 text-center text-sm">
                  {attendee.user.fullname}
                </TableCell>
                <TableCell className="px-6 py-3 text-center text-sm">
                  {attendee.quantity}
                </TableCell>
                <TableCell className="px-6 py-3 text-center text-sm">
                  {attendee.totalPrice}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TableAttendees;
