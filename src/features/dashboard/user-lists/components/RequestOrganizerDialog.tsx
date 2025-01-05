"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import RejectDialog from "./RejectDialog";
import AcceptDialog from "./AcceptDialog";
import { format } from "date-fns";

import { Organizer } from "@/types/organizer";
import useUpdateRole from "@/hooks/api/user-lists/useUpdateRole";
import useRejectRole from "@/hooks/api/user-lists/useRejectRole";

interface RequestOrganizerDialogProps {
  organizerData: Organizer;
}

const RequestOrganizerDialog: React.FC<RequestOrganizerDialogProps> = ({
  organizerData,
}) => {
  const [isRejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [isAcceptDialogOpen, setAcceptDialogOpen] = useState(false);
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);

  const buttonText = organizerData.acceptedAt ? "Approved" : "Pending Approval";

  const getButtonVariant = (status: string) => {
    switch (status) {
      case "Approved":
        return "success";
      case "Pending Approval":
        return "warning";
      default:
        return "default";
    }
  };

  const handleRejectClick = () => {
    setIsRequestDialogOpen(false);
    setRejectDialogOpen(true);
  };
  const handleAcceptClick = () => {
    setIsRequestDialogOpen(false);
    setAcceptDialogOpen(true);
  };

  const { mutateAsync: updateRole, isPending: isUpdateRolePending } =
    useUpdateRole();
  const { mutateAsync: rejectRole, isPending: isRejectRolePending } =
    useRejectRole();

  const handleAccept = (userId: number) => {
    updateRole({ userIdTarget: userId });
    console.log("Accepted");
  };
  const handleReject = (userId: number, reason: string) => {
    rejectRole({ userIdTarget: userId, reasons: reason });
    console.log("Rejected");
  };

  return (
    <>
      <Dialog open={isRequestDialogOpen} onOpenChange={setIsRequestDialogOpen}>
        <DialogTrigger asChild>
          <Button
            className="h-6 rounded-full px-3 py-1 text-xs font-medium"
            size={"sm"}
            variant={getButtonVariant(buttonText)}
            onClick={() => setIsRequestDialogOpen(true)}
          >
            {buttonText}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Organizer Request Details</DialogTitle>
            <DialogDescription>
              Please review the following details about the organizer request.
            </DialogDescription>
          </DialogHeader>
          <div className="relative space-y-4">
            <div>
              <Label className="mb-2 font-bold">Government ID</Label>
              <div className="relative h-[200px] w-full cursor-pointer overflow-hidden">
                <Link href={organizerData.governmentId} target="_blank">
                  <Image
                    src={organizerData.governmentId}
                    alt="Government ID"
                    fill
                    sizes="auto"
                    style={{ objectFit: "contain" }}
                    className="rounded shadow-sm"
                  />
                </Link>
              </div>
            </div>
            <div>
              <strong>Company Name:</strong> {organizerData.companyName}
            </div>
            <div>
              <strong>Company Website:</strong>{" "}
              <Link
                href={organizerData.companyWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {organizerData.companyWebsite}
              </Link>
            </div>
            <div>
              <strong>Company Address:</strong> {organizerData.companyAddress}
            </div>
            <div>
              <strong>Company Role:</strong> {organizerData.companyRole}
            </div>
            <div>
              <strong>Details:</strong> {organizerData.details}
            </div>
            {organizerData.acceptedAt && (
              <div>
                <strong>Approved At:</strong>{" "}
                {format(
                  new Date(organizerData.acceptedAt),
                  "dd-MM-yyyy HH:mm:ss",
                )}
              </div>
            )}
          </div>
          <div className="mt-6 flex justify-end space-x-2">
            {!organizerData.acceptedAt && (
              <>
                <Button variant="outline" onClick={handleRejectClick}>
                  Reject
                </Button>
                <Button onClick={handleAcceptClick}>Accept</Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <RejectDialog
        open={isRejectDialogOpen}
        onOpenChange={setRejectDialogOpen}
        onReject={(reason) => handleReject(organizerData.userId, reason)}
        isPending={isRejectRolePending}
      />

      <AcceptDialog
        open={isAcceptDialogOpen}
        onOpenChange={setAcceptDialogOpen}
        onAccept={() => handleAccept(organizerData.userId)}
        isPending={isUpdateRolePending}
      />
    </>
  );
};

export default RequestOrganizerDialog;
