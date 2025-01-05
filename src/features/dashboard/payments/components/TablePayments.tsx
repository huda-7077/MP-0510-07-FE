"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Event } from "@/types/event";
import { User } from "@/types/user";
import { format } from "date-fns";
import Image from "next/image";
import { FC, useState } from "react";

import useDeleteEvent from "@/hooks/api/event/useDeleteEvent";
import { Transaction } from "@/types/transactions";
import useRejectTransaction from "@/hooks/api/transaction-dummy/useRejectTransaction";
import RejectTransactionDialog from "./RejectTransaction";
import Link from "next/link";
// import RequestOrganizerDialog from "./RequestOrganizerDialog";

interface TablePaymentsProps {
  data: { data: Transaction[]; meta: { take: number } };
  page: number;
}

const TablePayments: FC<TablePaymentsProps> = ({ data, page }) => {
  const { mutateAsync: rejectTransaction, isPending } = useRejectTransaction();

  const handleReject = (id: number) => {
    rejectTransaction(id);
  };

  console.log(data.data);

  return (
    <div className="mx-auto overflow-x-scroll rounded-md border">
      <div className="flex min-h-[65vh] md:min-h-[55vh]">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="bg-muted">
              <TableHead className="px-6 py-3 text-sm font-medium text-muted-foreground">
                No
              </TableHead>
              <TableHead className="px-6 py-3 text-sm font-medium text-muted-foreground">
                Payment Proof
              </TableHead>
              <TableHead className="px-6 py-3 text-sm font-medium text-muted-foreground">
                Event
              </TableHead>
              <TableHead className="px-6 py-3 text-sm font-medium text-muted-foreground">
                Email
              </TableHead>
              <TableHead className="px-6 py-3 text-sm font-medium text-muted-foreground">
                Quantity
              </TableHead>
              <TableHead className="px-6 py-3 text-sm font-medium text-muted-foreground">
                Coupon Used
              </TableHead>
              <TableHead className="px-6 py-3 text-sm font-medium text-muted-foreground">
                Voucher Used
              </TableHead>
              <TableHead className="px-6 py-3 text-sm font-medium text-muted-foreground">
                Points Used
              </TableHead>
              <TableHead className="px-6 py-3 text-sm font-medium text-muted-foreground">
                Status
              </TableHead>
              <TableHead className="px-6 py-3 text-sm font-medium text-muted-foreground">
                Select
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.data.map((payment, index) => (
              <TableRow
                key={index}
                className="border-b transition-colors hover:bg-muted"
              >
                <TableCell className="px-6 py-3 text-sm">
                  {index + 1 + data.meta.take * (page - 1)}
                </TableCell>
                <TableCell className="p-1">
                  <Link href={payment.paymentProof} target="_blank">
                    <div className="relative flex h-16 flex-row items-center justify-center">
                      <Image
                        src={payment.paymentProof}
                        alt={`Transaction ${payment.id} image`}
                        fill
                        priority
                        sizes="100%"
                        className="h-full w-full rounded-md object-cover"
                      />
                    </div>
                  </Link>
                </TableCell>
                <TableCell className="px-6 py-3 text-sm">
                  {payment.eventId && (
                    <>
                      <p>{payment.event?.title}</p>
                    </>
                  )}
                </TableCell>
                <TableCell className="px-6 py-3 text-sm">
                  {payment.userId && (
                    <>
                      <p>{payment.user?.email}</p>
                    </>
                  )}
                </TableCell>
                <TableCell className="px-6 py-3 text-sm">
                  {payment.quantity}
                </TableCell>
                <TableCell className="px-6 py-3 text-sm">
                  {payment.couponId && (
                    <>
                      <p>{payment.coupon?.discountValue}</p>
                    </>
                  )}
                </TableCell>
                <TableCell className="px-6 py-3 text-sm">
                  {payment.voucherId && (
                    <>
                      <p>{payment.voucher?.discountValue}</p>
                    </>
                  )}
                </TableCell>
                <TableCell className="px-6 py-3 text-sm">
                  {payment.pointsUsed}
                </TableCell>
                <TableCell className="px-6 py-3 text-sm">
                  {payment.status}
                </TableCell>
                <TableCell className="px-6 py-3 text-sm">
                  {payment.id && (
                    <>
                      {/* <EditEventDialog token={token} eventId={Number(event.id)} /> */}
                      <RejectTransactionDialog
                        onReject={() => handleReject(payment.id)}
                        isPending={isPending}
                      />
                    </>
                  )}
                </TableCell>

                {/* <TableCell className="border-t px-4 py-2">
              <Badge
                className="h-6 rounded-full px-3 py-1 font-medium"
                variant={getBadgeStatusVariant(event.isDeleted.toString())}
              >
                {event.isDeleted ? "Inactive" : "Active"}
              </Badge>
            </TableCell> */}
                {/* <TableCell className="border-t px-4 py-2">
              {event.organizers && (
              <RequestOrganizerDialog
                organizerData={event.organizers}
                token={token!}
              />
            )}
            </TableCell> */}
                {/* <TableCell className="border-t px-4 py-2">
              {format(event.createdAt, "dd-MM-yyyy HH:mm:ss")}
            </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TablePayments;
