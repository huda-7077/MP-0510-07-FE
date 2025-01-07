"use client";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import Image from "next/image";
import { FC } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import useUpdateTransaction from "@/hooks/api/transaction/useUpdateTransaction";
import { Transaction } from "@/types/transactions";
import Link from "next/link";
import AcceptTransactionDialog from "./AcceptTransaction";
import RejectTransactionDialog from "./RejectTransaction";

interface TablePaymentsProps {
  data: { data: Transaction[]; meta: { take: number } };
  page: number;
}

const statusMapping = {
  WAITING_FOR_PAYMENT: { variant: "warning", label: "Pending Payment" },
  WAITING_FOR_ADMIN_CONFIRMATION: {
    variant: "warning",
    label: "Pending Approval",
  },
  DONE: { variant: "success", label: "Approved" },
  REJECTED: { variant: "admin", label: "Rejected" },
  EXPIRED: { variant: "admin", label: "Expired" },
  CANCELED: { variant: "admin", label: "Canceled" },
} as const;

const TransactionStatus = ({ status }: { status: string }) => {
  const { variant, label } =
    statusMapping[status as keyof typeof statusMapping] || {};
  return variant && label ? (
    <Badge className="rounded-xl text-center" variant={variant}>
      {label}
    </Badge>
  ) : null;
};

const TablePayments: FC<TablePaymentsProps> = ({ data, page }) => {
  const { mutateAsync: updateTransaction, isPending } = useUpdateTransaction();

  const handleReject = (transactionId: number) => {
    updateTransaction({
      transactionId,
      isRejected: true,
      isAccepted: false,
    });
  };
  const handleAccept = (transactionId: number) => {
    updateTransaction({
      transactionId,
      isRejected: false,
      isAccepted: true,
    });
  };

  console.log(data.data);

  return (
    <div className="mx-auto overflow-x-scroll rounded-md border">
      <div className="flex min-h-[65vh] md:min-h-[55vh]">
        <Table className="w-full">
          <TableHeader>
            <TableRow className="bg-muted">
              <TableHead className="px-6 py-3 text-center text-sm font-medium text-muted-foreground">
                No
              </TableHead>
              <TableHead className="px-6 py-3 text-center text-sm font-medium text-muted-foreground">
                Payment Proof
              </TableHead>
              <TableHead className="px-6 py-3 text-center text-sm font-medium text-muted-foreground">
                Event
              </TableHead>
              <TableHead className="px-6 py-3 text-center text-sm font-medium text-muted-foreground">
                Email
              </TableHead>
              <TableHead className="px-6 py-3 text-center text-sm font-medium text-muted-foreground">
                Quantity
              </TableHead>
              <TableHead className="px-6 py-3 text-center text-sm font-medium text-muted-foreground">
                Coupon Used
              </TableHead>
              <TableHead className="px-6 py-3 text-center text-sm font-medium text-muted-foreground">
                Voucher Used
              </TableHead>
              <TableHead className="px-6 py-3 text-center text-sm font-medium text-muted-foreground">
                Points Used
              </TableHead>
              <TableHead className="px-6 py-3 text-center text-sm font-medium text-muted-foreground">
                Status
              </TableHead>
              <TableHead className="px-6 py-3 text-center text-sm font-medium text-muted-foreground">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.data.map((payment, index) => (
              <TableRow
                key={index}
                className="border-b transition-colors hover:bg-muted"
              >
                <TableCell className="px-6 py-3 text-center text-sm">
                  {index + 1 + data.meta.take * (page - 1)}
                </TableCell>
                <TableCell className="p-1">
                  <div className="relative flex h-16 flex-row items-center justify-center">
                    {payment.paymentProof ? (
                      <Link href={payment.paymentProof} target="_blank">
                        <Image
                          src={payment.paymentProof}
                          alt={`Transaction ${payment.id} image`}
                          fill
                          priority
                          sizes="100%"
                          className="h-full w-full rounded-md object-cover"
                        />
                      </Link>
                    ) : (
                      <span>-</span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="px-6 py-3 text-center text-sm">
                  {payment.eventId && (
                    <>
                      <p>{payment.event?.title}</p>
                    </>
                  )}
                </TableCell>
                <TableCell className="px-6 py-3 text-center text-sm">
                  {payment.userId && (
                    <>
                      <p>{payment.user?.email}</p>
                    </>
                  )}
                </TableCell>
                <TableCell className="px-6 py-3 text-center text-sm">
                  {payment.quantity}
                </TableCell>
                <TableCell className="px-6 py-3 text-center text-sm">
                  {payment.couponId ? (
                    <>
                      <p>{payment.coupon?.discountValue}</p>
                    </>
                  ) : (
                    <span>-</span>
                  )}
                </TableCell>
                <TableCell className="px-6 py-3 text-center text-sm">
                  {payment.voucherId ? (
                    <>
                      <p>{payment.voucher?.discountValue}</p>
                    </>
                  ) : (
                    <span>-</span>
                  )}
                </TableCell>
                <TableCell className="px-6 py-3 text-center text-sm">
                  {payment.pointsUsed}
                </TableCell>
                <TableCell className="px-6 py-3 text-center text-sm">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <TransactionStatus status={payment.status} />
                      </TooltipTrigger>
                      {payment.status === "DONE" && (
                        <TooltipContent>
                          <p>
                            Accepted at :{" "}
                            {format(payment.acceptedAt, "dd/MM/yyyy HH:mm:ss")}
                          </p>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
                <TableCell className="px-6 py-3 text-center text-sm">
                  {payment.id &&
                  payment.status === "WAITING_FOR_ADMIN_CONFIRMATION" ? (
                    <div className="flex gap-2">
                      <RejectTransactionDialog
                        onReject={() => handleReject(payment.id)}
                        isPending={isPending}
                      />
                      <AcceptTransactionDialog
                        onAccept={() => handleAccept(payment.id)}
                        isPending={isPending}
                      />
                    </div>
                  ) : (
                    <span>-</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TablePayments;
